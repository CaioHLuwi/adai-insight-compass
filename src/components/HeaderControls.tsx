
import React from 'react';
import { UserProfile } from '@/components/UserProfile';
import { RevenueProgress } from '@/components/RevenueProgress';

export function HeaderControls() {
  return (
    <div className="flex items-center space-x-4 w-full">
      <RevenueProgress />
      <UserProfile />
    </div>
  );
}
