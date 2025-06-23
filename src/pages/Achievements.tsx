import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useAchievements } from '@/hooks/useAchievements';
import { useLanguage } from '@/hooks/useLanguage';
import { Zap } from 'lucide-react';

const Achievements = () => {
  const { achievements, currentRevenue, totalCredits, progressToNext } = useAchievements();
  const { language } = useLanguage();

  const formatCurrency = (amount: number) => {
    const currencySymbols = {
      en: '$',
      pt: 'R$',
      es: '€',
      ru: '₽',
      de: '€'
    };

    const symbol = currencySymbols[language] || '$';
    
    if (amount >= 1000000) {
      return `${symbol}${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${symbol}${(amount / 1000).toFixed(0)}K`;
    }
    return `${symbol}${amount.toFixed(2)}`;
  };

  const getRank = (revenue: number) => {
    if (revenue >= 10000000) return { name: 'Topaz', color: 'text-yellow-600', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500' };
    if (revenue >= 1000000) return { name: 'Diamond', color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-400' };
    if (revenue >= 500000) return { name: 'Platinum', color: 'text-gray-300', bgColor: 'bg-gray-500/20', borderColor: 'border-gray-300' };
    if (revenue >= 100000) return { name: 'Gold', color: 'text-yellow-500', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500' };
    if (revenue >= 50000) return { name: 'Silver', color: 'text-gray-400', bgColor: 'bg-gray-400/20', borderColor: 'border-gray-400' };
    if (revenue >= 20000) return { name: 'Bronze', color: 'text-orange-600', bgColor: 'bg-orange-600/20', borderColor: 'border-orange-600' };
    return { name: 'Cooper', color: 'text-orange-800', bgColor: 'bg-orange-800/20', borderColor: 'border-orange-800' };
  };

  const currentRank = getRank(currentRevenue);

  const rankingsData = [
    { name: 'Otmizy.AI', revenue: 15000000, achievements: 22, country: 'Brazil', rank: getRank(15000000) },
    { name: 'Utmify', revenue: 8500000, achievements: 18, country: 'USA', rank: getRank(8500000) },
    { name: 'AdTech Pro', revenue: 3200000, achievements: 15, country: 'Germany', rank: getRank(3200000) },
    { name: 'MarketBoost', revenue: 850000, achievements: 12, country: 'UK', rank: getRank(850000) },
    { name: 'CampaignMax', revenue: 420000, achievements: 10, country: 'Canada', rank: getRank(420000) },
    { name: 'Digital Growth', revenue: 180000, achievements: 8, country: 'France', rank: getRank(180000) },
    { name: 'StartUp Ads', revenue: 15000, achievements: 5, country: 'Spain', rank: getRank(15000) }
  ];

  const ranks = [
    { 
      name: 'Topaz', 
      target: 10000000, 
      color: 'text-yellow-600', 
      bgColor: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/30', 
      borderColor: 'border-yellow-500',
      description: 'The ultimate achievement for marketing legends',
      benefits: ['Unlimited campaigns', 'Priority support', 'Exclusive features']
    },
    { 
      name: 'Diamond', 
      target: 1000000, 
      color: 'text-blue-400', 
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-blue-600/30', 
      borderColor: 'border-blue-400',
      description: 'Elite status for top performers',
      benefits: ['Advanced analytics', 'Custom integrations', 'Dedicated manager']
    },
    { 
      name: 'Platinum', 
      target: 500000, 
      color: 'text-gray-300', 
      bgColor: 'bg-gradient-to-br from-gray-500/20 to-gray-600/30', 
      borderColor: 'border-gray-300',
      description: 'Premium tier for serious marketers',
      benefits: ['Enhanced reporting', 'API access', 'White-label options']
    },
    { 
      name: 'Gold', 
      target: 100000, 
      color: 'text-yellow-500', 
      bgColor: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/30', 
      borderColor: 'border-yellow-500',
      description: 'Advanced level for growing businesses',
      benefits: ['Custom dashboards', 'A/B testing', 'Extended support']
    },
    { 
      name: 'Silver', 
      target: 50000, 
      color: 'text-gray-400', 
      bgColor: 'bg-gradient-to-br from-gray-400/20 to-gray-500/30', 
      borderColor: 'border-gray-400',
      description: 'Intermediate level with enhanced features',
      benefits: ['Multi-channel campaigns', 'Basic analytics', 'Email support']
    },
    { 
      name: 'Bronze', 
      target: 20000, 
      color: 'text-orange-600', 
      bgColor: 'bg-gradient-to-br from-orange-600/20 to-orange-700/30', 
      borderColor: 'border-orange-600',
      description: 'Entry level for ambitious marketers',
      benefits: ['Campaign automation', 'Basic reporting', 'Community support']
    },
    { 
      name: 'Cooper', 
      target: 0, 
      color: 'text-orange-800', 
      bgColor: 'bg-gradient-to-br from-orange-800/20 to-orange-900/30', 
      borderColor: 'border-orange-800',
      description: 'Starting your marketing journey',
      benefits: ['Basic campaigns', 'Standard templates', 'Getting started guide']
    }
  ];

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        en: 'Achievements',
        pt: 'Conquistas',
        es: 'Logros',
        ru: 'Достижения',
        de: 'Erfolge'
      },
      totalCredits: {
        en: 'Total Credits',
        pt: 'Total de Créditos',
        es: 'Total de Créditos',
        ru: 'Всего кредитов',
        de: 'Gesamt Credits'
      },
      currentProgress: {
        en: 'Current Progress',
        pt: 'Progresso Atual',
        es: 'Progreso Actual',
        ru: 'Текущий прогресс',
        de: 'Aktueller Fortschritt'
      },
      currentRank: {
        en: 'Current Rank',
        pt: 'Rank Atual',
        es: 'Rango Actual',
        ru: 'Текущий ранг',
        de: 'Aktueller Rang'
      },
      rankings: {
        en: 'Global Rankings',
        pt: 'Rankings Globais',
        es: 'Rankings Globales',
        ru: 'Глобальные рейтинги',
        de: 'Globale Rankings'
      },
      ranks: {
        en: 'Available Ranks',
        pt: 'Ranks Disponíveis',
        es: 'Rangos Disponibles',
        ru: 'Доступные ранги',
        de: 'Verfügbare Ränge'
      },
      unlocked: {
        en: 'Unlocked',
        pt: 'Desbloqueado',
        es: 'Desbloqueado',
        ru: 'Разблокировано',
        de: 'Freigeschaltet'
      },
      locked: {
        en: 'Locked',
        pt: 'Bloqueado',
        es: 'Bloqueado',
        ru: 'Заблокировано',
        de: 'Gesperrt'
      },
      credits: {
        en: 'Credits',
        pt: 'Créditos',
        es: 'Créditos',
        ru: 'Кредиты',
        de: 'Credits'
      },
      // Achievement titles and descriptions
      firstCampaign: {
        en: 'First Steps',
        pt: 'Primeiros Passos',
        es: 'Primeros Pasos',
        ru: 'Первые шаги',
        de: 'Erste Schritte'
      },
      firstCampaignDesc: {
        en: 'Create your first campaign',
        pt: 'Crie sua primeira campanha',
        es: 'Crea tu primera campaña',
        ru: 'Создайте свою первую кампанию',
        de: 'Erstelle deine erste Kampagne'
      },
      revenue20k: {
        en: 'Rising Star',
        pt: 'Estrela em Ascensão',
        es: 'Estrella en Ascenso',
        ru: 'Восходящая звезда',
        de: 'Aufsteigender Stern'
      },
      revenue20kDesc: {
        en: 'Reach $20,000 in revenue',
        pt: 'Alcance R$20.000 em receita',
        es: 'Alcanza €20,000 en ingresos',
        ru: 'Достигните ₽20,000 дохода',
        de: 'Erreiche €20,000 Umsatz'
      },
      revenue50k: {
        en: 'Profit Pioneer',
        pt: 'Pioneiro do Lucro',
        es: 'Pionero de Ganancias',
        ru: 'Пионер прибыли',
        de: 'Gewinn-Pionier'
      },
      revenue50kDesc: {
        en: 'Reach $50,000 in revenue',
        pt: 'Alcance R$50.000 em receita',
        es: 'Alcanza €50,000 en ingresos',
        ru: 'Достигните ₽50,000 дохода',
        de: 'Erreiche €50,000 Umsatz'
      },
      revenue100k: {
        en: 'Six-Figure Success',
        pt: 'Sucesso de Seis Dígitos',
        es: 'Éxito de Seis Cifras',
        ru: 'Шестизначный успех',
        de: 'Sechsstelliger Erfolg'
      },
      revenue100kDesc: {
        en: 'Reach $100,000 in revenue',
        pt: 'Alcance R$100.000 em receita',
        es: 'Alcanza €100,000 en ingresos',
        ru: 'Достигните ₽100,000 дохода',
        de: 'Erreiche €100,000 Umsatz'
      },
      revenue500k: {
        en: 'Revenue Royalty',
        pt: 'Realeza da Receita',
        es: 'Realeza de Ingresos',
        ru: 'Королевский доход',
        de: 'Umsatz-Royalty'
      },
      revenue500kDesc: {
        en: 'Reach $500,000 in revenue',
        pt: 'Alcance R$500.000 em receita',
        es: 'Alcanza €500,000 en ingresos',
        ru: 'Достигните ₽500,000 дохода',
        de: 'Erreiche €500,000 Umsatz'
      },
      revenue1m: {
        en: 'Millionaire Mindset',
        pt: 'Mentalidade Milionária',
        es: 'Mentalidad Millonaria',
        ru: 'Миллионерское мышление',
        de: 'Millionärs-Mindset'
      },
      revenue1mDesc: {
        en: 'Reach $1,000,000 in revenue',
        pt: 'Alcance R$1.000.000 em receita',
        es: 'Alcanza €1,000.000 en ingresos',
        ru: 'Достигните ₽1,000,000 дохода',
        de: 'Erreiche €1,000,000 Umsatz'
      },
      revenue10m: {
        en: 'Empire Builder',
        pt: 'Construtor de Império',
        es: 'Constructor de Imperio',
        ru: 'Строитель империи',
        de: 'Empire Builder'
      },
      revenue10mDesc: {
        en: 'Reach $10,000,000 in revenue',
        pt: 'Alcance R$10.000.000 em receita',
        es: 'Alcanza €10,000,000 en ingresos',
        ru: 'Достигните ₽10,000,000 дохода',
        de: 'Erreiche €10,000,000 Umsatz'
      },
      userMagnet: {
        en: 'User Magnet',
        pt: 'Ímã de Usuários',
        es: 'Imán de Usuarios',
        ru: 'Магнит пользователей',
        de: 'Benutzer-Magnet'
      },
      userMagnetDesc: {
        en: 'Attract 100 users to your platform',
        pt: 'Atraia 100 usuários para sua plataforma',
        es: 'Atrae 100 usuarios a tu plataforma',
        ru: 'Привлеките 100 пользователей на платформу',
        de: 'Ziehe 100 Benutzer auf deine Plattform'
      },
      campaignMaster: {
        en: 'Campaign Master',
        pt: 'Mestre das Campanhas',
        es: 'Maestro de Campañas',
        ru: 'Мастер кампаний',
        de: 'Kampagnen-Meister'
      },
      campaignMasterDesc: {
        en: 'Create 50 successful campaigns',
        pt: 'Crie 50 campanhas bem-sucedidas',
        es: 'Crea 50 campañas exitosas',
        ru: 'Создайте 50 успешных кампаний',
        de: 'Erstelle 50 erfolgreiche Kampagnen'
      },
      engagementKing: {
        en: 'Engagement King',
        pt: 'Rei do Engajamento',
        es: 'Rey del Compromiso',
        ru: 'Король вовлечения',
        de: 'Engagement-König'
      },
      engagementKingDesc: {
        en: 'Achieve 1000 user interactions',
        pt: 'Alcance 1000 interações de usuários',
        es: 'Logra 1000 interacciones de usuarios',
        ru: 'Достигните 1000 взаимодействий пользователей',
        de: 'Erreiche 1000 Benutzerinteraktionen'
      },
      socialMediaMaster: {
        en: 'Social Media Master',
        pt: 'Mestre das Redes Sociais',
        es: 'Maestro de Redes Sociales',
        ru: 'Мастер социальных сетей',
        de: 'Social Media Meister'
      },
      socialMediaMasterDesc: {
        en: 'Manage 500 social media campaigns',
        pt: 'Gerencie 500 campanhas de redes sociais',
        es: 'Gestiona 500 campañas de redes sociales',
        ru: 'Управляйте 500 кампаниями в социальных сетях',
        de: 'Verwalte 500 Social Media Kampagnen'
      },
      conversionOptimizer: {
        en: 'Conversion Optimizer',
        pt: 'Otimizador de Conversões',
        es: 'Optimizador de Conversiones',
        ru: 'Оптимизатор конверсий',
        de: 'Konversions-Optimierer'
      },
      conversionOptimizerDesc: {
        en: 'Optimize 200 conversion funnels',
        pt: 'Otimize 200 funis de conversão',
        es: 'Optimiza 200 embudos de conversión',
        ru: 'Оптимизируйте 200 воронок конверсии',
        de: 'Optimiere 200 Conversion-Funnels'
      },
      budgetMaster: {
        en: 'Budget Master',
        pt: 'Mestre do Orçamento',
        es: 'Maestro del Presupuesto',
        ru: 'Мастер бюджета',
        de: 'Budget-Meister'
      },
      budgetMasterDesc: {
        en: 'Manage budgets totaling $100,000',
        pt: 'Gerencie orçamentos totalizando R$100.000',
        es: 'Gestiona presupuestos por un total de €100,000',
        ru: 'Управляйте бюджетами на общую сумму ₽100,000',
        de: 'Verwalte Budgets in Höhe von €100,000'
      },
      analyticsPro: {
        en: 'Analytics Pro',
        pt: 'Profissional de Analytics',
        es: 'Profesional de Analytics',
        ru: 'Профессионал аналитики',
        de: 'Analytics-Profi'
      },
      analyticsProDesc: {
        en: 'Generate 50 detailed reports',
        pt: 'Gere 50 relatórios detalhados',
        es: 'Genera 50 informes detallados',
        ru: 'Создайте 50 подробных отчетов',
        de: 'Erstelle 50 detaillierte Berichte'
      },
      retentionExpert: {
        en: 'Retention Expert',
        pt: 'Especialista em Retenção',
        es: 'Experto en Retención',
        ru: 'Эксперт по удержанию',
        de: 'Retention-Experte'
      },
      retentionExpertDesc: {
        en: 'Achieve 75% user retention rate',
        pt: 'Alcance 75% de taxa de retenção de usuários',
        es: 'Logra una tasa de retención del 75%',
        ru: 'Достигните 75% уровня удержания пользователей',
        de: 'Erreiche 75% Benutzerretention'
      },
      campaignExpert: {
        en: 'Campaign Expert',
        pt: 'Especialista em Campanhas',
        es: 'Experto en Campañas',
        ru: 'Эксперт по кампаниям',
        de: 'Kampagnen-Experte'
      },
      campaignExpertDesc: {
        en: 'Create 100 successful campaigns',
        pt: 'Crie 100 campanhas bem-sucedidas',
        es: 'Crea 100 campañas exitosas',
        ru: 'Создайте 100 успешных кампаний',
        de: 'Erstelle 100 erfolgreiche Kampagnen'
      },
      userGrowth: {
        en: 'User Growth Champion',
        pt: 'Campeão de Crescimento de Usuários',
        es: 'Campeón de Crecimiento de Usuarios',
        ru: 'Чемпион роста пользователей',
        de: 'Benutzerwachstums-Champion'
      },
      userGrowthDesc: {
        en: 'Reach 500 active users',
        pt: 'Alcance 500 usuários ativos',
        es: 'Alcanza 500 usuarios activos',
        ru: 'Достигните 500 активных пользователей',
        de: 'Erreiche 500 aktive Benutzer'
      },
      viralContent: {
        en: 'Viral Content Creator',
        pt: 'Criador de Conteúdo Viral',
        es: 'Creador de Contenido Viral',
        ru: 'Создатель вирусного контента',
        de: 'Viral Content Creator'
      },
      viralContentDesc: {
        en: 'Generate 10,000 interactions',
        pt: 'Gere 10.000 interações',
        es: 'Genera 10,000 interacciones',
        ru: 'Создайте 10,000 взаимодействий',
        de: 'Generiere 10,000 Interaktionen'
      },
      influencerPartner: {
        en: 'Influencer Partner',
        pt: 'Parceiro Influenciador',
        es: 'Socio Influencer',
        ru: 'Партнер-инфлюенсер',
        de: 'Influencer-Partner'
      },
      influencerPartnerDesc: {
        en: 'Partner with 50 influencers',
        pt: 'Faça parceria com 50 influenciadores',
        es: 'Asociarse con 50 influencers',
        ru: 'Партнерство с 50 инфлюенсерами',
        de: 'Partner mit 50 Influencern'
      },
      roiChampion: {
        en: 'ROI Champion',
        pt: 'Campeão de ROI',
        es: 'Campeón de ROI',
        ru: 'Чемпион ROI',
        de: 'ROI-Champion'
      },
      roiChampionDesc: {
        en: 'Achieve 300% ROI average',
        pt: 'Alcance 300% de ROI médio',
        es: 'Logra 300% de ROI promedio',
        ru: 'Достигните 300% среднего ROI',
        de: 'Erreiche 300% durchschnittlichen ROI'
      },
      dataScientist: {
        en: 'Data Scientist',
        pt: 'Cientista de Dados',
        es: 'Científico de Datos',
        ru: 'Учёный по данным',
        de: 'Datenwissenschaftler'
      },
      dataScientistDesc: {
        en: 'Analyze 100 data reports',
        pt: 'Analise 100 relatórios de dados',
        es: 'Analiza 100 informes de datos',
        ru: 'Проанализируйте 100 отчетов данных',
        de: 'Analysiere 100 Datenberichte'
      },
      growthHacker: {
        en: 'Growth Hacker',
        pt: 'Hacker de Crescimento',
        es: 'Hacker de Crecimiento',
        ru: 'Хакер роста',
        de: 'Growth Hacker'
      },
      growthHackerDesc: {
        en: 'Drive $1M in growth revenue',
        pt: 'Gere R$1M em receita de crescimento',
        es: 'Genera €1M en ingresos de crecimiento',
        ru: 'Привлеките ₽1M роста доходов',
        de: 'Erziele €1M Wachstumsumsatz'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);

  return (
    <div className="p-6 max-w-7xl bg-background min-h-screen">
      <div className="animated-bg"></div>
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        🏆 {getText('title')}
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">{getText('totalCredits')}</h3>
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            <p className="text-2xl font-bold text-white">{totalCredits.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">{getText('currentProgress')}</h3>
          <p className="text-sm text-gray-300 mb-2">
            {formatCurrency(currentRevenue)} / {formatCurrency(progressToNext.target)}
          </p>
          <Progress value={progressToNext.percentage} className="w-full h-3 bg-gray-700" />
        </div>
        
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">🎯 Achievements</h3>
          <p className="text-2xl font-bold text-white">
            {unlockedAchievements.length}/{achievements.length}
          </p>
        </div>

        <div className={`bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-6 border ${currentRank.borderColor} ${currentRank.bgColor}`}>
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">{getText('currentRank')}</h3>
          <p className={`text-2xl font-bold ${currentRank.color}`}>
            {currentRank.name}
          </p>
        </div>
      </div>

      {/* Available Ranks Carousel */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">🏅 {getText('ranks')}</h2>
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {ranks.map((rank, index) => (
              <CarouselItem key={rank.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className={`${rank.bgColor} backdrop-blur-sm border ${rank.borderColor} hover:scale-105 transition-all duration-300 cursor-pointer h-full`}>
                  <CardHeader>
                    <CardTitle className={`${rank.color} text-xl font-bold`}>{rank.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm mb-3">{rank.description}</p>
                    <p className="text-white font-semibold mb-3">
                      {rank.target === 0 ? 'Starting rank' : formatCurrency(rank.target)}
                    </p>
                    <div className="space-y-1">
                      {rank.benefits.map((benefit, idx) => (
                        <p key={idx} className="text-xs text-gray-400">• {benefit}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10" />
          <CarouselNext className="text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10" />
        </Carousel>
      </div>

      {/* Global Rankings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">🌍 {getText('rankings')}</h2>
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg border border-yellow-500/20 overflow-hidden">
          {rankingsData.map((company, index) => (
            <div
              key={company.name}
              className={`p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 transition-colors ${index === 0 ? 'bg-yellow-500/10' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-yellow-400">#{index + 1}</span>
                  <div className={`w-12 h-12 rounded-full border-2 ${company.rank.borderColor} ${company.rank.bgColor} flex items-center justify-center`}>
                    <span className={`text-xs font-bold ${company.rank.color}`}>{company.rank.name}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{company.name}</h3>
                    <p className="text-sm text-gray-400">{company.country}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{formatCurrency(company.revenue)}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${company.rank.color}`}>{company.rank.name}</span>
                    <span className="text-sm text-gray-400">• {company.achievements} achievements</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlocked Achievements */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400">✨ {getText('unlocked')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/30"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-400">{getText(achievement.titleKey)}</h3>
                  <p className="text-sm text-gray-300 mb-2">{getText(achievement.descriptionKey)}</p>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    <Zap className="w-3 h-3 mr-1" />
                    {achievement.credits} {getText('credits')}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Achievements */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-400">🔒 {getText('locked')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg p-4 border border-gray-600/30 opacity-75"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl grayscale">{achievement.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-400">{getText(achievement.titleKey)}</h3>
                  <p className="text-sm text-gray-500 mb-2">{getText(achievement.descriptionKey)}</p>
                  <div className="mb-2">
                    <Progress 
                      value={(achievement.currentValue / achievement.target) * 100} 
                      className="w-full h-2 bg-gray-700" 
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {achievement.category === 'revenue' ? formatCurrency(achievement.currentValue) : achievement.currentValue} / {achievement.category === 'revenue' ? formatCurrency(achievement.target) : achievement.target}
                    </p>
                  </div>
                  <Badge className="bg-gray-600/20 text-gray-400 border-gray-600/30">
                    <Zap className="w-3 h-3 mr-1" />
                    {achievement.credits} {getText('credits')}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
