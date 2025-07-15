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
  Eye,
  Activity,
  Gauge,
  Settings
} from 'lucide-react';
import LanguageDropdown from '@/components/LanguageDropdown';
import PlatformsCarousel from '@/components/PlatformsCarousel';
import AchievementSection from '@/components/AchievementSection';
import IzyAIAgent from '@/components/IzyAIAgent';
import PricingPlans from '@/components/PricingPlans';
import DemoPopup from '@/components/DemoPopup';

const LandingSecondary = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isAnnual, setIsAnnual] = useState(true);
  const [demoOpen, setDemoOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    results: false,
    tracking: false,
    management: false,
    dashboards: false,
    pricing: false
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

    const sections = ['hero', 'features', 'results', 'tracking', 'management', 'dashboards', 'pricing'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      badge: {
        pt: '🏆 PLATAFORMA LÍDER EM RASTREAMENTO E GERENCIAMENTO DE META ADS',
        en: '🏆 LEADING PLATFORM IN META ADS TRACKING AND MANAGEMENT',
        es: '🏆 PLATAFORMA LÍDER EN SEGUIMIENTO Y GESTIÓN DE META ADS'
      },
      heroTitle: {
        pt: 'Pare de queimar dinheiro:',
        en: 'Stop burning money:',
        es: 'Deja de quemar dinero:'
      },
      heroSubtitle: {
        pt: 'recupere as conversões que o Pixel não enxerga.',
        en: 'recover the conversions the Pixel can\'t see.',
        es: 'recupera las conversiones que el Pixel no ve.'
      },
      heroDescription: {
        pt: 'A única solução que permite rastreamento preciso e gerenciamento completo das suas campanhas do Meta Ads.',
        en: 'The only solution that allows precise tracking and complete management of your Meta Ads campaigns.',
        es: 'La única solución que permite seguimiento preciso y gestión completa de tus campañas de Meta Ads.'
      },
      heroFeature1: {
        pt: 'Sem código.',
        en: 'No code.',
        es: 'Sin código.'
      },
      heroFeature2: {
        pt: 'Sem pegadinhas.',
        en: 'No tricks.',
        es: 'Sin trucos.'
      },
      moreResults: {
        pt: 'Quero mais 20% de resultado',
        en: 'I want 20% more results',
        es: 'Quiero 20% más de resultados'
      },
      scheduleDemo: {
        pt: 'Agendar Demonstração',
        en: 'Schedule Demo',
        es: 'Agendar Demostración'
      },
      trustedText: {
        pt: 'Mais de 1.000 empresas confiam em nós',
        en: 'More than 1,000 companies trust us',
        es: 'Más de 1,000 empresas confían en nosotros'
      },
      featuresTitle: {
        pt: 'A Melhor tecnologia de rastreamento do mercado em 2025',
        en: 'The Best tracking technology in the market in 2025',
        es: 'La Mejor tecnología de seguimiento del mercado en 2025'
      },
      featuresSubtitle: {
        pt: 'Descubra como o Otmizy revoluciona o rastreamento de conversões e otimização de campanhas',
        en: 'Discover how Otmizy revolutionizes conversion tracking and campaign optimization',
        es: 'Descubre cómo Otmizy revoluciona el seguimiento de conversiones y optimización de campañas'
      },
      advancedTracking: {
        pt: 'Rastreamento Avançado',
        en: 'Advanced Tracking',
        es: 'Seguimiento Avanzado'
      },
      campaignManagement: {
        pt: 'Gerenciamento de Campanhas',
        en: 'Campaign Management',
        es: 'Gestión de Campañas'
      },
      personalizedDashboards: {
        pt: 'Dashboards Personalizáveis',
        en: 'Customizable Dashboards',
        es: 'Dashboards Personalizables'
      },
      teamCollaboration: {
        pt: 'Colaboração em Equipe',
        en: 'Team Collaboration',
        es: 'Colaboración en Equipo'
      },
      resultsTitle: {
        pt: 'Resultados extraordinários para seu negócio',
        en: 'Extraordinary results for your business',
        es: 'Resultados extraordinarios para tu negocio'
      },
      resultsSubtitle: {
        pt: 'Nossos clientes experimentam melhorias significativas em suas métricas de marketing digital',
        en: 'Our clients experience significant improvements in their digital marketing metrics',
        es: 'Nuestros clientes experimentan mejoras significativas en sus métricas de marketing digital'
      },
      conversionPrecision: {
        pt: 'Precisão de Conversão',
        en: 'Conversion Precision',
        es: 'Precisión de Conversión'
      },
      roasIncrease: {
        pt: 'Aumento de ROAS',
        en: 'ROAS Increase',
        es: 'Aumento de ROAS'
      },
      cpaReduction: {
        pt: 'Redução de CPA',
        en: 'CPA Reduction',
        es: 'Reducción de CPA'
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
      icon: <Zap className="w-8 h-8" />,
      title: getText('advancedTracking'),
      description: 'Registre todas as conversões de seus anúncios do Meta com precisão e facilidade.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: getText('campaignManagement'),
      description: 'Controle todas suas contas e campanhas do Meta Ads em um único lugar.'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: getText('personalizedDashboards'),
      description: 'Crie dashboards incríveis com templates prontos ou personalizações completas.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: getText('teamCollaboration'),
      description: 'Organize por projetos e convide colaboradores com diferentes níveis de acesso.'
    }
  ];

  const results = [
    {
      icon: <Target className="w-12 h-12" />,
      title: getText('conversionPrecision'),
      value: '99%',
      description: 'de precisão no rastreamento de conversões'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: getText('roasIncrease'),
      value: 'até 35%',
      description: 'de aumento médio no retorno sobre investimento'
    },
    {
      icon: <Gauge className="w-12 h-12" />,
      title: getText('cpaReduction'),
      value: 'até 28%',
      description: 'de redução média no custo por aquisição'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/3 to-yellow-600/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Glassmorphism Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-gray-900/80 backdrop-blur-xl border-b border-yellow-500/20 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/">
                <img src="/horizontal-darkmode.png" alt="Otmizy.ai" className="h-8" />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="/landing-secondary#features" className="text-white/70 hover:text-yellow-400 transition-colors">
                Recursos
              </a>
              <a href="/landing-secondary#results" className="text-white/70 hover:text-yellow-400 transition-colors">
                Resultados
              </a>
              <a href="/landing-secondary#pricing" className="text-white/70 hover:text-yellow-400 transition-colors">
                Preços
              </a>
              <a href="/landing-secondary#contact" className="text-white/70 hover:text-yellow-400 transition-colors">
                Garantia
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
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Otimizar Campanhas
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className={`pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-sm px-4 py-2">
                {getText('badge')}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {getText('heroTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">{getText('heroSubtitle')}</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                {getText('heroDescription')} <span className="font-semibold text-yellow-400">{getText('heroFeature1')} {getText('heroFeature2')}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  onClick={() => navigate('/register')}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {getText('moreResults')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setDemoOpen(true)}
                  className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  {getText('scheduleDemo')}
                </Button>
              </div>
              <div className="flex items-center text-gray-400">
                <CheckCircle className="w-5 h-5 text-yellow-400 mr-2" />
                <span>{getText('trustedText')}</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20 shadow-2xl">
                <img 
                  src="/lovable-uploads/b1f79875-a66a-4b12-b0be-7ade699db5fd.png"
                  alt="Dashboard Preview" 
                  className="w-full rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-300 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
            O TRACKING DE VERDADE
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {getText('featuresTitle')}
          </h2>
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            {getText('featuresSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/30 backdrop-blur-sm border-yellow-500/20 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105 rounded-2xl">
                <CardContent className="p-8 text-center">
                  <div className="text-yellow-400 mb-6 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className={`py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-500 ${isVisible.results ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {getText('resultsTitle')}
          </h2>
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            {getText('resultsSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-yellow-500/20 rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="text-yellow-400 mb-6 flex justify-center">{result.icon}</div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">{result.title}</h3>
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-4">
                    {result.value}
                  </div>
                  <p className="text-gray-400">{result.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section id="tracking" className={`py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-700 ${isVisible.tracking ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                RASTREAMENTO AVANÇADO PARA META ADS
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Rastreamento preciso configurado em minutos
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Nosso sistema de rastreamento avançado para Meta Ads é configurado em poucos minutos e captura conversões com precisão mesmo em cenários desafiadores.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Configuração simples e rápida</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Funciona mesmo com bloqueadores de anúncios</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Atribuição precisa de fontes de tráfego</span>
                </div>
              </div>
              <Button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-4 text-lg font-semibold"
              >
                Ver como funciona
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 shadow-2xl">
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-red-400 font-medium">Meta Ads Padrão</span>
                    <span className="text-2xl font-bold text-red-400">67%</span>
                  </div>
                  <div className="text-sm text-red-300">Precisão média</div>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-medium">Com Otmizy</span>
                    <span className="text-2xl font-bold text-yellow-400">99%</span>
                  </div>
                  <div className="text-sm text-yellow-300">Precisão comprovada</div>
                </div>
                <div className="mt-6 text-center">
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    +31% mais conversões
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section id="management" className={`py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-900 ${isVisible.management ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 shadow-2xl">
                <img 
                  src="/lovable-uploads/a7abf8a9-3e50-41f8-9f5e-3e7949379468.png" 
                  alt="Campaign Management" 
                  className="w-full rounded-lg"
                />
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <Button size="sm" variant="outline" className="border-yellow-500/30 text-yellow-400">Contas</Button>
                  <Button size="sm" variant="outline" className="border-yellow-500/30 text-yellow-400">Campanhas</Button>
                  <Button size="sm" variant="outline" className="border-yellow-500/30 text-yellow-400">Conjuntos</Button>
                  <Button size="sm" variant="outline" className="border-yellow-500/30 text-yellow-400">Anúncios</Button>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 mt-4">
                  <div className="flex items-center text-yellow-400 text-sm">
                    <Zap className="w-4 h-4 mr-2" />
                    Controle total sobre suas campanhas
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    Ative, pause e ajuste orçamentos com um clique
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge className="mb-6 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                GERENCIAMENTO DE CAMPANHAS
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Gerencie todas suas contas e campanhas do Meta Ads em um só lugar
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Controle todas as suas contas do Meta Ads - mesmo de diferentes perfis e Business Managers - com uma interface intuitiva e poderosa.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Controle múltiplas contas e Business Managers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Gerencie contas de anúncios de forma unificada</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Ative/desative campanhas, conjuntos de anúncios e anúncios</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Ajuste orçamentos em tempo real</span>
                </div>
              </div>
              <Button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold"
              >
                Explorar gerenciamento de campanhas
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboards Section */}
      <section id="dashboards" className={`py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-1100 ${isVisible.dashboards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                DASHBOARDS PERSONALIZÁVEIS
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Dashboards magníficos prontos para usar
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Crie dashboards incríveis com nossos templates prontos ou personalize completamente com um sistema de arrastar e soltar intuitivo.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Templates prontos para uso</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Personalizações completas por arrastar e soltar</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-300">Compartilhamento com clientes e equipe</span>
                </div>
              </div>
              <Button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold"
              >
                Conhecer nossos dashboards
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 shadow-2xl">
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-400 text-sm">Dashboard Otmizy</span>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 rounded p-3">
                        <div className="text-yellow-400 text-xs mb-1">Meta Ads</div>
                        <div className="text-white text-lg font-bold">R$ 25.760</div>
                        <div className="text-yellow-400 text-xs">+12.5%</div>
                      </div>
                      <div className="bg-gray-800/50 rounded p-3">
                        <div className="text-yellow-400 text-xs mb-1">Conversões</div>
                        <div className="text-white text-lg font-bold">1,247</div>
                        <div className="text-yellow-400 text-xs">+8.2%</div>
                      </div>
                    </div>
                    <div className="mt-4 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded flex items-end justify-around p-2">
                      <div className="bg-yellow-500 w-4 h-8 rounded-sm"></div>
                      <div className="bg-yellow-500 w-4 h-12 rounded-sm"></div>
                      <div className="bg-yellow-500 w-4 h-6 rounded-sm"></div>
                      <div className="bg-yellow-500 w-4 h-16 rounded-sm"></div>
                      <div className="bg-yellow-500 w-4 h-10 rounded-sm"></div>
                      <div className="bg-yellow-500 w-4 h-14 rounded-sm"></div>
                      <div className="bg-yellow-500 w-4 h-18 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={`py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 delay-1300 ${isVisible.pricing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Potencialize seus resultados
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Escolha o plano ideal para transformar suas campanhas e maximizar seu retorno sobre investimento
          </p>
          <PricingPlans />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
              DEPOIMENTOS
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empresas que confiam no Otmizy para otimizar suas campanhas e maximizar resultados
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-yellow-500/20 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "Com o Otmizy conseguimos rastrear 31% mais conversões que não eram capturadas pelo pixel do Meta. O ROI disparou!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-black font-bold mr-4">
                    CM
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Carlos Martins</h4>
                    <p className="text-gray-400 text-sm">CEO, E-commerce Digital</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-yellow-500/20 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "Finalmente uma ferramenta que mostra o real desempenho das nossas campanhas. A interface é incrível e os dados são precisos."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-black font-bold mr-4">
                    FS
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Fernanda Silva</h4>
                    <p className="text-gray-400 text-sm">Marketing Manager, TechStart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-yellow-500/20 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "Reduziu nosso CPA em 28% e conseguimos escalar as campanhas com muito mais confiança. Recomendo para qualquer agência!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-black font-bold mr-4">
                    RO
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Rafael Oliveira</h4>
                    <p className="text-gray-400 text-sm">Founder, Digital Growth Agency</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-r from-yellow-500/5 to-orange-500/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Mais de 1.000 empresas já confiam no Otmizy
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="h-16 bg-gray-700/50 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold">Empresa A</span>
            </div>
            <div className="h-16 bg-gray-700/50 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold">Empresa B</span>
            </div>
            <div className="h-16 bg-gray-700/50 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold">Empresa C</span>
            </div>
            <div className="h-16 bg-gray-700/50 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold">Empresa D</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-12 border border-yellow-500/20 shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Garantia de 30 dias ou seu dinheiro de volta
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experimente o Otmizy por 30 dias. Se não conseguir melhorar seus resultados em pelo menos 20%, devolvemos 100% do seu investimento.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Setup Gratuito</h3>
                <p className="text-gray-400">Nossa equipe configura tudo para você</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Suporte Dedicado</h3>
                <p className="text-gray-400">Atendimento prioritário via WhatsApp</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Resultados Garantidos</h3>
                <p className="text-gray-400">Melhore em 20% ou dinheiro de volta</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-4 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Começar agora com garantia
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Popup */}
      <DemoPopup open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
};

export default LandingSecondary;