
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, MousePointer, Target, Zap, Info, GripVertical } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import AnimatedNumber from './AnimatedNumber';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AnomalyAlert {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  campaign?: string;
}

interface DashboardField {
  id: string;
  name: string;
  nameTranslations: Record<string, string>;
  category: 'revenue' | 'costs' | 'metrics';
  isVisible: boolean;
  order: number;
}

interface SummaryDashboardProps {
  totalSpendToday: number;
  avgCPC: number;
  avgCPA: number;
  conversionsToday: number;
  recentAnomalies: AnomalyAlert[];
  visibleFields?: DashboardField[];
  onFieldsReorder?: (fields: DashboardField[]) => void;
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({
  totalSpendToday,
  avgCPC,
  avgCPA,
  conversionsToday,
  recentAnomalies,
  visibleFields = [],
  onFieldsReorder
}) => {
  const { language } = useLanguage();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Sample chart data
  const revenueData = [
    { date: '2024-01-01', revenue: 2400, spend: 1200 },
    { date: '2024-01-02', revenue: 1398, spend: 980 },
    { date: '2024-01-03', revenue: 9800, spend: 3200 },
    { date: '2024-01-04', revenue: 3908, spend: 1800 },
    { date: '2024-01-05', revenue: 4800, spend: 2200 },
    { date: '2024-01-06', revenue: 3800, spend: 1900 },
    { date: '2024-01-07', revenue: 4300, spend: 2100 }
  ];

  const campaignData = [
    { name: 'Facebook Ads', performance: 85, spend: 1200 },
    { name: 'Google Ads', performance: 92, spend: 1800 },
    { name: 'Instagram', performance: 78, spend: 800 },
    { name: 'YouTube', performance: 67, spend: 600 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : language === 'ru' ? 'ru-RU' : language === 'de' ? 'de-DE' : 'en-US', {
      style: 'currency',
      currency: language === 'pt' ? 'BRL' : language === 'de' ? 'EUR' : language === 'ru' ? 'RUB' : 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getFieldValue = (fieldId: string) => {
    const sampleData: Record<string, any> = {
      gross_revenue: 5694.64,
      spend: totalSpendToday,
      roas: 2.85,
      profit: -960,
      net_revenue: 4847.32,
      daily_budget: 1200,
      ctr: 2.4,
      cpa: 45.50,
      cpc: 1.85,
      rates: 285.50,
      tax: 569.46,
      chargeback: 45.20,
      pending_sales: 8,
      roi: 0,
      profit_margin: 0,
      sales_payment: 152,
      refunded_sales: 3,
      chargeback_sales: 1,
      returned_sales: 2,
      refund_rate: 1.97,
      arpu: 37.47,
      product_costs: 1200.00,
      approval_rate: 94.7,
      sales_day: 152
    };
    return sampleData[fieldId] || 0;
  };

  const getFieldName = (field: DashboardField) => {
    return field.nameTranslations[language] || field.nameTranslations['en'] || field.name;
  };

  const getFieldColor = (field: DashboardField, value: any) => {
    if (field.category === 'revenue' && field.id === 'profit' && value < 0) {
      return 'text-red-400';
    }
    if (field.category === 'revenue') return 'text-green-400';
    if (field.category === 'costs') return 'text-red-400';
    if (field.category === 'metrics') return 'text-blue-400';
    return 'text-yellow-400';
  };

  const renderFieldValue = (field: DashboardField, value: any) => {
    if (field.id === 'roas') {
      return `${value.toFixed(2)}x`;
    }
    if (field.id === 'ctr' || field.id === 'profit_margin' || field.id === 'refund_rate' || field.id === 'approval_rate') {
      return `${value}%`;
    }
    if (field.category === 'revenue' || field.category === 'costs' || 
        ['daily_budget', 'cpa', 'cpc', 'rates', 'tax', 'chargeback', 'arpu', 'product_costs'].includes(field.id)) {
      return formatCurrency(value);
    }
    if (field.id === 'roi') {
      return value === 0 ? '0.00' : `${value}%`;
    }
    if (field.id === 'profit_margin') {
      return value === 0 ? 'N/A' : `${value}%`;
    }
    return typeof value === 'number' ? value.toLocaleString() : value;
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newFields = [...visibleFields];
    const draggedField = newFields[draggedIndex];
    newFields.splice(draggedIndex, 1);
    newFields.splice(dropIndex, 0, draggedField);

    // Update order property
    const reorderedFields = newFields.map((field, index) => ({
      ...field,
      order: index + 1
    }));

    onFieldsReorder?.(reorderedFields);
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-8">
      {/* Main Metrics Grid - with drag and drop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleFields.map((field, index) => {
          const value = getFieldValue(field.id);
          const displayValue = renderFieldValue(field, value);
          const textColor = getFieldColor(field, value);
          
          return (
            <div
              key={field.id}
              className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300 relative cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="absolute top-2 right-2">
                <GripVertical className="w-4 h-4 text-gray-500 hover:text-yellow-400" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                  {getFieldName(field)}
                </h3>
                <Info className="w-4 h-4 text-gray-500" />
              </div>
              <div className={`text-2xl font-bold ${textColor} mb-1`}>
                {displayValue}
              </div>
              {field.id === 'profit' && value < 0 && (
                <div className="text-xs text-red-400 font-medium">
                  Prejuízo
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
            Tendência de Receita vs Gastos
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }} 
              />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="spend" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Performance Chart */}
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-400" />
            Performance por Campanha
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }} 
              />
              <Bar dataKey="performance" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conversion Funnel Section - similar to the photo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-yellow-400" />
            Funil de Conversão (Meta Ads)
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Cliques</span>
              <span className="text-white font-semibold">5,432</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Visualizações da Página</span>
              <span className="text-white font-semibold">4,245</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Iniciar Checkout</span>
              <span className="text-white font-semibold">1,856</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Vendas Iniciadas</span>
              <span className="text-white font-semibold">892</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Vendas Aprovadas</span>
              <span className="text-white font-semibold">645</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-4">CPA</h3>
          <div className="text-3xl font-bold text-gray-400 mb-2">N/A</div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-300 mb-3">ARPU</h4>
            <div className="text-2xl font-bold text-gray-400 mb-4">N/A</div>
            
            <h4 className="text-sm font-medium text-gray-300 mb-3">Vendas por Produto</h4>
            <div className="text-sm text-gray-400">Nenhuma venda por aqui</div>
          </div>
        </div>
      </div>

      {/* Sales by Country */}
      <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-4">Vendas por País</h3>
        <div className="text-sm text-gray-400">Nenhuma venda por aqui</div>
      </div>
    </div>
  );
};

export default SummaryDashboard;
