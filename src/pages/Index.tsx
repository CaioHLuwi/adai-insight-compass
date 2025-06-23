
import React, { useState } from 'react';
import SummaryDashboard from '../components/SummaryDashboard';
import { DashboardConfig } from '../components/DashboardConfig';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { useAchievements } from '@/hooks/useAchievements';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Settings } from 'lucide-react';

interface DashboardField {
  id: string;
  name: string;
  nameTranslations: {
    en: string;
    pt: string;
    es: string;
    ru: string;
    de: string;
  };
  category: 'revenue' | 'costs' | 'metrics';
  isVisible: boolean;
  order: number;
}

const Index = () => {
  const { language } = useLanguage();
  const { updateRevenue } = useAchievements();
  const [selectedDashboard, setSelectedDashboard] = useState('overview');
  const [isConfigOpen, setIsConfigOpen] = useState(false);

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

  // Sample fields for dashboard configuration
  const [dashboardFields, setDashboardFields] = useState<DashboardField[]>([
    {
      id: 'gross_revenue',
      name: 'Gross Revenue',
      nameTranslations: {
        en: 'Gross Revenue',
        pt: 'Receita Bruta',
        es: 'Ingresos Brutos',
        ru: 'Валовая выручка',
        de: 'Bruttoeinnahmen'
      },
      category: 'revenue' as const,
      isVisible: true,
      order: 1
    },
    {
      id: 'spend',
      name: 'Total Spend',
      nameTranslations: {
        en: 'Total Spend',
        pt: 'Gasto Total',
        es: 'Gasto Total',
        ru: 'Общие расходы',
        de: 'Gesamtausgaben'
      },
      category: 'costs' as const,
      isVisible: true,
      order: 2
    },
    {
      id: 'roas',
      name: 'ROAS',
      nameTranslations: {
        en: 'ROAS',
        pt: 'ROAS',
        es: 'ROAS',
        ru: 'ROAS',
        de: 'ROAS'
      },
      category: 'metrics' as const,
      isVisible: true,
      order: 3
    }
  ]);

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

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black">
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
            <Button
              variant="outline"
              onClick={() => setIsConfigOpen(true)}
              className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
            >
              <Settings className="w-4 h-4 mr-2 text-yellow-400" />
              {language === 'pt' ? 'Configurar' : language === 'es' ? 'Configurar' : language === 'ru' ? 'Настроить' : language === 'de' ? 'Konfigurieren' : 'Configure'}
            </Button>
          </div>
        </div>
        
        <SummaryDashboard 
          totalSpendToday={totalSpendToday}
          avgCPC={avgCPC}
          avgCPA={avgCPA}
          conversionsToday={conversionsToday}
          recentAnomalies={recentAnomalies}
          visibleFields={dashboardFields.filter(f => f.isVisible)}
        />
        
        <DashboardConfig 
          fields={dashboardFields}
          onFieldsChange={setDashboardFields}
        />
      </div>
    </div>
  );
};

export default Index;
