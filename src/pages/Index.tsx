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

const Index = () => {
  const { language } = useLanguage();
  const { updateRevenue } = useAchievements();
  const [selectedDashboard, setSelectedDashboard] = useState('overview');
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const mockData = {
    totalRevenue: 750000,
    totalCampaigns: 42,
    totalUsers: 1250,
    totalConversions: 8500,
    revenueChange: 12.5,
    campaignsChange: 8.3,
    usersChange: 15.2,
    conversionsChange: 6.7,
    monthlyRevenue: [65000, 78000, 82000, 75000, 95000, 88000],
    campaignPerformance: [
      { name: 'Campaign A', value: 45000, change: 12 },
      { name: 'Campaign B', value: 38000, change: -5 },
      { name: 'Campaign C', value: 52000, change: 18 },
      { name: 'Campaign D', value: 41000, change: 7 },
    ],
    userGrowth: [200, 450, 680, 920, 1100, 1250],
    conversionRates: [
      { name: 'Google Ads', rate: 3.2, conversions: 2800 },
      { name: 'Facebook Ads', rate: 2.8, conversions: 2100 },
      { name: 'Instagram Ads', rate: 3.5, conversions: 1900 },
      { name: 'LinkedIn Ads', rate: 4.1, conversions: 1200 },
      { name: 'TikTok Ads', rate: 2.2, conversions: 500 },
    ]
  };

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
          data={mockData} 
          config={selectedConfig}
        />
        
        <DashboardConfig 
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          currentConfig={selectedConfig}
          onSave={(newConfig) => {
            console.log('Saving config:', newConfig);
            setIsConfigOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default Index;
