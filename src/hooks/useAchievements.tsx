
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './useLanguage';

export interface Achievement {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  target: number;
  currentValue: number;
  isUnlocked: boolean;
  category: 'revenue' | 'campaigns' | 'users' | 'engagement';
  reward: number;
}

interface AchievementsContextType {
  achievements: Achievement[];
  currentRevenue: number;
  totalEarned: number;
  progressToNext: { current: number; target: number; percentage: number };
  updateRevenue: (amount: number) => void;
  unlockAchievement: (id: string) => void;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

const revenueTargets = [20000, 50000, 100000, 500000, 1000000, 10000000];

const initialAchievements: Achievement[] = [
  {
    id: 'first_campaign',
    titleKey: 'firstCampaign',
    descriptionKey: 'firstCampaignDesc',
    icon: '🚀',
    target: 1,
    currentValue: 0,
    isUnlocked: false,
    category: 'campaigns',
    reward: 1000
  },
  {
    id: 'revenue_20k',
    titleKey: 'revenue20k',
    descriptionKey: 'revenue20kDesc',
    icon: '💰',
    target: 20000,
    currentValue: 0,
    isUnlocked: false,
    category: 'revenue',
    reward: 2000
  },
  {
    id: 'revenue_50k',
    titleKey: 'revenue50k',
    descriptionKey: 'revenue50kDesc',
    icon: '💎',
    target: 50000,
    currentValue: 0,
    isUnlocked: false,
    category: 'revenue',
    reward: 5000
  },
  {
    id: 'revenue_100k',
    titleKey: 'revenue100k',
    descriptionKey: 'revenue100kDesc',
    icon: '🏆',
    target: 100000,
    currentValue: 0,
    isUnlocked: false,
    category: 'revenue',
    reward: 10000
  },
  {
    id: 'revenue_500k',
    titleKey: 'revenue500k',
    descriptionKey: 'revenue500kDesc',
    icon: '👑',
    target: 500000,
    currentValue: 0,
    isUnlocked: false,
    category: 'revenue',
    reward: 25000
  },
  {
    id: 'revenue_1m',
    titleKey: 'revenue1m',
    descriptionKey: 'revenue1mDesc',
    icon: '🌟',
    target: 1000000,
    currentValue: 0,
    isUnlocked: false,
    category: 'revenue',
    reward: 50000
  },
  {
    id: 'revenue_10m',
    titleKey: 'revenue10m',
    descriptionKey: 'revenue10mDesc',
    icon: '🎯',
    target: 10000000,
    currentValue: 0,
    isUnlocked: false,
    category: 'revenue',
    reward: 100000
  },
  {
    id: 'user_magnet',
    titleKey: 'userMagnet',
    descriptionKey: 'userMagnetDesc',
    icon: '🧲',
    target: 100,
    currentValue: 0,
    isUnlocked: false,
    category: 'users',
    reward: 3000
  },
  {
    id: 'campaign_master',
    titleKey: 'campaignMaster',
    descriptionKey: 'campaignMasterDesc',
    icon: '⭐',
    target: 50,
    currentValue: 0,
    isUnlocked: false,
    category: 'campaigns',
    reward: 5000
  },
  {
    id: 'engagement_king',
    titleKey: 'engagementKing',
    descriptionKey: 'engagementKingDesc',
    icon: '🔥',
    target: 1000,
    currentValue: 0,
    isUnlocked: false,
    category: 'engagement',
    reward: 7500
  }
];

export function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const stored = localStorage.getItem('achievements');
    return stored ? JSON.parse(stored) : initialAchievements;
  });
  
  const [currentRevenue, setCurrentRevenue] = useState(() => {
    const stored = localStorage.getItem('currentRevenue');
    return stored ? parseFloat(stored) : 0;
  });

  const totalEarned = achievements
    .filter(a => a.isUnlocked)
    .reduce((sum, a) => sum + a.reward, 0);

  const getProgressToNext = () => {
    const nextTarget = revenueTargets.find(target => target > currentRevenue);
    if (!nextTarget) {
      return { current: currentRevenue, target: revenueTargets[revenueTargets.length - 1], percentage: 100 };
    }
    
    const previousTarget = revenueTargets[revenueTargets.indexOf(nextTarget) - 1] || 0;
    const progress = currentRevenue - previousTarget;
    const range = nextTarget - previousTarget;
    const percentage = Math.min((progress / range) * 100, 100);
    
    return { current: currentRevenue, target: nextTarget, percentage };
  };

  const updateRevenue = (amount: number) => {
    const newRevenue = currentRevenue + amount;
    setCurrentRevenue(newRevenue);
    localStorage.setItem('currentRevenue', newRevenue.toString());
    
    // Check for revenue achievements
    setAchievements(prev => {
      const updated = prev.map(achievement => {
        if (achievement.category === 'revenue') {
          const newCurrentValue = newRevenue;
          const isUnlocked = newCurrentValue >= achievement.target;
          return { ...achievement, currentValue: newCurrentValue, isUnlocked };
        }
        return achievement;
      });
      localStorage.setItem('achievements', JSON.stringify(updated));
      return updated;
    });
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      const updated = prev.map(achievement =>
        achievement.id === id ? { ...achievement, isUnlocked: true } : achievement
      );
      localStorage.setItem('achievements', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  return (
    <AchievementsContext.Provider
      value={{
        achievements,
        currentRevenue,
        totalEarned,
        progressToNext: getProgressToNext(),
        updateRevenue,
        unlockAchievement,
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
}

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementsProvider');
  }
  return context;
};
