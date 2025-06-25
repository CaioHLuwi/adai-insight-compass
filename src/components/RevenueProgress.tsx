
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAchievements } from '@/hooks/useAchievements';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';

export function RevenueProgress() {
  const { currentRevenue, progressToNext } = useAchievements();
  const { language } = useLanguage();
  const navigate = useNavigate();

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
    <div className="flex items-center justify-between w-full max-w-2xl">
      <div className="flex flex-col space-y-1 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400 text-xs font-medium">
              {formatCurrency(currentRevenue)} / {formatCurrency(progressToNext.target)}
            </span>
            <button
              onClick={() => navigate('/achievements')}
              className="flex items-center space-x-1 hover:bg-yellow-500/10 px-1 py-0.5 rounded transition-colors"
            >
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 cursor-pointer hover:bg-yellow-500/30 text-xs">
                <span className="mr-1">🏆</span>
                {getText('achievements')}
              </Badge>
            </button>
          </div>
        </div>
        <Progress 
          value={progressToNext.percentage} 
          className="w-full h-2 bg-gray-700"
        />
      </div>
    </div>
  );
}
