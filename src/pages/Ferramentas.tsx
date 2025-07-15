import React, { useState, useRef } from 'react';
import { Upload, Download, Trash2, Image, Video, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';

interface ProcessedFile {
  id: string;
  originalName: string;
  cleanedUrl: string;
  type: 'image' | 'video';
  size: number;
}

export default function Ferramentas() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<ProcessedFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is image or video
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      toast({
        title: 'Tipo de arquivo não suportado',
        description: 'Por favor, selecione uma imagem ou vídeo.',
        variant: 'destructive'
      });
      return;
    }

    // Check file size (max 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast({
        title: 'Arquivo muito grande',
        description: 'O arquivo deve ter no máximo 100MB.',
        variant: 'destructive'
      });
      return;
    }

    setSelectedFile(file);
    setProcessedFile(null);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        toast({
          title: 'Tipo de arquivo não suportado',
          description: 'Por favor, selecione uma imagem ou vídeo.',
          variant: 'destructive'
        });
        return;
      }

      setSelectedFile(file);
      setProcessedFile(null);
    }
  };

  const cleanMetadata = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setUploadProgress(0);

    try {
      // Convert file to base64 for edge function
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const base64Data = fileReader.result as string;
        
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 200);

        try {
          const { data, error } = await supabase.functions.invoke('clean-metadata', {
            body: {
              file_data: base64Data,
              file_name: selectedFile.name,
              file_type: selectedFile.type
            }
          });

          clearInterval(progressInterval);
          setUploadProgress(100);

          if (error) {
            throw error;
          }

          setProcessedFile({
            id: Date.now().toString(),
            originalName: selectedFile.name,
            cleanedUrl: data.cleaned_url,
            type: selectedFile.type.startsWith('image/') ? 'image' : 'video',
            size: data.size || selectedFile.size
          });

          toast({
            title: 'Sucesso!',
            description: 'Metadados removidos com sucesso!'
          });

        } catch (error) {
          console.error('Error cleaning metadata:', error);
          toast({
            title: 'Erro',
            description: 'Erro ao processar arquivo. Tente novamente.',
            variant: 'destructive'
          });
        } finally {
          setIsProcessing(false);
        }
      };

      fileReader.readAsDataURL(selectedFile);

    } catch (error) {
      console.error('Error:', error);
      setIsProcessing(false);
      toast({
        title: 'Erro',
        description: 'Erro ao processar arquivo.',
        variant: 'destructive'
      });
    }
  };

  const downloadCleanedFile = () => {
    if (!processedFile) return;

    const link = document.createElement('a');
    link.href = processedFile.cleanedUrl;
    link.download = `cleaned_${processedFile.originalName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setProcessedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Ferramentas</h1>
        <p className="text-muted-foreground">
          Utilitários para otimização de mídia
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trash2 className="w-5 h-5" />
            <span>Limpador de Hash</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Remove metadados (EXIF, timestamps, localização) de imagens e vídeos
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {selectedFile ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  {selectedFile.type.startsWith('image/') ? (
                    <Image className="w-8 h-8 text-blue-500" />
                  ) : (
                    <Video className="w-8 h-8 text-purple-500" />
                  )}
                  <span className="font-medium">{selectedFile.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                <div>
                  <p className="text-lg font-medium">
                    Arraste e solte seu arquivo aqui
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ou clique para selecionar uma imagem ou vídeo (máx. 100MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Processing Progress */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Processando arquivo...</span>
                <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button 
              onClick={cleanMetadata} 
              disabled={!selectedFile || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processando...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpar Metadados
                </>
              )}
            </Button>
            
            {selectedFile && (
              <Button variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
            )}
          </div>

          {/* Success State */}
          {processedFile && (
            <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-600">Arquivo processado com sucesso!</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {processedFile.originalName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Metadados removidos • {(processedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                
                <Button onClick={downloadCleanedFile} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Remove informações EXIF de imagens (localização, câmera, data/hora)</p>
            <p>• Remove metadados de vídeos (timestamps, dispositivo, localização)</p>
            <p>• Mantém a qualidade original do arquivo</p>
            <p>• Suporta formatos: JPG, PNG, GIF, MP4, MOV, AVI</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}