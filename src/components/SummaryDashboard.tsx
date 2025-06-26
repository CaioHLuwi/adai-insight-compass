
import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, MousePointer, Target, Zap, Info } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import AnimatedNumber from './AnimatedNumber';

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
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({
  totalSpendToday,
  avgCPC,
  avgCPA,
  conversionsToday,
  recentAnomalies,
  visibleFields = []
}) => {
  const { language } = useLanguage();

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

  return (
    <div className="space-y-8">
      {/* Main Metrics Grid - styled like the photo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleFields.map((field) => {
          const value = getFieldValue(field.id);
          const displayValue = renderFieldValue(field, value);
          const textColor = getFieldColor(field, value);
          
          return (
            <div
              key={field.id}
              className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300"
            >
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
