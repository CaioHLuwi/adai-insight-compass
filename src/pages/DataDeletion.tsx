import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';

export default function DataDeletion() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const content = {
    pt: {
      title: 'Solicitação de Exclusão de Dados',
      description: 'Solicite a exclusão dos seus dados pessoais de nossa plataforma.',
      fullNameLabel: 'Nome Completo',
      emailLabel: 'E-mail',
      messageLabel: 'Mensagem (opcional)',
      messagePlaceholder: 'Descreva brevemente sua solicitação de exclusão de dados...',
      submitButton: 'Enviar Solicitação',
      submittingButton: 'Enviando...',
      backButton: 'Voltar',
      successMessage: 'Solicitação enviada com sucesso! Entraremos em contato em breve.',
      errorMessage: 'Erro ao enviar solicitação. Tente novamente.',
      requiredFields: 'Por favor, preencha todos os campos obrigatórios.',
      info: 'Esta solicitação será enviada para nossa equipe de suporte que processará sua requisição de exclusão de dados conforme as políticas de privacidade e regulamentações aplicáveis.'
    },
    en: {
      title: 'Data Deletion Request',
      description: 'Request the deletion of your personal data from our platform.',
      fullNameLabel: 'Full Name',
      emailLabel: 'Email',
      messageLabel: 'Message (optional)',
      messagePlaceholder: 'Briefly describe your data deletion request...',
      submitButton: 'Submit Request',
      submittingButton: 'Submitting...',
      backButton: 'Back',
      successMessage: 'Request sent successfully! We will contact you soon.',
      errorMessage: 'Error sending request. Please try again.',
      requiredFields: 'Please fill in all required fields.',
      info: 'This request will be sent to our support team who will process your data deletion request according to privacy policies and applicable regulations.'
    },
    es: {
      title: 'Solicitud de Eliminación de Datos',
      description: 'Solicite la eliminación de sus datos personales de nuestra plataforma.',
      fullNameLabel: 'Nombre Completo',
      emailLabel: 'Correo Electrónico',
      messageLabel: 'Mensaje (opcional)',
      messagePlaceholder: 'Describa brevemente su solicitud de eliminación de datos...',
      submitButton: 'Enviar Solicitud',
      submittingButton: 'Enviando...',
      backButton: 'Volver',
      successMessage: '¡Solicitud enviada exitosamente! Nos pondremos en contacto pronto.',
      errorMessage: 'Error al enviar la solicitud. Inténtelo de nuevo.',
      requiredFields: 'Por favor, complete todos los campos requeridos.',
      info: 'Esta solicitud será enviada a nuestro equipo de soporte que procesará su solicitud de eliminación de datos según las políticas de privacidad y regulaciones aplicables.'
    }
  };

  const currentContent = content[language as keyof typeof content] || content.pt;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast({
        title: "Erro",
        description: currentContent.requiredFields,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://nmtriprrbdyjleufmvgli.supabase.co/functions/v1/send-data-deletion-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: currentContent.successMessage,
        });
        setFormData({ fullName: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send request');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: currentContent.errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentContent.backButton}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">
              {currentContent.title}
            </CardTitle>
            <CardDescription>
              {currentContent.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {currentContent.fullNameLabel} *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {currentContent.emailLabel} *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {currentContent.messageLabel}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={currentContent.messagePlaceholder}
                  rows={4}
                  className="w-full"
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {currentContent.info}
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? currentContent.submittingButton : currentContent.submitButton}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}