
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
  category: 'revenue' | 'campaigns' | 'users' | 'engagement' | 'social' | 'performance' | 'analytics' | 'growth';
  credits: number;
}

interface AchievementsContextType {
  achievements: Achievement[];
  currentRevenue: number;
  totalCredits: number;
  progressToNext: { current: number; target: number; percentage: number };
  updateRevenue: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  spendCredits: (amount: number) => boolean;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

const revenueTargets = [20000, 50000, 100000, 500000, 1000000, 10000000];

const initialAchievements: Achievement[] = [
  // Revenue achievements
  {
    id: 'revenue_20k',
    titleKey: 'revenue20k',
    descriptionKey: 'revenue20kDesc',
    icon: '💰',
    target: 20000,
    currentValue: 0,
    isUnlocked: false,
    category: 'revenue',
    credits: 500
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
    credits: 1000
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
    credits: 2500
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
    credits: 5000
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
    credits: 10000
  },
  {
    id: 'revenue_10m',
    titleKey: 'revenue10m',
    descriptionKey: 'revenue10mDesc',
    icon: '💎',
    target: 10000000,
    currentValue: 0,
    isUnlocked: false,
    category: 'revenue',
    credits: 25000
  },
  // Campaign achievements
  {
    id: 'first_campaign',
    titleKey: 'firstCampaign',
    descriptionKey: 'firstCampaignDesc',
    icon: '🚀',
    target: 1,
    currentValue: 1,
    isUnlocked: true,
    category: 'campaigns',
    credits: 100
  },
  {
    id: 'campaign_master',
    titleKey: 'campaignMaster',
    descriptionKey: 'campaignMasterDesc',
    icon: '⭐',
    target: 50,
    currentValue: 15,
    isUnlocked: false,
    category: 'campaigns',
    credits: 1500
  },
  {
    id: 'campaign_expert',
    titleKey: 'campaignExpert',
    descriptionKey: 'campaignExpertDesc',
    icon: '🎯',
    target: 100,
    currentValue: 15,
    isUnlocked: false,
    category: 'campaigns',
    credits: 3000
  },
  // User achievements
  {
    id: 'user_magnet',
    titleKey: 'userMagnet',
    descriptionKey: 'userMagnetDesc',
    icon: '🧲',
    target: 100,
    currentValue: 65,
    isUnlocked: false,
    category: 'users',
    credits: 800
  },
  {
    id: 'user_growth',
    titleKey: 'userGrowth',
    descriptionKey: 'userGrowthDesc',
    icon: '📈',
    target: 500,
    currentValue: 65,
    isUnlocked: false,
    category: 'users',
    credits: 2000
  },
  {
    id: 'retention_expert',
    titleKey: 'retentionExpert',
    descriptionKey: 'retentionExpertDesc',
    icon: '🔄',
    target: 75,
    currentValue: 45,
    isUnlocked: false,
    category: 'users',
    credits: 1200
  },
  // Engagement achievements
  {
    id: 'engagement_king',
    titleKey: 'engagementKing',
    descriptionKey: 'engagementKingDesc',
    icon: '🔥',
    target: 1000,
    currentValue: 450,
    isUnlocked: false,
    category: 'engagement',
    credits: 1800
  },
  {
    id: 'viral_content',
    titleKey: 'viralContent',
    descriptionKey: 'viralContentDesc',
    icon: '📱',
    target: 10000,
    currentValue: 450,
    isUnlocked: false,
    category: 'engagement',
    credits: 5000
  },
  // Social media achievements
  {
    id: 'social_media_master',
    titleKey: 'socialMediaMaster',
    descriptionKey: 'socialMediaMasterDesc',
    icon: '📱',
    target: 500,
    currentValue: 125,
    isUnlocked: false,
    category: 'social',
    credits: 1500
  },
  {
    id: 'influencer_partner',
    titleKey: 'influencerPartner',
    descriptionKey: 'influencerPartnerDesc',
    icon: '🌟',
    target: 50,
    currentValue: 12,
    isUnlocked: false,
    category: 'social',
    credits: 2500
  },
  // Performance achievements
  {
    id: 'conversion_optimizer',
    titleKey: 'conversionOptimizer',
    descriptionKey: 'conversionOptimizerDesc',
    icon: '🎯',
    target: 200,
    currentValue: 85,
    isUnlocked: false,
    category: 'performance',
    credits: 1800
  },
  {
    id: 'budget_master',
    titleKey: 'budgetMaster',
    descriptionKey: 'budgetMasterDesc',
    icon: '💼',
    target: 100000,
    currentValue: 45000,
    isUnlocked: false,
    category: 'performance',
    credits: 2200
  },
  {
    id: 'roi_champion',
    titleKey: 'roiChampion',
    descriptionKey: 'roiChampionDesc',
    icon: '📊',
    target: 300,
    currentValue: 120,
    isUnlocked: false,
    category: 'performance',
    credits: 3000
  },
  // Analytics achievements
  {
    id: 'analytics_pro',
    titleKey: 'analyticsPro',
    descriptionKey: 'analyticsProDesc',
    icon: '📊',
    target: 50,
    currentValue: 28,
    isUnlocked: false,
    category: 'analytics',
    credits: 1000
  },
  {
    id: 'data_scientist',
    titleKey: 'dataScientist',
    descriptionKey: 'dataScientistDesc',
    icon: '🔬',
    target: 100,
    currentValue: 28,
    isUnlocked: false,
    category: 'analytics',
    credits: 2800
  },
  // Growth achievements
  {
    id: 'growth_hacker',
    titleKey: 'growthHacker',
    descriptionKey: 'growthHackerDesc',
    icon: '🚀',
    target: 1000000,
    currentValue: 150000,
    isUnlocked: false,
    category: 'growth',
    credits: 4000
  }
];

export function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const stored = localStorage.getItem('achievements');
    return stored ? JSON.parse(stored) : initialAchievements;
  });
  
  const [currentRevenue, setCurrentRevenue] = useState(() => {
    const stored = localStorage.getItem('currentRevenue');
    return stored ? parseFloat(stored) : 15000000; // Set to 15M for Topaz rank
  });

  // Add 50k credits bonus
  const totalCredits = achievements
    .filter(a => a.isUnlocked)
    .reduce((sum, a) => sum + a.credits, 0) + 50000;

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

  const spendCredits = (amount: number) => {
    if (totalCredits >= amount) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  return (
    <AchievementsContext.Provider
      value={{
        achievements,
        currentRevenue,
        totalCredits,
        progressToNext: getProgressToNext(),
        updateRevenue,
        unlockAchievement,
        spendCredits,
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
