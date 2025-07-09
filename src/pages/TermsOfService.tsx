import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export default function TermsOfService() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    pt: {
      title: 'Termos de Serviço',
      lastUpdated: 'Última atualização: ',
      sections: [
        {
          title: '1. Aceitação dos Termos',
          content: 'Ao acessar e usar nossa plataforma, você concorda em cumprir e estar vinculado a estes Termos de Serviço. Se você não concorda com qualquer parte destes termos, não deve usar nosso serviço.'
        },
        {
          title: '2. Descrição do Serviço',
          content: 'Nossa plataforma oferece ferramentas de automação e otimização para campanhas publicitárias digitais. O serviço inclui análises, relatórios, gerenciamento de campanhas e recursos de integração com plataformas de publicidade.'
        },
        {
          title: '3. Contas de Usuário',
          content: 'Você é responsável por manter a confidencialidade de sua conta e senha. Você concorda em aceitar responsabilidade por todas as atividades que ocorrem sob sua conta.'
        },
        {
          title: '4. Uso Aceitável',
          content: 'Você concorda em usar nosso serviço apenas para fins legais e de acordo com estes Termos. É proibido usar o serviço para atividades fraudulentas, spam, ou qualquer atividade que viole leis aplicáveis.'
        },
        {
          title: '5. Propriedade Intelectual',
          content: 'Todo o conteúdo, funcionalidades e tecnologia do nosso serviço são de propriedade exclusiva da empresa ou de nossos licenciadores e são protegidos por direitos autorais, marcas registradas e outras leis.'
        },
        {
          title: '6. Assinatura e Pagamentos',
          content: 'Nossos serviços são oferecidos por meio de planos de assinatura. Os pagamentos são processados de acordo com o plano escolhido. O cancelamento pode ser feito a qualquer momento através das configurações da conta.'
        },
        {
          title: '7. Limitação de Responsabilidade',
          content: 'Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados, uso ou outras perdas intangíveis.'
        },
        {
          title: '8. Rescisão',
          content: 'Podemos encerrar ou suspender sua conta imediatamente, sem aviso prévio, por qualquer motivo, incluindo violação destes Termos de Serviço.'
        },
        {
          title: '9. Modificações dos Termos',
          content: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. Mudanças significativas serão notificadas através do serviço ou por e-mail.'
        },
        {
          title: '10. Lei Aplicável',
          content: 'Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem consideração aos seus conflitos de princípios legais.'
        },
        {
          title: '11. Contato',
          content: 'Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco através dos canais de suporte disponíveis.'
        }
      ]
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: ',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing and using our platform, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our service.'
        },
        {
          title: '2. Service Description',
          content: 'Our platform provides automation and optimization tools for digital advertising campaigns. The service includes analytics, reporting, campaign management, and integration features with advertising platforms.'
        },
        {
          title: '3. User Accounts',
          content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.'
        },
        {
          title: '4. Acceptable Use',
          content: 'You agree to use our service only for lawful purposes and in accordance with these Terms. It is prohibited to use the service for fraudulent activities, spam, or any activity that violates applicable laws.'
        },
        {
          title: '5. Intellectual Property',
          content: 'All content, functionality, and technology of our service are the exclusive property of the company or our licensors and are protected by copyrights, trademarks, and other laws.'
        },
        {
          title: '6. Subscription and Payments',
          content: 'Our services are offered through subscription plans. Payments are processed according to the chosen plan. Cancellation can be done at any time through account settings.'
        },
        {
          title: '7. Limitation of Liability',
          content: 'Under no circumstances shall we be liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, or other intangible losses.'
        },
        {
          title: '8. Termination',
          content: 'We may terminate or suspend your account immediately, without prior notice, for any reason, including violation of these Terms of Service.'
        },
        {
          title: '9. Terms Modifications',
          content: 'We reserve the right to modify these terms at any time. Significant changes will be notified through the service or by email.'
        },
        {
          title: '10. Governing Law',
          content: 'These Terms will be governed by and interpreted in accordance with the laws of Brazil, without regard to its conflict of legal principles.'
        },
        {
          title: '11. Contact',
          content: 'If you have questions about these Terms of Service, please contact us through the available support channels.'
        }
      ]
    },
    es: {
      title: 'Términos de Servicio',
      lastUpdated: 'Última actualización: ',
      sections: [
        {
          title: '1. Aceptación de los Términos',
          content: 'Al acceder y usar nuestra plataforma, usted acepta cumplir y estar sujeto a estos Términos de Servicio. Si no está de acuerdo con cualquier parte de estos términos, no debe usar nuestro servicio.'
        },
        {
          title: '2. Descripción del Servicio',
          content: 'Nuestra plataforma proporciona herramientas de automatización y optimización para campañas publicitarias digitales. El servicio incluye análisis, informes, gestión de campañas y características de integración con plataformas publicitarias.'
        },
        {
          title: '3. Cuentas de Usuario',
          content: 'Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. Acepta asumir la responsabilidad de todas las actividades que ocurran bajo su cuenta.'
        },
        {
          title: '4. Uso Aceptable',
          content: 'Acepta usar nuestro servicio solo para fines legales y de acuerdo con estos Términos. Está prohibido usar el servicio para actividades fraudulentas, spam o cualquier actividad que viole las leyes aplicables.'
        },
        {
          title: '5. Propiedad Intelectual',
          content: 'Todo el contenido, funcionalidad y tecnología de nuestro servicio son propiedad exclusiva de la empresa o nuestros licenciantes y están protegidos por derechos de autor, marcas comerciales y otras leyes.'
        },
        {
          title: '6. Suscripción y Pagos',
          content: 'Nuestros servicios se ofrecen a través de planes de suscripción. Los pagos se procesan según el plan elegido. La cancelación se puede hacer en cualquier momento a través de la configuración de la cuenta.'
        },
        {
          title: '7. Limitación de Responsabilidad',
          content: 'Bajo ninguna circunstancia seremos responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pérdida de beneficios, datos, uso u otras pérdidas intangibles.'
        },
        {
          title: '8. Terminación',
          content: 'Podemos terminar o suspender su cuenta inmediatamente, sin previo aviso, por cualquier motivo, incluyendo violación de estos Términos de Servicio.'
        },
        {
          title: '9. Modificaciones de los Términos',
          content: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios significativos serán notificados a través del servicio o por correo electrónico.'
        },
        {
          title: '10. Ley Aplicable',
          content: 'Estos Términos se regirán e interpretarán de acuerdo con las leyes de Brasil, sin consideración a sus conflictos de principios legales.'
        },
        {
          title: '11. Contacto',
          content: 'Si tiene preguntas sobre estos Términos de Servicio, contáctenos a través de los canales de soporte disponibles.'
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