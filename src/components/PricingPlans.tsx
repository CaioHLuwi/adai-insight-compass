import React, { useState } from 'react';
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
import { Switch } from '@/components/ui/switch';
import { loadStripe } from '@stripe/stripe-js';

// Substitua pela sua chave publicável do Stripe (pk_test_... ou pk_live_...)
const stripePromise = loadStripe('pk_test_51RfqV9INBZIibhVjroUIPseQg5xpd4OGtpc4TSpd5P0AFQdWsaDCBgNzcpTQ78hkABwTuN0AC8KliKknwoFtGQqz00VaqFkx8L');

// Mapeamento dos IDs de Preço do Stripe para cada plano e período
// VOCÊ DEVE SUBSTITUIR ESTES PLACEHOLDERS PELOS SEUS IDS REAIS DO STRIPE
const priceIds = {
  izyStarter: {
    mensal: 'price_1RfxjXINBZIibhVjIeDDZlZp', // Ex: price_123abc...
    anual: 'price_1RfxjXINBZIibhVjIeDDZlZp'   // Ex: price_456def...
  },
  otimizadorPro: {
    mensal: 'price_1RfxkCINBZIibhVj2aIzF996', // Ex: price_789ghi...
    anual: 'price_1RfxkCINBZIibhVj2aIzF996'   // Ex: price_012jkl...
  },
  performanceMaster: {
    mensal: 'price_1RfxkYINBZIibhVjrHXO4ixz', // Ex: price_abc123...
    anual: 'price_1RfxkYINBZIibhVjrHXO4ixz'   // Ex: price_def456...
  },
  kingOtimizer: {
    mensal: 'price_1RfxmEINBZIibhVjKwkFd1Zj', // Ex: price_abc123...
    anual: 'price_1RfxmEINBZIibhVjKwkFd1Zj'   // Ex: price_def456...
  }
};

const Pricing = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState(null);

  const getText = (key) => {
    const translations = {
      title: {
        pt: 'Planos e Preços',
        en: 'Plans and Pricing',
        es: 'Planes y Precios'
      },
      subtitle: {
        pt: 'Escolha o plano ideal para seu negócio e comece a otimizar suas campanhas hoje mesmo.',
        en: 'Choose the ideal plan for your business and start optimizing your campaigns today.',
        es: 'Elige el plan ideal para tu negócio y comienza a optimizar tus campañas hoy mismo.'
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
      },
      perYear: {
        pt: '/ano',
        en: '/year',
        es: '/año'
      },
      monthly: {
        pt: 'Mensal',
        en: 'Monthly',
        es: 'Mensual'
      },
      annual: {
        pt: 'Anual',
        en: 'Annual',
        es: 'Anual'
      },
      save: {
        pt: 'Economize 5%',
        en: 'Save 5%',
        es: 'Ahorra 5%'
      }
    };
    return translations[key]?.[language] || translations[key]?.['pt'] || key;
  };

  const getDisplayPrice = (plan) => {
    if (plan.price === 'Grátis') return plan.price;
    
    // Extract numeric value from price string like "R$ 149,90"
    const numericPrice = parseFloat(plan.price.replace('R$ ', '').replace(',', '.'));
    
    if (isAnnual) {
      // Calculate annual price with 5% discount
      const annualPrice = (numericPrice * 12 * 0.95).toFixed(2).replace('.', ',');
      return `R$ ${annualPrice}`;
    }
    
    return plan.price;
  };

  const plans = [
    {
      id: 'izyStarter',
      name: 'Izy Starter',
      price: 'Grátis',
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
      id: 'otimizadorPro',
      name: 'Otimizador Pro',
      price: 'R$ 149,90',
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
      id: 'performanceMaster',
      name: 'Performance Master',
      price: 'R$ 249,90',
      description: 'Para empresas que buscam alta performance',
      popular: false,
      features: [
        { name: 'Tudo do plano Otimizador Pro', included: true },
        { name: 'Otimizações Preditivas', included: true },
        { name: 'Consultoria Estratégica', included: true },
        { name: 'Suporte Dedicado 24/7', included: true },
        { name: 'API personalizada', included: true },
        { name: 'Usuários ilimitados', included: true },
        { name: 'Implementação assistida', included: true },
        { name: 'Integração personalizada', included: true },
        { name: 'Compliance avançado', included: true },
        { name: 'Treinamentos presenciais', included: true }
      ]
    },
    {
      id: 'kingOtimizer',
      name: 'King Otimizer',
      price: 'R$ 499,90',
      description: 'Para grandes empresas com necessidades específicas',
      popular: false,
      features: [
        { name: 'Tudo do plano Performance Master', included: true },
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

  const handleCheckout = async (planId) => {
    // if (planId === 'kingOtimizer') {
    //   // Para o plano King Otimizer, redireciona para página de contato
    //   navigate('/contato');
    //   return;
    // }

    setLoading(planId);
    
    try {
      const stripe = await stripePromise;
      const priceId = isAnnual ? priceIds[planId]?.anual : priceIds[planId]?.mensal;

      if (!priceId) {
        throw new Error('Price ID não encontrado para este plano');
      }

      // Chama o endpoint do backend para criar a sessão de checkout
      const response = await fetch('https://zeuz.otmizy.com/create-checkout-session.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar sessão de checkout');
      }

      const { sessionId } = await response.json();

      // Redireciona para o Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Erro no redirecionamento:', error);
        alert('Ocorreu um erro ao iniciar o checkout. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
      alert('Ocorreu um erro ao iniciar o checkout. Tente novamente.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">

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

      {/* Billing Toggle Section */}
      <section className="pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              {getText('monthly')}
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-yellow-500"
            />
            <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              {getText('annual')}
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                {getText('save')}
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                     {getDisplayPrice(plan)}
                     {plan.price !== 'Grátis' && (
                       <span className="text-sm text-muted-foreground">
                         {isAnnual ? getText('perYear') : getText('perMonth')}
                       </span>
                     )}
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
                    onClick={() => handleCheckout(plan.id)}
                    disabled={loading === plan.id}
                  >
                    {loading === plan.id ? 'Carregando...' : getText('selectPlan')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Pricing;


