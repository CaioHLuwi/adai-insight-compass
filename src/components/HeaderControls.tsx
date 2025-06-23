
import React from 'react';
import { RevenueProgress } from '@/components/RevenueProgress';
import { useAchievements } from '@/hooks/useAchievements';
import { Coins } from 'lucide-react';

export function HeaderControls() {
  const { totalCredits } = useAchievements();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1 flex justify-center">
        <RevenueProgress />
      </div>
      <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg px-3 py-1">
        <Coins className="w-4 h-4 text-yellow-400" />
        <span className="text-sm font-medium text-yellow-400">{totalCredits.toLocaleString()}</span>
      </div>
    </div>
  );
}
