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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-teal-600/10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Glassmorphism Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-lg' 
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
              <a href="/landing-secondary#features" className="text-white/70 hover:text-blue-400 transition-colors">
                Recursos
              </a>
              <a href="/landing-secondary#results" className="text-white/70 hover:text-blue-400 transition-colors">
                Resultados
              </a>
              <a href="/landing-secondary#pricing" className="text-white/70 hover:text-blue-400 transition-colors">
                Preços
              </a>
              <a href="/landing-secondary#contact" className="text-white/70 hover:text-blue-400 transition-colors">
                Garantia
              </a>
              <LanguageDropdown />
              <Button
                onClick={() => navigate('/login')}
                variant="ghost"
                className="text-blue-400 hover:text-blue-300"
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
              <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 text-sm px-4 py-2">
                {getText('badge')}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {getText('heroTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{getText('heroSubtitle')}</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                {getText('heroDescription')} <span className="font-semibold text-white">{getText('heroFeature1')} {getText('heroFeature2')}</span>
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
                  className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-4 text-lg font-semibold transition-all duration-300"
                >
                  {getText('scheduleDemo')}
                </Button>
              </div>
              <div className="flex items-center text-slate-400">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <span>{getText('trustedText')}</span>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
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
          <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
            O TRACKING DE VERDADE
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {getText('featuresTitle')}
          </h2>
          <p className="text-xl text-slate-300 mb-16 max-w-3xl mx-auto">
            {getText('featuresSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300 transform hover:scale-105 rounded-2xl">
                <CardContent className="p-8 text-center">
                  <div className="text-blue-400 mb-6 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
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
          <p className="text-xl text-slate-300 mb-16 max-w-3xl mx-auto">
            {getText('resultsSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50 rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="text-blue-400 mb-6 flex justify-center">{result.icon}</div>
                  <h3 className="text-lg font-medium text-slate-300 mb-2">{result.title}</h3>
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
                    {result.value}
                  </div>
                  <p className="text-slate-400">{result.description}</p>
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
              <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
                RASTREAMENTO AVANÇADO PARA META ADS
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Rastreamento preciso configurado em minutos
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Nosso sistema de rastreamento avançado para Meta Ads é configurado em poucos minutos e captura conversões com precisão mesmo em cenários desafiadores.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-300">Configuração simples e rápida</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-300">Funciona mesmo com bloqueadores de anúncios</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-300">Atribuição precisa de fontes de tráfego</span>
                </div>
              </div>
              <Button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold"
              >
                Ver como funciona
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-medium">Meta Ads Padrão</span>
                    <span className="text-2xl font-bold text-red-400">67%</span>
                  </div>
                  <div className="text-sm text-green-300">Precisão média</div>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-medium">Com Otmizy</span>
                    <span className="text-2xl font-bold text-green-400">99%</span>
                  </div>
                  <div className="text-sm text-blue-300">Precisão comprovada</div>
                </div>
                <div className="mt-6 text-center">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
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
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
                <img 
                  src="/lovable-uploads/a7abf8a9-3e50-41f8-9f5e-3e7949379468.png" 
                  alt="Campaign Management" 
                  className="w-full rounded-lg"
                />
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400">Contas</Button>
                  <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400">Campanhas</Button>
                  <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400">Conjuntos</Button>
                  <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400">Anúncios</Button>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 mt-4">
                  <div className="flex items-center text-blue-400 text-sm">
                    <Zap className="w-4 h-4 mr-2" />
                    Controle total sobre suas campanhas
                  </div>
                  <div className="text-slate-400 text-xs mt-1">
                    Ative, pause e ajuste orçamentos com um clique
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
                GERENCIAMENTO DE CAMPANHAS
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Gerencie todas suas contas e campanhas do Meta Ads em um só lugar
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Controle todas as suas contas do Meta Ads - mesmo de diferentes perfis e Business Managers - com uma interface intuitiva e poderosa.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-300">Controle múltiplas contas e Business Managers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-300">Gerencie contas de anúncios de forma unificada</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-300">Ative/desative campanhas, conjuntos de anúncios e anúncios</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-300">Ajuste orçamentos em tempo real</span>
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
              <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
                DASHBOARDS PERSONALIZÁVEIS
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Dashboards magníficos prontos para usar
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Crie dashboards incríveis com nossos templates prontos ou personalize completamente com um sistema de arrastar e soltar intuitivo.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-300">Templates prontos para uso</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-300">Personalizações completas por arrastar e soltar</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                  <span className="text-slate-300">Compartilhamento com clientes e equipe</span>
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
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-slate-400 text-sm">Dashboard Otmizy</span>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded p-3">
                        <div className="text-blue-400 text-xs mb-1">Meta Ads</div>
                        <div className="text-white text-lg font-bold">R$ 25.760</div>
                        <div className="text-green-400 text-xs">+12.5%</div>
                      </div>
                      <div className="bg-slate-800/50 rounded p-3">
                        <div className="text-blue-400 text-xs mb-1">Conversões</div>
                        <div className="text-white text-lg font-bold">1,247</div>
                        <div className="text-green-400 text-xs">+8.2%</div>
                      </div>
                    </div>
                    <div className="mt-4 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded flex items-end justify-around p-2">
                      <div className="bg-blue-500 w-4 h-8 rounded-sm"></div>
                      <div className="bg-blue-500 w-4 h-12 rounded-sm"></div>
                      <div className="bg-blue-500 w-4 h-6 rounded-sm"></div>
                      <div className="bg-blue-500 w-4 h-16 rounded-sm"></div>
                      <div className="bg-blue-500 w-4 h-10 rounded-sm"></div>
                      <div className="bg-blue-500 w-4 h-14 rounded-sm"></div>
                      <div className="bg-blue-500 w-4 h-18 rounded-sm"></div>
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
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Escolha o plano ideal para transformar suas campanhas e maximizar seu retorno sobre investimento
          </p>
          <PricingPlans />
        </div>
      </section>

      {/* Demo Popup */}
      <DemoPopup open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
};

export default LandingSecondary;