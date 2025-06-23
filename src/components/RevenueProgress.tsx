
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAchievements } from '@/hooks/useAchievements';
import { useLanguage } from '@/hooks/useLanguage';

export function RevenueProgress() {
  const { currentRevenue, progressToNext, totalEarned } = useAchievements();
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
      achievements: {
        en: 'Achievements',
        pt: 'Conquistas',
        es: 'Logros',
        ru: 'Достижения',
        de: 'Erfolge'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400 text-sm font-medium">
            {formatCurrency(currentRevenue)} / {formatCurrency(progressToNext.target)}
          </span>
          <div className="flex items-center space-x-1">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <span className="mr-1">🏆</span>
              {getText('achievements')}
            </Badge>
          </div>
        </div>
        <Progress 
          value={progressToNext.percentage} 
          className="w-48 h-2 bg-gray-700"
        />
      </div>
    </div>
  );
}
