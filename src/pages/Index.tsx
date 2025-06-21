
import React from 'react';
import SummaryDashboard from '../components/SummaryDashboard';

const Index = () => {
  // Sample data for demonstration
  const sampleAnomalies = [
    {
      id: '1',
      message: 'CPC increased by 25% in "Holiday Sale" campaign',
      severity: 'high' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      campaign: 'Holiday Sale'
    },
    {
      id: '2',
      message: 'Conversion rate dropped below 2% in "Summer Collection"',
      severity: 'medium' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      campaign: 'Summer Collection'
    },
    {
      id: '3',
      message: 'Daily budget nearly exhausted for "Black Friday"',
      severity: 'low' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
      campaign: 'Black Friday'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SummaryDashboard
          totalSpendToday={2847.32}
          avgCPC={1.24}
          avgCPA={18.67}
          conversionsToday={152}
          recentAnomalies={sampleAnomalies}
        />
      </div>
    </div>
  );
};

export default Index;
