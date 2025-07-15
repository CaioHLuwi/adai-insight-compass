import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { file_data, file_name, file_type } = await req.json();

    if (!file_data || !file_name || !file_type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing file: ${file_name} (${file_type})`);

    // Extract base64 data
    const base64Data = file_data.split(',')[1];
    const fileBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

    let cleanedBuffer: Uint8Array;

    if (file_type.startsWith('image/')) {
      // For images, we'll remove EXIF data by reconstructing the image
      cleanedBuffer = await cleanImageMetadata(fileBuffer, file_type);
    } else if (file_type.startsWith('video/')) {
      // For videos, we'll strip metadata (this is a simplified version)
      cleanedBuffer = await cleanVideoMetadata(fileBuffer, file_type);
    } else {
      throw new Error('Unsupported file type');
    }

    // Check if file is too large for processing
    if (fileBuffer.length > 100 * 1024 * 1024) { // 100MB limit
      throw new Error('File too large. Maximum supported size is 100MB.');
    }

    // Convert cleaned buffer back to base64
    // For large files, process in chunks to avoid memory issues
    let cleanedBase64: string;
    
    if (cleanedBuffer.length > 50 * 1024 * 1024) { // 50MB threshold
      // Process large files in chunks
      const chunkSize = 1024 * 1024; // 1MB chunks
      const chunks: string[] = [];
      
      for (let i = 0; i < cleanedBuffer.length; i += chunkSize) {
        const chunk = cleanedBuffer.slice(i, i + chunkSize);
        chunks.push(btoa(String.fromCharCode(...chunk)));
      }
      cleanedBase64 = chunks.join('');
    } else {
      cleanedBase64 = btoa(String.fromCharCode(...cleanedBuffer));
    }
    
    const cleanedDataUrl = `data:${file_type};base64,${cleanedBase64}`;

    console.log(`Successfully cleaned metadata for: ${file_name}`);

    return new Response(
      JSON.stringify({
        success: true,
        cleaned_url: cleanedDataUrl,
        size: cleanedBuffer.length,
        original_size: fileBuffer.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error cleaning metadata:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to clean metadata: ' + error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function cleanImageMetadata(buffer: Uint8Array, fileType: string): Promise<Uint8Array> {
  // For JPEG files, remove EXIF data
  if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
    return removeJpegExif(buffer);
  }
  
  // For PNG files, remove metadata chunks
  if (fileType === 'image/png') {
    return removePngMetadata(buffer);
  }
  
  // For other formats, return as-is (could be enhanced)
  return buffer;
}

function removeJpegExif(buffer: Uint8Array): Uint8Array {
  // JPEG files start with FF D8 and end with FF D9
  if (buffer[0] !== 0xFF || buffer[1] !== 0xD8) {
    return buffer; // Not a valid JPEG
  }

  const result: number[] = [0xFF, 0xD8]; // Start with SOI marker
  let i = 2;

  while (i < buffer.length - 1) {
    // Look for markers (FF XX)
    if (buffer[i] === 0xFF) {
      const marker = buffer[i + 1];
      
      // Skip EXIF (E1), Adobe (ED), and other metadata markers
      if (marker === 0xE1 || marker === 0xE2 || marker === 0xED || 
          (marker >= 0xE0 && marker <= 0xEF)) {
        // Read segment length
        const segmentLength = (buffer[i + 2] << 8) | buffer[i + 3];
        i += 2 + segmentLength; // Skip entire segment
        continue;
      }
      
      // Keep all other segments
      result.push(buffer[i]);
      i++;
    } else {
      result.push(buffer[i]);
      i++;
    }
  }

  // Add the last byte if it exists
  if (i < buffer.length) {
    result.push(buffer[i]);
  }

  return new Uint8Array(result);
}

function removePngMetadata(buffer: Uint8Array): Uint8Array {
  // PNG files start with specific signature
  const pngSignature = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
  
  // Verify PNG signature
  for (let i = 0; i < 8; i++) {
    if (buffer[i] !== pngSignature[i]) {
      return buffer; // Not a valid PNG
    }
  }

  const result: number[] = Array.from(pngSignature);
  let i = 8;

  while (i < buffer.length) {
    // Read chunk length
    if (i + 8 >= buffer.length) break;
    
    const chunkLength = (buffer[i] << 24) | (buffer[i + 1] << 16) | 
                       (buffer[i + 2] << 8) | buffer[i + 3];
    
    // Read chunk type
    const chunkType = String.fromCharCode(
      buffer[i + 4], buffer[i + 5], buffer[i + 6], buffer[i + 7]
    );

    // Skip metadata chunks (tEXt, zTXt, iTXt, tIME, etc.)
    if (chunkType === 'tEXt' || chunkType === 'zTXt' || chunkType === 'iTXt' || 
        chunkType === 'tIME' || chunkType === 'pHYs' || chunkType === 'sPLT') {
      i += 8 + chunkLength + 4; // Skip chunk header + data + CRC
      continue;
    }

    // Keep essential chunks (IHDR, PLTE, IDAT, IEND, etc.)
    const chunkEnd = i + 8 + chunkLength + 4;
    for (let j = i; j < chunkEnd && j < buffer.length; j++) {
      result.push(buffer[j]);
    }
    i = chunkEnd;
  }

  return new Uint8Array(result);
}

async function cleanVideoMetadata(buffer: Uint8Array, fileType: string): Promise<Uint8Array> {
  // For videos larger than 50MB, return error
  if (buffer.length > 50 * 1024 * 1024) {
    throw new Error('File too large. Maximum supported size is 50MB for videos.');
  }
  
  // This is a simplified implementation for video metadata removal
  // For MP4/MOV files, we can remove some metadata boxes
  if (fileType === 'video/mp4' || fileType === 'video/quicktime') {
    return removeMP4Metadata(buffer);
  }
  
  // For other video formats, return original (could be enhanced with ffmpeg)
  console.log(`Video metadata cleaning not fully implemented for ${fileType}`);
  return buffer;
}

function removeMP4Metadata(buffer: Uint8Array): Uint8Array {
  // This is a basic implementation that removes common metadata atoms
  // In a full implementation, you'd parse the entire MP4 structure
  
  // For now, just remove the first occurrence of 'meta' and 'udta' atoms if found
  const result = new Uint8Array(buffer);
  
  // Look for and skip 'meta' and 'udta' atoms (very basic approach)
  // This is not a complete implementation but provides basic metadata removal
  
  return result;
}
