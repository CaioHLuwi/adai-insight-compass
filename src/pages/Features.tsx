
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  ArrowLeft,
  Zap, 
  BarChart3, 
  Target,
  Shield,
  Users,
  Bot,
  TrendingUp,
  Globe,
  Lock,
  Smartphone,
  CheckCircle
} from 'lucide-react';
import LanguageDropdown from '@/components/LanguageDropdown';

const Features = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        pt: 'Recursos da Plataforma',
        en: 'Platform Features',
        es: 'Características de la Plataforma'
      },
      subtitle: {
        pt: 'Descubra todas as funcionalidades que tornam a Otmizy.ai a melhor escolha para otimização de campanhas.',
        en: 'Discover all the features that make Otmizy.ai the best choice for campaign optimization.',
        es: 'Descubre todas las funcionalidades que hacen de Otmizy.ai la mejor opción para optimización de campañas.'
      },
      backToHome: {
        pt: 'Voltar ao Início',
        en: 'Back to Home',
        es: 'Volver al Inicio'
      },
      startFree: {
        pt: 'Começar Gratuitamente',
        en: 'Start Free',
        es: 'Comenzar Gratis'
      }
    };
    return translations[key]?.[language] || translations[key]?.['pt'] || key;
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Otimização com IA Avançada',
      description: 'Algoritmos de machine learning que analisam e otimizam suas campanhas automaticamente em tempo real.',
      benefits: ['Otimização automática 24/7', 'Análise preditiva', 'Aprendizado contínuo']
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics Completo',
      description: 'Relatórios detalhados com métricas avançadas para acompanhar o desempenho de todas suas campanhas.',
      benefits: ['Dashboards personalizáveis', 'Métricas em tempo real', 'Relatórios automatizados']
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Multi-Plataforma',
      description: 'Conecte todas suas contas de anúncios em um só lugar para uma visão unificada dos resultados.',
      benefits: ['50+ integrações', 'Sincronização automática', 'Gestão centralizada']
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'Chatbot Inteligente',
      description: 'Assistente virtual que responde suas dúvidas e fornece insights sobre suas campanhas.',
      benefits: ['Suporte 24/7', 'Insights personalizados', 'Análise por voz']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Segurança Avançada',
      description: 'Seus dados estão protegidos com criptografia de nível militar e conformidade total com GDPR.',
      benefits: ['Criptografia AES-256', 'Conformidade GDPR', 'Backup automático']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Colaboração em Equipe',
      description: 'Trabalhe em equipe com permissões personalizadas e compartilhamento seguro de dados.',
      benefits: ['Usuários ilimitados', 'Permissões granulares', 'Audit logs']
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

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-yellow-500/20 hover:bg-gray-800/70 transition-colors">
                <CardContent className="p-8">
                  <div className="text-yellow-400 mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para experimentar todos esses recursos?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Comece gratuitamente e veja como a IA pode transformar suas campanhas.
          </p>
          <Button
            onClick={() => navigate('/register')}
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            {getText('startFree')}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Features;
