
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAchievements } from '@/hooks/useAchievements';
import { useLanguage } from '@/hooks/useLanguage';

const Achievements = () => {
  const { achievements, currentRevenue, totalEarned, progressToNext } = useAchievements();
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

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      title: {
        en: 'Achievements',
        pt: 'Conquistas',
        es: 'Logros',
        ru: 'Достижения',
        de: 'Erfolge'
      },
      totalEarned: {
        en: 'Total Earned',
        pt: 'Total Ganho',
        es: 'Total Ganado',
        ru: 'Всего заработано',
        de: 'Gesamt verdient'
      },
      currentProgress: {
        en: 'Current Progress',
        pt: 'Progresso Atual',
        es: 'Progreso Actual',
        ru: 'Текущий прогресс',
        de: 'Aktueller Fortschritt'
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
      reward: {
        en: 'Reward',
        pt: 'Recompensa',
        es: 'Recompensa',
        ru: 'Награда',
        de: 'Belohnung'
      },
      // Achievement titles
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
        en: 'Reach R$20,000 in revenue',
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
        en: 'Reach R$50,000 in revenue',
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
        en: 'Reach R$100,000 in revenue',
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
        en: 'Reach R$500,000 in revenue',
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
        en: 'Reach R$1,000,000 in revenue',
        pt: 'Alcance R$1.000.000 em receita',
        es: 'Alcanza €1,000,000 en ingresos',
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
        en: 'Reach R$10,000,000 in revenue',
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
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);

  return (
    <div className="p-6 max-w-6xl bg-black min-h-screen">
      <div className="animated-bg"></div>
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        🏆 {getText('title')}
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">{getText('totalEarned')}</h3>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalEarned)}</p>
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
                    {getText('reward')}: {formatCurrency(achievement.reward)}
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
                  {achievement.category === 'revenue' && (
                    <div className="mb-2">
                      <Progress 
                        value={(achievement.currentValue / achievement.target) * 100} 
                        className="w-full h-2 bg-gray-700" 
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formatCurrency(achievement.currentValue)} / {formatCurrency(achievement.target)}
                      </p>
                    </div>
                  )}
                  <Badge className="bg-gray-600/20 text-gray-400 border-gray-600/30">
                    {getText('reward')}: {formatCurrency(achievement.reward)}
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
