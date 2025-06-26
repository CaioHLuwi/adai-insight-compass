
import React, { useState } from 'react';
import SummaryDashboard from '../components/SummaryDashboard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useAchievements } from '@/hooks/useAchievements';
import { DashboardFieldsConfig } from '@/components/DashboardFieldsConfig';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DashboardField {
  id: string;
  name: string;
  nameTranslations: Record<string, string>;
  category: 'revenue' | 'costs' | 'metrics';
  isVisible: boolean;
  order: number;
}

const defaultFields: DashboardField[] = [
  { id: 'gross_revenue', name: 'Faturamento Bruto', nameTranslations: { pt: 'Faturamento Bruto', en: 'Gross Revenue' }, category: 'revenue', isVisible: true, order: 1 },
  { id: 'spend', name: 'Gasto', nameTranslations: { pt: 'Gasto', en: 'Spend' }, category: 'costs', isVisible: true, order: 2 },
  { id: 'roas', name: 'ROAS', nameTranslations: { pt: 'ROAS', en: 'ROAS' }, category: 'metrics', isVisible: true, order: 3 },
  { id: 'profit', name: 'Lucro', nameTranslations: { pt: 'Lucro', en: 'Profit' }, category: 'revenue', isVisible: true, order: 4 },
  { id: 'daily_budget', name: 'Orçamento Diário', nameTranslations: { pt: 'Orçamento Diário', en: 'Daily Budget' }, category: 'costs', isVisible: false, order: 5 },
  { id: 'ctr', name: 'CTR', nameTranslations: { pt: 'CTR', en: 'CTR' }, category: 'metrics', isVisible: false, order: 6 },
  { id: 'cpa', name: 'CPA', nameTranslations: { pt: 'CPA', en: 'CPA' }, category: 'metrics', isVisible: false, order: 7 },
  { id: 'cpc', name: 'CPC', nameTranslations: { pt: 'CPC', en: 'CPC' }, category: 'metrics', isVisible: false, order: 8 },
  { id: 'net_revenue', name: 'Faturamento Líquido', nameTranslations: { pt: 'Faturamento Líquido', en: 'Net Revenue' }, category: 'revenue', isVisible: false, order: 9 },
  { id: 'rates', name: 'Taxas', nameTranslations: { pt: 'Taxas', en: 'Rates' }, category: 'costs', isVisible: false, order: 10 },
  { id: 'pending_sales', name: 'Vendas Pendentes', nameTranslations: { pt: 'Vendas Pendentes', en: 'Pending Sales' }, category: 'revenue', isVisible: false, order: 11 },
  { id: 'roi', name: 'ROI', nameTranslations: { pt: 'ROI', en: 'ROI' }, category: 'metrics', isVisible: false, order: 12 },
  { id: 'profit_margin', name: 'Margem de Lucro', nameTranslations: { pt: 'Margem de Lucro', en: 'Profit Margin' }, category: 'metrics', isVisible: false, order: 13 },
  { id: 'tax', name: 'Imposto', nameTranslations: { pt: 'Imposto', en: 'Tax' }, category: 'costs', isVisible: false, order: 14 },
  { id: 'chargeback', name: 'Chargeback', nameTranslations: { pt: 'Chargeback', en: 'Chargeback' }, category: 'costs', isVisible: false, order: 15 }
];

const Index = () => {
  const { language } = useLanguage();
  const { updateRevenue } = useAchievements();
  const [selectedDashboard, setSelectedDashboard] = useState('overview');
  const [dashboardFields, setDashboardFields] = useState<DashboardField[]>(defaultFields);

  // Sample data for the dashboard
  const totalSpendToday = 2847.32;
  const avgCPC = 1.24;
  const avgCPA = 18.75;
  const conversionsToday = 152;
  
  const recentAnomalies = [
    {
      id: '1',
      message: 'CPA spike detected in Campaign A - increased by 45% in the last hour',
      severity: 'high' as const,
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      campaign: 'Campaign A'
    },
    {
      id: '2',
      message: 'Conversion rate dropped by 15% for Google Ads',
      severity: 'medium' as const,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      campaign: 'Google Ads'
    }
  ];

  const dashboardConfigs = {
    overview: {
      title: language === 'pt' ? 'Visão Geral' : language === 'es' ? 'Resumen' : language === 'ru' ? 'Обзор' : language === 'de' ? 'Übersicht' : 'Overview',
      metrics: ['revenue', 'campaigns', 'users', 'conversions'],
      charts: ['revenue-trend', 'campaign-performance']
    },
    revenue: {
      title: language === 'pt' ? 'Receita' : language === 'es' ? 'Ingresos' : language === 'ru' ? 'Доходы' : language === 'de' ? 'Einnahmen' : 'Revenue',
      metrics: ['revenue'],
      charts: ['revenue-trend', 'revenue-breakdown']
    },
    campaigns: {
      title: language === 'pt' ? 'Campanhas' : language === 'es' ? 'Campañas' : language === 'ru' ? 'Кампании' : language === 'de' ? 'Kampagnen' : 'Campaigns',
      metrics: ['campaigns', 'conversions'],
      charts: ['campaign-performance']
    },
    users: {
      title: language === 'pt' ? 'Usuários' : language === 'es' ? 'Usuarios' : language === 'ru' ? 'Пользователи' : language === 'de' ? 'Benutzer' : 'Users',
      metrics: ['users'],
      charts: ['user-growth']
    }
  };

  const selectedConfig = dashboardConfigs[selectedDashboard as keyof typeof dashboardConfigs];

  const handleTestRevenue = () => {
    updateRevenue(10000);
  };

  const visibleFields = dashboardFields.filter(field => field.isVisible).sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-background">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Select value={selectedDashboard} onValueChange={setSelectedDashboard}>
              <SelectTrigger className="w-48 bg-gray-800 border-yellow-500/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-yellow-500/20">
                <SelectItem value="overview" className="text-white hover:bg-gray-700">
                  {language === 'pt' ? 'Visão Geral' : language === 'es' ? 'Resumen' : language === 'ru' ? 'Обзор' : language === 'de' ? 'Übersicht' : 'Overview'}
                </SelectItem>
                <SelectItem value="revenue" className="text-white hover:bg-gray-700">
                  {language === 'pt' ? 'Receita' : language === 'es' ? 'Ingresos' : language === 'ru' ? 'Доходы' : language === 'de' ? 'Einnahmen' : 'Revenue'}
                </SelectItem>
                <SelectItem value="campaigns" className="text-white hover:bg-gray-700">
                  {language === 'pt' ? 'Campanhas' : language === 'es' ? 'Campañas' : language === 'ru' ? 'Кампании' : language === 'de' ? 'Kampagnen' : 'Campaigns'}
                </SelectItem>
                <SelectItem value="users" className="text-white hover:bg-gray-700">
                  {language === 'pt' ? 'Usuários' : language === 'es' ? 'Usuarios' : language === 'ru' ? 'Пользователи' : language === 'de' ? 'Benutzer' : 'Users'}
                </SelectItem>
              </SelectContent>
            </Select>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              {selectedConfig.title}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleTestRevenue}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Test Revenue +10k
            </Button>
            <DashboardFieldsConfig 
              fields={dashboardFields}
              onFieldsChange={setDashboardFields}
            />
          </div>
        </div>
        
        <SummaryDashboard 
          totalSpendToday={totalSpendToday}
          avgCPC={avgCPC}
          avgCPA={avgCPA}
          conversionsToday={conversionsToday}
          recentAnomalies={recentAnomalies}
          visibleFields={visibleFields}
        />
      </div>
    </div>
  );
};

export default Index;
