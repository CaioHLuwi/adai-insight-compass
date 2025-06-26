
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export default function Terms() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Termos de Uso',
      lastUpdated: 'Última atualização: ',
      sections: [
        {
          title: '1. Aceitação dos Termos',
          content: 'Ao acessar e usar este serviço, você aceita e concorda em estar vinculado aos termos e condições deste acordo. Se você não concordar com algum desses termos, não deverá usar este serviço.'
        },
        {
          title: '2. Descrição do Serviço',
          content: 'Nosso serviço fornece uma plataforma de análise e otimização de campanhas publicitárias digitais. Nos reservamos o direito de modificar ou descontinuar o serviço a qualquer momento.'
        },
        {
          title: '3. Conta de Usuário',
          content: 'Você é responsável por manter a confidencialidade de sua conta e senha. Você concorda em aceitar a responsabilidade por todas as atividades que ocorrem em sua conta.'
        },
        {
          title: '4. Uso Aceitável',
          content: 'Você concorda em não usar o serviço para qualquer propósito ilegal ou não autorizado. Você não deve violar quaisquer leis em sua jurisdição.'
        },
        {
          title: '5. Propriedade Intelectual',
          content: 'O serviço e seu conteúdo original, recursos e funcionalidades são e permanecerão propriedade exclusiva da empresa e seus licenciadores.'
        },
        {
          title: '6. Limitação de Responsabilidade',
          content: 'Em hipótese alguma a empresa será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos.'
        },
        {
          title: '7. Alterações dos Termos',
          content: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.'
        },
        {
          title: '8. Contato',
          content: 'Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através dos canais de suporte disponíveis.'
        }
      ]
    },
    en: {
      title: 'Terms of Use',
      lastUpdated: 'Last updated: ',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing and using this service, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to any of these terms, you should not use this service.'
        },
        {
          title: '2. Service Description',
          content: 'Our service provides a platform for digital advertising campaign analysis and optimization. We reserve the right to modify or discontinue the service at any time.'
        },
        {
          title: '3. User Account',
          content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.'
        },
        {
          title: '4. Acceptable Use',
          content: 'You agree not to use the service for any unlawful or unauthorized purpose. You must not violate any laws in your jurisdiction.'
        },
        {
          title: '5. Intellectual Property',
          content: 'The service and its original content, features and functionality are and will remain the exclusive property of the company and its licensors.'
        },
        {
          title: '6. Limitation of Liability',
          content: 'In no event shall the company be liable for any indirect, incidental, special, consequential or punitive damages.'
        },
        {
          title: '7. Changes to Terms',
          content: 'We reserve the right to modify these terms at any time. Changes will take effect immediately upon posting.'
        },
        {
          title: '8. Contact',
          content: 'If you have questions about these Terms of Use, please contact us through the available support channels.'
        }
      ]
    },
    es: {
      title: 'Términos de Uso',
      lastUpdated: 'Última actualización: ',
      sections: [
        {
          title: '1. Aceptación de Términos',
          content: 'Al acceder y usar este servicio, acepta y acepta estar sujeto a los términos y condiciones de este acuerdo. Si no está de acuerdo con alguno de estos términos, no debe usar este servicio.'
        },
        {
          title: '2. Descripción del Servicio',
          content: 'Nuestro servicio proporciona una plataforma de análisis y optimización de campañas publicitarias digitales. Nos reservamos el derecho de modificar o discontinuar el servicio en cualquier momento.'
        },
        {
          title: '3. Cuenta de Usuario',
          content: 'Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. Acepta aceptar la responsabilidad por todas las actividades que ocurran bajo su cuenta.'
        },
        {
          title: '4. Uso Aceptable',
          content: 'Acepta no usar el servicio para ningún propósito ilegal o no autorizado. No debe violar ninguna ley en su jurisdicción.'
        },
        {
          title: '5. Propiedad Intelectual',
          content: 'El servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de la empresa y sus licenciantes.'
        },
        {
          title: '6. Limitación de Responsabilidad',
          content: 'En ningún caso la empresa será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos.'
        },
        {
          title: '7. Cambios en los Términos',
          content: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de la publicación.'
        },
        {
          title: '8. Contacto',
          content: 'Si tiene preguntas sobre estos Términos de Uso, contáctenos a través de los canales de soporte disponibles.'
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content] || content.pt;

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {currentContent.title}
          </h1>
          <p className="text-muted-foreground">
            {currentContent.lastUpdated}{new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6">
          {currentContent.sections.map((section, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
