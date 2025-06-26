
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  ArrowLeft,
  CheckCircle,
  X
} from 'lucide-react';
import LanguageDropdown from '@/components/LanguageDropdown';

const Pricing = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        pt: 'Planos e Preços',
        en: 'Plans and Pricing',
        es: 'Planes y Precios'
      },
      subtitle: {
        pt: 'Escolha o plano ideal para seu negócio e comece a otimizar suas campanhas hoje mesmo.',
        en: 'Choose the ideal plan for your business and start optimizing your campaigns today.',
        es: 'Elige el plan ideal para tu negocio y comienza a optimizar tus campañas hoy mismo.'
      },
      backToHome: {
        pt: 'Voltar ao Início',
        en: 'Back to Home',
        es: 'Volver al Inicio'
      },
      selectPlan: {
        pt: 'Escolher Plano',
        en: 'Select Plan',
        es: 'Seleccionar Plan'
      },
      perMonth: {
        pt: '/mês',
        en: '/month',
        es: '/mes'
      }
    };
    return translations[key]?.[language] || translations[key]?.['pt'] || key;
  };

  const plans = [
    {
      name: 'Starter',
      price: 'R$ 99',
      description: 'Perfeito para pequenos negócios que estão começando',
      popular: false,
      features: [
        { name: 'Até 5 campanhas ativas', included: true },
        { name: 'Relatórios básicos', included: true },
        { name: 'Suporte por email', included: true },
        { name: 'Otimização básica com IA', included: true },
        { name: '2 integrações de plataformas', included: true },
        { name: 'Dashboard personalizado', included: false },
        { name: 'Analytics avançado', included: false },
        { name: 'Suporte prioritário', included: false },
        { name: 'Chatbot IA', included: false },
        { name: 'Usuários ilimitados', included: false }
      ]
    },
    {
      name: 'Professional',
      price: 'R$ 299',
      description: 'Ideal para empresas em crescimento',
      popular: true,
      features: [
        { name: 'Campanhas ilimitadas', included: true },
        { name: 'Analytics avançado', included: true },
        { name: 'Suporte prioritário', included: true },
        { name: 'IA completa com otimização avançada', included: true },
        { name: 'Todas as integrações disponíveis', included: true },
        { name: 'Dashboard personalizado', included: true },
        { name: 'Relatórios personalizados', included: true },
        { name: 'Chatbot IA avançado', included: true },
        { name: 'Até 10 usuários', included: true },
        { name: 'API personalizada', included: false }
      ]
    },
    {
      name: 'Enterprise',
      price: 'Personalizado',
      description: 'Para grandes empresas com necessidades específicas',
      popular: false,
      features: [
        { name: 'Tudo do plano Professional', included: true },
        { name: 'Suporte dedicado 24/7', included: true },
        { name: 'SLA garantido', included: true },
        { name: 'Customizações personalizadas', included: true },
        { name: 'Treinamentos presenciais', included: true },
        { name: 'API personalizada', included: true },
        { name: 'Usuários ilimitados', included: true },
        { name: 'Implementação assistida', included: true },
        { name: 'Integração personalizada', included: true },
        { name: 'Compliance avançado', included: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-yellow-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/horizontal-darkmode.png" alt="Otmizy.ai" className="h-8" />
            </div>
            <div className="flex items-center space-x-4">
              <LanguageDropdown />
              <Button
                onClick={() => navigate('/landing')}
                variant="outline"
                className="border-yellow-500/20 hover:bg-yellow-500/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {getText('backToHome')}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent mb-6">
            {getText('title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {getText('subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-yellow-500 bg-yellow-500/5 scale-105' : 'bg-gray-800/50 border-yellow-500/20'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black">
                    Mais Popular
                  </Badge>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold mb-6">
                    {plan.price}
                    {plan.price !== 'Personalizado' && <span className="text-sm text-muted-foreground">{getText('perMonth')}</span>}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'border-yellow-500/20 hover:bg-yellow-500/10'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => navigate('/register')}
                  >
                    {getText('selectPlan')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-yellow-500/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Posso mudar de plano a qualquer momento?</h3>
                <p className="text-muted-foreground">Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas no próximo ciclo de cobrança.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-yellow-500/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Existe período de teste gratuito?</h3>
                <p className="text-muted-foreground">Sim! Oferecemos 14 dias de teste gratuito em todos os planos. Não é necessário cartão de crédito para começar.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-yellow-500/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Como funciona o suporte?</h3>
                <p className="text-muted-foreground">Oferecemos suporte por email para todos os planos. O plano Professional inclui suporte prioritário, e o Enterprise tem suporte dedicado 24/7.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
