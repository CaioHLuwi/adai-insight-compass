
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export default function Privacy() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Política de Privacidade',
      lastUpdated: 'Última atualização: ',
      sections: [
        {
          title: '1. Informações que Coletamos',
          content: 'Coletamos informações que você nos fornece diretamente, como quando cria uma conta, usa nossos serviços ou entra em contato conosco. Isso pode incluir seu nome, endereço de e-mail, informações de perfil e dados de campanhas publicitárias.'
        },
        {
          title: '2. Como Usamos Suas Informações',
          content: 'Usamos as informações coletadas para fornecer, manter e melhorar nossos serviços, processar transações, enviar comunicações e personalizar sua experiência.'
        },
        {
          title: '3. Compartilhamento de Informações',
          content: 'Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto conforme descrito nesta política ou com seu consentimento explícito.'
        },
        {
          title: '4. Segurança dos Dados',
          content: 'Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.'
        },
        {
          title: '5. Retenção de Dados',
          content: 'Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido por lei.'
        },
        {
          title: '6. Seus Direitos',
          content: 'Você tem o direito de acessar, atualizar, corrigir ou excluir suas informações pessoais. Você também pode se opor ao processamento de seus dados em certas circunstâncias.'
        },
        {
          title: '7. Cookies e Tecnologias Similares',
          content: 'Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do serviço e personalizar conteúdo.'
        },
        {
          title: '8. Alterações na Política',
          content: 'Podemos atualizar esta política de privacidade periodicamente. Notificaremos você sobre mudanças significativas publicando a nova política em nosso site.'
        },
        {
          title: '9. Autenticação OAuth (Meta e Google)',
          content: 'Quando você faz login usando sua conta do Meta (Facebook) ou Google, não armazenamos seus dados de login em nosso banco de dados. Utilizamos as APIs OAuth oficiais do Meta e Google apenas para autenticação segura. Suas credenciais permanecem exclusivamente com esses provedores.'
        },
        {
          title: '10. Contato',
          content: 'Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através dos canais de suporte disponíveis.'
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: ',
      sections: [
        {
          title: '1. Information We Collect',
          content: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include your name, email address, profile information, and advertising campaign data.'
        },
        {
          title: '2. How We Use Your Information',
          content: 'We use the collected information to provide, maintain, and improve our services, process transactions, send communications, and personalize your experience.'
        },
        {
          title: '3. Information Sharing',
          content: 'We do not sell, rent, or share your personal information with third parties, except as described in this policy or with your explicit consent.'
        },
        {
          title: '4. Data Security',
          content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          title: '5. Data Retention',
          content: 'We retain your personal information only for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law.'
        },
        {
          title: '6. Your Rights',
          content: 'You have the right to access, update, correct, or delete your personal information. You may also object to the processing of your data in certain circumstances.'
        },
        {
          title: '7. Cookies and Similar Technologies',
          content: 'We use cookies and similar technologies to improve your experience, analyze service usage, and personalize content.'
        },
        {
          title: '8. Policy Changes',
          content: 'We may update this privacy policy periodically. We will notify you of significant changes by posting the new policy on our website.'
        },
        {
          title: '9. OAuth Authentication (Meta and Google)',
          content: 'When you log in using your Meta (Facebook) or Google account, we do not store your login data in our database. We use official OAuth APIs from Meta and Google solely for secure authentication. Your credentials remain exclusively with these providers.'
        },
        {
          title: '10. Contact',
          content: 'If you have questions about this Privacy Policy, please contact us through the available support channels.'
        }
      ]
    },
    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: ',
      sections: [
        {
          title: '1. Información que Recopilamos',
          content: 'Recopilamos información que nos proporciona directamente, como cuando crea una cuenta, usa nuestros servicios o se pone en contacto con nosotros. Esto puede incluir su nombre, dirección de correo electrónico, información de perfil y datos de campañas publicitarias.'
        },
        {
          title: '2. Cómo Usamos Su Información',
          content: 'Utilizamos la información recopilada para proporcionar, mantener y mejorar nuestros servicios, procesar transacciones, enviar comunicaciones y personalizar su experiencia.'
        },
        {
          title: '3. Compartir Información',
          content: 'No vendemos, alquilamos o compartimos su información personal con terceros, excepto como se describe en esta política o con su consentimiento explícito.'
        },
        {
          title: '4. Seguridad de Datos',
          content: 'Implementamos medidas de seguridad técnicas y organizacionales apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.'
        },
        {
          title: '5. Retención de Datos',
          content: 'Retenemos su información personal solo durante el tiempo necesario para cumplir con los propósitos descritos en esta política, a menos que la ley requiera un período de retención más largo.'
        },
        {
          title: '6. Sus Derechos',
          content: 'Usted tiene el derecho de acceder, actualizar, corregir o eliminar su información personal. También puede oponerse al procesamiento de sus datos en ciertas circunstancias.'
        },
        {
          title: '7. Cookies y Tecnologías Similares',
          content: 'Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el uso del servicio y personalizar el contenido.'
        },
        {
          title: '8. Cambios en la Política',
          content: 'Podemos actualizar esta política de privacidad periódicamente. Le notificaremos sobre cambios significativos publicando la nueva política en nuestro sitio web.'
        },
        {
          title: '9. Autenticación OAuth (Meta y Google)',
          content: 'Cuando inicia sesión usando su cuenta de Meta (Facebook) o Google, no almacenamos sus datos de inicio de sesión en nuestra base de datos. Utilizamos las APIs OAuth oficiales de Meta y Google únicamente para autenticación segura. Sus credenciales permanecen exclusivamente con estos proveedores.'
        },
        {
          title: '10. Contacto',
          content: 'Si tiene preguntas sobre esta Política de Privacidad, contáctenos a través de los canales de soporte disponibles.'
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
