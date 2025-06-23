
import React from 'react';
import { RevenueProgress } from '@/components/RevenueProgress';

export function HeaderControls() {
  return (
    <div className="flex items-center space-x-4 w-full justify-center">
      <RevenueProgress />
    </div>
  );
}
