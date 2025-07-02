import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
  ChevronDown,
  Trophy,
  Award,
  Crown,
  Gem,
  Bot,
  Lightbulb,
  Rocket,
  Brain,
  ArrowLeft
} from 'lucide-react';
import LanguageDropdown from '@/components/LanguageDropdown';
import PlatformsCarousel from '@/components/PlatformsCarousel';
import AchievementSection from '@/components/AchievementSection';
import IzyAIAgent from '@/components/IzyAIAgent';
import PricingPlans from '@/components/PricingPlans';

const Landing = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isAnnual, setIsAnnual] = useState(true);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    achievements: false,
    pricing: false,
    testimonials: false
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = ['hero', 'features', 'achievements', 'pricing', 'testimonials'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        pt: 'Otimize suas campanhas com IA',
        en: 'Optimize your campaigns with AI',
        es: 'Optimiza tus campañas con IA'
      },
      subtitle: {
        pt: 'A primeira plataforma que te permitirá ter lucro REAL mesmo sem saber estratégias complexas de otimização de campanhas de tráfego pago e mais.',
        en: 'The first platform that will allow you to have REAL profit even without knowing complex traffic campaign optimization strategies and more.',
        es: 'La primera plataforma que te permitirá tener ganancias REALES incluso sin conocer estrategias complejas de optimización de campañas de tráfego y más.'
      },
      startFree: {
        pt: 'Testar 7 dias Grátis',
        en: 'Test 7 days Free',
        es: 'Probar 7 días Gratis'
      },
      watchDemo: {
        pt: 'Ver Demo',
        en: 'Watch Demo',
        es: 'Ver Demo'
      },
      trustedBy: {
        pt: 'Confiada pelos grandes players do digital',
        en: 'Trusted by the big digital players',
        es: 'Confiada por los grandes players digitales'
      },
      features: {
        pt: 'Recursos',
        en: 'Features',
        es: 'Características'
      },
      featureTitle: {
        pt: 'Oferecemos tudo que você precisa para maximizar seus resultados no digital, de forma simples e direta usando machine learning avançado.',
        en: 'We offer everything you need to maximize your digital results, simply and directly using advanced machine learning.',
        es: 'Ofrecemos todo lo que necesitas para maximizar tus resultados digitales, de forma simple y directa usando machine learning avanzado.'
      },
      achievementsTitle: {
        pt: 'Conquiste premiações Únicas',
        en: 'Earn Unique Awards',
        es: 'Conquista premios únicos'
      },
      achievementsSubtitle: {
        pt: 'Seja recompensado pelo seu progresso no digital',
        en: 'Be rewarded for your digital progress',
        es: 'Sé recompensado por tu progreso digital'
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
        pt: 'Planos',
        en: 'Plans',
        es: 'Planes'
      },
      pricingTitle: {
        pt: 'Planos para alavancar sua operação',
        en: 'Plans to leverage your operation',
        es: 'Planes para apalancar tu operación'
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
      perYear: {
        pt: '/ano',
        en: '/year',
        es: '/año'
      },
      selectPlan: {
        pt: 'Escolher Plano',
        en: 'Select Plan',
        es: 'Seleccionar Plan'
      },
      testimonials: {
        pt: 'Feedback',
        en: 'Feedback',
        es: 'Feedback'
      },
      testimonialsTitle: {
        pt: 'Depoimentos dos nossos usuários e parceiros',
        en: 'Testimonials from our users and partners',
        es: 'Testimonios de nuestros usuarios y socios'
      },
      cta: {
        pt: 'Bora aumentar seu R.O.I?',
        en: 'Ready to increase your R.O.I?',
        es: '¿Vamos a aumentar tu R.O.I?'
      },
      ctaDesc: {
        pt: 'Junte-se a milhares de usuários que já estão otimizando suas campanhas com nossa IA.',
        en: 'Join thousands of users who are already optimizing their campaigns with our AI.',
        es: 'Únete a miles de usuarios que ya están optimizando sus campañas con nuestra IA.'
      },
      login: {
        pt: 'Entrar',
        en: 'Login',
        es: 'Iniciar Sesión'
      },
      backToHome: {
        pt: 'Voltar ao Início',
        en: 'Back to Home',
        es: 'Volver al Inicio'
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

  const getPlans = () => {
    const monthlyPlans = [
      {
        name: getText('starter'),
        price: 'R$ 99',
        originalPrice: 'R$ 149',
        features: ['Até 5 campanhas', 'Relatórios básicos', 'Suporte por email', 'Otimização básica'],
        savings: undefined
      },
      {
        name: getText('professional'),
        price: 'R$ 299',
        originalPrice: 'R$ 399',
        features: ['Campanhas ilimitadas', 'Analytics avançado', 'Suporte prioritário', 'IA completa', 'Integrações'],
        popular: true,
        savings: undefined
      },
      {
        name: getText('enterprise'),
        price: 'Personalizado',
        originalPrice: '',
        features: ['Tudo do Pro', 'Suporte dedicado', 'SLA garantido', 'Customizações', 'Treinamentos'],
        savings: undefined
      }
    ];

    const annualPlans = [
      {
        name: getText('starter'),
        price: 'R$ 79',
        originalPrice: 'R$ 99',
        features: ['Até 5 campanhas', 'Relatórios básicos', 'Suporte por email', 'Otimização básica'],
        savings: '20% desconto'
      },
      {
        name: getText('professional'),
        price: 'R$ 239',
        originalPrice: 'R$ 299',
        features: ['Campanhas ilimitadas', 'Analytics avançado', 'Suporte prioritário', 'IA completa', 'Integrações'],
        popular: true,
        savings: '20% desconto'
      },
      {
        name: getText('enterprise'),
        price: 'Personalizado',
        originalPrice: '',
        features: ['Tudo do Pro', 'Suporte dedicado', 'SLA garantido', 'Customizações', 'Treinamentos'],
        savings: '20% desconto'
      }
    ];

    return isAnnual ? annualPlans : monthlyPlans;
  };

  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'CEO, TechStartup',
      content: 'Com a Otmizy.ai conseguimos reduzir nosso CAC em 40% e aumentar as conversões em 150%. A plataforma é intuitiva e os insights são realmente acionáveis.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Carlos Santos',
      role: 'Marketing Director, E-commerce Plus',
      content: 'O sistema de gamificação me motiva a otimizar constantemente. Já conquistei 15 badges e meu ROI nunca esteve tão alto. Recomendo para qualquer profissional de tráfego.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Maria Oliveira',
      role: 'Growth Manager, SaaS Company',
      content: 'A Izy (IA da plataforma) me sugeriu 3 otimizações que sozinha jamais pensaria. O resultado foi um aumento de 85% no ROAS em apenas 2 semanas.',
      rating: 5,
      avatar: '👩‍🚀'
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Geometric Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-yellow-500 rotate-45" style={{transform: `translateY(${scrollY * 0.1}px)`}}></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-500/10 rounded-full" style={{transform: `translateY(${scrollY * 0.15}px)`}}></div>
        <div className="absolute top-80 left-1/4 w-16 h-16 border-2 border-orange-500 rotate-12" style={{transform: `translateY(${scrollY * 0.2}px)`}}></div>
        <div className="absolute bottom-80 right-10 w-40 h-40 border border-yellow-500 rotate-45" style={{transform: `translateY(${scrollY * -0.1}px)`}}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-orange-500/10 rounded-full" style={{transform: `translateY(${scrollY * -0.15}px)`}}></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-yellow-500/10 rotate-45" style={{transform: `translateY(${scrollY * 0.25}px)`}}></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 border border-orange-500 rounded-full" style={{transform: `translateY(${scrollY * 0.12}px)`}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-yellow-500/20 rotate-45" style={{transform: `translateY(${scrollY * -0.2}px)`}}></div>
      </div>

      {/* Header */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-yellow-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex-shrink-0">
                <img src="/horizontal-darkmode.png" alt="Otmizy.ai" className="h-8 w-auto object-contain" />
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="text-muted-foreground hover:text-yellow-400 transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{getText('backToHome')}</span>
              </Button>
              <span className="text-muted-foreground">BR</span>
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
            🏆 A primeira plataforma com sistema de gamificação
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
              className="bg-yellow-500 hover:bg-yellow-600 text-black hover-scale rounded-lg"
            >
              {getText('startFree')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-yellow-500/20 hover:bg-yellow-500/10 hover-scale rounded-lg">
              <Play className="mr-2 w-4 h-4" />
              {getText('watchDemo')}
            </Button>
          </div>
          <p className="text-muted-foreground">{getText('trustedBy')}</p>
          
          {/* Izy AI Agent Section */}
          <IzyAIAgent />
        </div>
      </section>

      {/* Achievements Section */}
      <AchievementSection 
        isVisible={isVisible.achievements}
        getText={getText}
      />

      {/* Features Section */}
      <section id="features" className={`py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-300 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tudo que você precisa para otimizar suas campanhas</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {getText('featureTitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-yellow-500/20 hover:bg-gray-800/70 transition-all duration-300 hover-scale rounded-lg">
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
      <PricingPlans />
      
      {/* Testimonials Section */}
      <section id="testimonials" className={`py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-500 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{getText('testimonialsTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-yellow-500/20 hover-scale rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">"{testimonial.content}"</p>
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
            className="bg-yellow-500 hover:bg-yellow-600 text-black hover-scale rounded-lg"
          >
            {getText('startFree')}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Platforms Integration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Conecte com +55 plataformas diferentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Conecte suas campanhas de mais de 55+ plataformas diferentes
            </p>
          </div>
          
          <PlatformsCarousel />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-yellow-500/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="/horizontal-darkmode.png" alt="Otmizy.ai" className="h-8 mb-4 w-auto object-contain" />
              <p className="text-muted-foreground">
                Otimize suas campanhas com inteligência artificial.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/features" className="hover:text-yellow-400 story-link">Recursos</a></li>
                <li><a href="/pricing" className="hover:text-yellow-400 story-link">Planos</a></li>
                <li><a href="/login" className="hover:text-yellow-400 story-link">Login</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/terms" className="hover:text-yellow-400 story-link">Termos</a></li>
                <li><a href="/privacy" className="hover:text-yellow-400 story-link">Privacidade</a></li>
                <li><a href="/cookies" className="hover:text-yellow-400 story-link">Cookies</a></li>
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
          <div className="border-t border-yellow-500/20 mt-8 pt-8 flex justify-between items-center">
            <p className="text-muted-foreground">&copy; 2025 Otmizy | Todos os direitos reservados</p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/otmizy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black hover:bg-yellow-600 transition-colors hover-scale"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black hover:bg-yellow-600 transition-colors hover-scale"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black hover:bg-yellow-600 transition-colors hover-scale"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
