import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  TrendingUp, 
  Shield, 
  Users, 
  BarChart3, 
  Target,
  Star,
  Play,
  ChevronDown
} from 'lucide-react';
import LanguageDropdown from '@/components/LanguageDropdown';
import PlatformsCarousel from '@/components/PlatformsCarousel';

const Landing = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        pt: 'Otimize suas campanhas com IA',
        en: 'Optimize your campaigns with AI',
        es: 'Optimiza tus campañas con IA'
      },
      subtitle: {
        pt: 'Transforme seus dados de marketing em insights acionáveis e aumente seu ROI com nossa plataforma de inteligência artificial.',
        en: 'Transform your marketing data into actionable insights and increase your ROI with our artificial intelligence platform.',
        es: 'Transforma tus datos de marketing en insights accionables y aumenta tu ROI con nuestra plataforma de inteligencia artificial.'
      },
      startFree: {
        pt: 'Começar Gratuitamente',
        en: 'Start Free',
        es: 'Comenzar Gratis'
      },
      watchDemo: {
        pt: 'Ver Demo',
        en: 'Watch Demo',
        es: 'Ver Demo'
      },
      trustedBy: {
        pt: 'Confiado por mais de 1.000 empresas',
        en: 'Trusted by over 1,000 companies',
        es: 'Confiado por más de 1,000 empresas'
      },
      features: {
        pt: 'Recursos',
        en: 'Features',
        es: 'Características'
      },
      featureTitle: {
        pt: 'Tudo que você precisa para otimizar suas campanhas',
        en: 'Everything you need to optimize your campaigns',
        es: 'Todo lo que necesitas para optimizar tus campañas'
      },
      aiOptimization: {
        pt: 'Otimização com IA',
        en: 'AI Optimization',
        es: 'Optimización con IA'
      },
      aiOptimizationDesc: {
        pt: 'Algoritmos inteligentes que otimizam automaticamente suas campanhas em tempo real.',
        en: 'Smart algorithms that automatically optimize your campaigns in real time.',
        es: 'Algoritmos inteligentes que optimizan automáticamente tus campañas en tiempo real.'
      },
      advancedAnalytics: {
        pt: 'Analytics Avançado',
        en: 'Advanced Analytics',
        es: 'Analytics Avanzado'
      },
      advancedAnalyticsDesc: {
        pt: 'Relatórios detalhados e insights profundos sobre o desempenho das suas campanhas.',
        en: 'Detailed reports and deep insights about your campaign performance.',
        es: 'Informes detallados y insights profundos sobre el rendimiento de tus campañas.'
      },
      multiPlatform: {
        pt: 'Multi-Plataforma',
        en: 'Multi-Platform',
        es: 'Multi-Plataforma'
      },
      multiPlatformDesc: {
        pt: 'Conecte todas suas contas de anúncios em um só lugar para uma visão unificada.',
        en: 'Connect all your ad accounts in one place for a unified view.',
        es: 'Conecta todas tus cuentas de anuncios en un solo lugar para una vista unificada.'
      },
      security: {
        pt: 'Segurança Total',
        en: 'Total Security',
        es: 'Seguridad Total'
      },
      securityDesc: {
        pt: 'Seus dados estão protegidos com criptografia de nível militar e conformidade GDPR.',
        en: 'Your data is protected with military-grade encryption and GDPR compliance.',
        es: 'Tus datos están protegidos con cifrado de nivel militar y cumplimiento GDPR.'
      },
      pricing: {
        pt: 'Preços',
        en: 'Pricing',
        es: 'Precios'
      },
      pricingTitle: {
        pt: 'Planos para todas as necessidades',
        en: 'Plans for all needs',
        es: 'Planes para todas las necesidades'
      },
      starter: {
        pt: 'Iniciante',
        en: 'Starter',
        es: 'Principiante'
      },
      professional: {
        pt: 'Profissional',
        en: 'Professional',
        es: 'Profesional'
      },
      enterprise: {
        pt: 'Empresarial',
        en: 'Enterprise',
        es: 'Empresarial'
      },
      perMonth: {
        pt: '/mês',
        en: '/month',
        es: '/mes'
      },
      selectPlan: {
        pt: 'Escolher Plano',
        en: 'Select Plan',
        es: 'Seleccionar Plan'
      },
      testimonials: {
        pt: 'Depoimentos',
        en: 'Testimonials',
        es: 'Testimonios'
      },
      testimonialsTitle: {
        pt: 'O que nossos clientes dizem',
        en: 'What our customers say',
        es: 'Lo que dicen nuestros clientes'
      },
      cta: {
        pt: 'Pronto para começar?',
        en: 'Ready to get started?',
        es: '¿Listo para comenzar?'
      },
      ctaDesc: {
        pt: 'Junte-se a milhares de empresas que já estão otimizando suas campanhas com nossa IA.',
        en: 'Join thousands of companies that are already optimizing their campaigns with our AI.',
        es: 'Únete a miles de empresas que ya están optimizando sus campañas con nuestra IA.'
      },
      login: {
        pt: 'Entrar',
        en: 'Login',
        es: 'Iniciar Sesión'
      }
    };
    return translations[key]?.[language] || translations[key]?.['pt'] || key;
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: getText('aiOptimization'),
      description: getText('aiOptimizationDesc')
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: getText('advancedAnalytics'),
      description: getText('advancedAnalyticsDesc')
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: getText('multiPlatform'),
      description: getText('multiPlatformDesc')
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: getText('security'),
      description: getText('securityDesc')
    }
  ];

  const plans = [
    {
      name: getText('starter'),
      price: 'R$ 99',
      features: ['Até 5 campanhas', 'Relatórios básicos', 'Suporte por email', 'Otimização básica']
    },
    {
      name: getText('professional'),
      price: 'R$ 299',
      features: ['Campanhas ilimitadas', 'Analytics avançado', 'Suporte prioritário', 'IA completa', 'Integrações'],
      popular: true
    },
    {
      name: getText('enterprise'),
      price: 'Personalizado',
      features: ['Tudo do Pro', 'Suporte dedicado', 'SLA garantido', 'Customizações', 'Treinamentos']
    }
  ];

  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'CEO, TechStartup',
      content: 'Aumentamos nosso ROI em 150% em apenas 3 meses usando a Otmizy.ai',
      rating: 5
    },
    {
      name: 'Carlos Santos',
      role: 'Marketing Director, E-commerce Plus',
      content: 'A automação da IA nos economiza 20 horas por semana em otimização manual.',
      rating: 5
    },
    {
      name: 'Maria Oliveira',
      role: 'Growth Manager, SaaS Company',
      content: 'Os insights são incríveis. Descobrimos oportunidades que nunca vimos antes.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Geometric Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-yellow-500 rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-500/10 rounded-full"></div>
        <div className="absolute top-80 left-1/4 w-16 h-16 border-2 border-orange-500 rotate-12"></div>
        <div className="absolute bottom-80 right-10 w-40 h-40 border border-yellow-500 rotate-45"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-orange-500/10 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-yellow-500/10 rotate-45"></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 border border-orange-500 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-yellow-500/20 rotate-45"></div>
        
        {/* Additional geometric shapes */}
        <div className="absolute top-60 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-6 bg-yellow-500/10 rotate-45"></div>
        </div>
        <div className="absolute bottom-60 right-1/3">
          <div className="w-10 h-10 border border-orange-500/30 rounded-full"></div>
        </div>
      </div>

      {/* Header */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-yellow-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/horizontal-darkmode.png" alt="Otmizy.ai" className="h-8" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-yellow-400 transition-colors">
                {getText('features')}
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-yellow-400 transition-colors">
                {getText('pricing')}
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-yellow-400 transition-colors">
                {getText('testimonials')}
              </a>
              <LanguageDropdown />
              <Button
                onClick={() => navigate('/login')}
                variant="ghost"
                className="text-yellow-400 hover:text-yellow-300"
              >
                {getText('login')}
              </Button>
              <Button
                onClick={() => navigate('/register')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                {getText('startFree')}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
            🚀 Nova versão com IA avançada disponível
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent mb-6">
            {getText('title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {getText('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {getText('startFree')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-yellow-500/20 hover:bg-yellow-500/10">
              <Play className="mr-2 w-4 h-4" />
              {getText('watchDemo')}
            </Button>
          </div>
          <p className="text-muted-foreground">{getText('trustedBy')}</p>
          
          {/* Hero Image/Dashboard Preview */}
          <div className="mt-12 relative">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-8 mx-auto max-w-4xl">
              <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gray-800/50 border-yellow-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">ROI</span>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-2xl font-bold text-green-400">+247%</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/50 border-yellow-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Campanhas</span>
                        <Target className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div className="text-2xl font-bold text-yellow-400">1,247</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-800/50 border-yellow-500/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Economia</span>
                        <Zap className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="text-2xl font-bold text-blue-400">R$ 54k</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Integration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Integramos com as melhores plataformas do mercado!
            </h2>
            <p className="text-xl text-muted-foreground">
              Conecte suas campanhas de mais de 50 plataformas diferentes
            </p>
          </div>
          <PlatformsCarousel />
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="border-yellow-500/20 hover:bg-yellow-500/10"
            >
              Ver todas as integrações
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{getText('featureTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma oferece tudo que você precisa para maximizar seus resultados.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-yellow-500/20 hover:bg-gray-800/70 transition-colors">
                <CardContent className="p-6">
                  <div className="text-yellow-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{getText('pricingTitle')}</h2>
            <p className="text-xl text-muted-foreground">
              Escolha o plano ideal para seu negócio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-yellow-500 bg-yellow-500/5' : 'bg-gray-800/50 border-yellow-500/20'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black">
                    Mais Popular
                  </Badge>
                )}
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-4">
                    {plan.price}
                    {plan.price !== 'Personalizado' && <span className="text-sm text-muted-foreground">{getText('perMonth')}</span>}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-sm">{feature}</span>
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{getText('testimonialsTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-yellow-500/20">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{getText('cta')}</h2>
          <p className="text-xl text-muted-foreground mb-8">
            {getText('ctaDesc')}
          </p>
          <Button
            onClick={() => navigate('/register')}
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            {getText('startFree')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-yellow-500/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="/horizontal-darkmode.png" alt="Otmizy.ai" className="h-8 mb-4" />
              <p className="text-muted-foreground">
                Otimize suas campanhas com inteligência artificial.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/features" className="hover:text-yellow-400">Recursos</a></li>
                <li><a href="/pricing" className="hover:text-yellow-400">Preços</a></li>
                <li><a href="/login" className="hover:text-yellow-400">Login</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/terms" className="hover:text-yellow-400">Termos</a></li>
                <li><a href="/privacy" className="hover:text-yellow-400">Privacidade</a></li>
                <li><a href="/cookies" className="hover:text-yellow-400">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>contato@otmizy.ai</li>
                <li>+55 (11) 99999-9999</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-yellow-500/20 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Otmizy.ai. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
