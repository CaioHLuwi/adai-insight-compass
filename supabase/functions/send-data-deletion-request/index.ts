import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DataDeletionRequest {
  fullName: string;
  email: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, message }: DataDeletionRequest = await req.json();

    // Validate required fields
    if (!fullName || !email) {
      return new Response(
        JSON.stringify({ error: "Full name and email are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const emailContent = `
      <h2>Solicitação de Exclusão de Dados</h2>
      <p><strong>Nome Completo:</strong> ${fullName}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      ${message ? `<p><strong>Mensagem:</strong> ${message}</p>` : ''}
      
      <hr>
      <p><em>Esta solicitação foi enviada através do formulário de exclusão de dados no site Otmizy.</em></p>
      <p><em>Data da solicitação: ${new Date().toLocaleString('pt-BR')}</em></p>
    `;

    const emailResponse = await resend.emails.send({
      from: "Otmizy <noreply@otmizy.com>",
      to: ["suporte@otmizy.com"],
      subject: `Solicitação de Exclusão de Dados - ${fullName}`,
      html: emailContent,
    });

    console.log("Data deletion request email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-data-deletion-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);