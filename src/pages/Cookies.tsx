
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export default function Cookies() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Política de Cookies',
      lastUpdated: 'Última atualização: ',
      sections: [
        {
          title: '1. O que são Cookies',
          content: 'Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita um site. Eles nos ajudam a melhorar sua experiência e fornecer serviços personalizados.'
        },
        {
          title: '2. Tipos de Cookies que Utilizamos',
          content: 'Utilizamos cookies essenciais para o funcionamento do site, cookies de desempenho para analisar o uso, cookies de funcionalidade para lembrar suas preferências e cookies de publicidade para personalizar anúncios.'
        },
        {
          title: '3. Cookies Essenciais',
          content: 'Estes cookies são necessários para o funcionamento básico do site e não podem ser desabilitados. Eles incluem cookies de autenticação e segurança.'
        },
        {
          title: '4. Cookies de Desempenho',
          content: 'Estes cookies nos ajudam a entender como os visitantes interagem com nosso site, coletando informações de forma anônima sobre páginas visitadas e erros encontrados.'
        },
        {
          title: '5. Cookies de Funcionalidade',
          content: 'Estes cookies permitem que o site lembre de escolhas que você fez (como idioma ou região) e forneça recursos aprimorados e mais personalizados.'
        },
        {
          title: '6. Cookies de Terceiros',
          content: 'Podemos usar serviços de terceiros que também colocam cookies em seu dispositivo. Estes são regidos pelas políticas de privacidade desses terceiros.'
        },
        {
          title: '7. Gestão de Cookies',
          content: 'Você pode controlar e/ou excluir cookies conforme desejar. Você pode excluir todos os cookies que já estão em seu computador e configurar a maioria dos navegadores para impedir que sejam colocados.'
        },
        {
          title: '8. Alterações nesta Política',
          content: 'Podemos atualizar esta Política de Cookies periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre nosso uso de cookies.'
        },
        {
          title: '9. Contato',
          content: 'Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco através dos canais de suporte disponíveis.'
        }
      ]
    },
    en: {
      title: 'Cookie Policy',
      lastUpdated: 'Last updated: ',
      sections: [
        {
          title: '1. What are Cookies',
          content: 'Cookies are small text files stored on your device when you visit a website. They help us improve your experience and provide personalized services.'
        },
        {
          title: '2. Types of Cookies We Use',
          content: 'We use essential cookies for site functionality, performance cookies to analyze usage, functionality cookies to remember your preferences, and advertising cookies to personalize ads.'
        },
        {
          title: '3. Essential Cookies',
          content: 'These cookies are necessary for the basic functioning of the site and cannot be disabled. They include authentication and security cookies.'
        },
        {
          title: '4. Performance Cookies',
          content: 'These cookies help us understand how visitors interact with our site, collecting information anonymously about pages visited and errors encountered.'
        },
        {
          title: '5. Functionality Cookies',
          content: 'These cookies allow the site to remember choices you have made (such as language or region) and provide enhanced and more personalized features.'
        },
        {
          title: '6. Third-Party Cookies',
          content: 'We may use third-party services that also place cookies on your device. These are governed by the privacy policies of those third parties.'
        },
        {
          title: '7. Cookie Management',
          content: 'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and set most browsers to prevent them from being placed.'
        },
        {
          title: '8. Changes to this Policy',
          content: 'We may update this Cookie Policy periodically. We recommend that you review this page regularly to stay informed about our use of cookies.'
        },
        {
          title: '9. Contact',
          content: 'If you have questions about our Cookie Policy, please contact us through the available support channels.'
        }
      ]
    },
    es: {
      title: 'Política de Cookies',
      lastUpdated: 'Última actualización: ',
      sections: [
        {
          title: '1. Qué son las Cookies',
          content: 'Las cookies son pequeños archivos de texto almacenados en su dispositivo cuando visita un sitio web. Nos ayudan a mejorar su experiencia y proporcionar servicios personalizados.'
        },
        {
          title: '2. Tipos de Cookies que Utilizamos',
          content: 'Utilizamos cookies esenciales para la funcionalidad del sitio, cookies de rendimiento para analizar el uso, cookies de funcionalidad para recordar sus preferencias y cookies de publicidad para personalizar anuncios.'
        },
        {
          title: '3. Cookies Esenciales',
          content: 'Estas cookies son necesarias para el funcionamiento básico del sitio y no pueden deshabilitarse. Incluyen cookies de autenticación y seguridad.'
        },
        {
          title: '4. Cookies de Rendimiento',
          content: 'Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio, recopilando información de forma anónima sobre páginas visitadas y errores encontrados.'
        },
        {
          title: '5. Cookies de Funcionalidad',
          content: 'Estas cookies permiten que el sitio recuerde las elecciones que ha hecho (como idioma o región) y proporcione características mejoradas y más personalizadas.'
        },
        {
          title: '6. Cookies de Terceros',
          content: 'Podemos usar servicios de terceros que también colocan cookies en su dispositivo. Estos se rigen por las políticas de privacidad de esos terceros.'
        },
        {
          title: '7. Gestión de Cookies',
          content: 'Puede controlar y/o eliminar cookies como desee. Puede eliminar todas las cookies que ya están en su computadora y configurar la mayoría de los navegadores para evitar que se coloquen.'
        },
        {
          title: '8. Cambios en esta Política',
          content: 'Podemos actualizar esta Política de Cookies periódicamente. Recomendamos que revise esta página regularmente para mantenerse informado sobre nuestro uso de cookies.'
        },
        {
          title: '9. Contacto',
          content: 'Si tiene preguntas sobre nuestra Política de Cookies, contáctenos a través de los canales de soporte disponibles.'
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
