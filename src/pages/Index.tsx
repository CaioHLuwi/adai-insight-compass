
import React from 'react';
import SummaryDashboard from '../components/SummaryDashboard';
import { useLanguage } from '@/hooks/useLanguage';

const Index = () => {
  const { language } = useLanguage();

  // Sample data for demonstration
  const sampleAnomalies = [
    {
      id: '1',
      message: language === 'pt' 
        ? 'CPC aumentou 25% na campanha "Promoção de Fim de Ano"' 
        : 'CPC increased by 25% in "Holiday Sale" campaign',
      severity: 'high' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      campaign: language === 'pt' ? 'Promoção de Fim de Ano' : 'Holiday Sale'
    },
    {
      id: '2',
      message: language === 'pt' 
        ? 'Taxa de conversão caiu abaixo de 2% em "Coleção Verão"'
        : 'Conversion rate dropped below 2% in "Summer Collection"',
      severity: 'medium' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      campaign: language === 'pt' ? 'Coleção Verão' : 'Summer Collection'
    },
    {
      id: '3',
      message: language === 'pt' 
        ? 'Orçamento diário quase esgotado para "Black Friday"'
        : 'Daily budget nearly exhausted for "Black Friday"',
      severity: 'low' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
      campaign: 'Black Friday'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
