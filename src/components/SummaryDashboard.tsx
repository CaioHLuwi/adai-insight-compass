
import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, MousePointer, Target, Zap } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface AnomalyAlert {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  campaign?: string;
}

interface SummaryDashboardProps {
  totalSpendToday: number;
  avgCPC: number;
  avgCPA: number;
  conversionsToday: number;
  recentAnomalies: AnomalyAlert[];
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({
  totalSpendToday,
  avgCPC,
  avgCPA,
  conversionsToday,
  recentAnomalies
}) => {
  const { language } = useLanguage();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
      style: 'currency',
      currency: language === 'pt' ? 'BRL' : 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (severity: AnomalyAlert['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800';
      case 'low':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700';
    }
  };

  const kpiCards = [
    {
      title: language === 'pt' ? 'Gasto Total Hoje' : 'Total Spend Today',
      value: formatCurrency(totalSpendToday),
      icon: DollarSign,
      gradient: 'from-orange-400 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20'
    },
    {
      title: language === 'pt' ? 'CPC Médio' : 'Average CPC',
      value: formatCurrency(avgCPC),
      icon: MousePointer,
      gradient: 'from-green-400 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20'
    },
    {
      title: language === 'pt' ? 'CPA Médio' : 'Average CPA',
      value: formatCurrency(avgCPA),
      icon: Target,
      gradient: 'from-purple-400 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
    },
    {
      title: language === 'pt' ? 'Conversões Hoje' : 'Conversions Today',
      value: conversionsToday.toLocaleString(),
      icon: Zap,
      gradient: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            {language === 'pt' ? 'Visão Geral do Dashboard' : 'Dashboard Overview'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {language === 'pt' ? 'Monitore o desempenho dos seus anúncios em tempo real' : 'Monitor your ad performance in real-time'}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>{language === 'pt' ? 'Dados ao vivo' : 'Live data'}</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-6 h-6 ${kpi.textColor}`} />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-500 font-medium">+12%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Anomalies Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {language === 'pt' ? 'Alertas de Anomalia Recentes' : 'Recent Anomaly Alerts'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {language === 'pt' ? 'Últimas 3 anomalias detectadas' : 'Latest 3 detected anomalies'}
              </p>
            </div>
          </div>
          <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 dark:from-red-900/30 dark:to-red-800/30 dark:text-red-300 text-xs font-medium px-3 py-1 rounded-full">
            {recentAnomalies.length} {language === 'pt' ? 'Ativas' : 'Active'}
          </span>
        </div>

        <div className="space-y-4">
          {recentAnomalies.length > 0 ? (
            recentAnomalies.slice(0, 3).map((anomaly) => (
              <div
                key={anomaly.id}
                className={`p-4 rounded-lg border-l-4 ${getSeverityColor(anomaly.severity)} transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getSeverityColor(anomaly.severity)}`}>
                        {language === 'pt' ? 
                          (anomaly.severity === 'high' ? 'Alta' : 
                           anomaly.severity === 'medium' ? 'Média' : 'Baixa') : 
                          anomaly.severity}
                      </span>
                      {anomaly.campaign && (
                        <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {anomaly.campaign}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{anomaly.message}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatTime(anomaly.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                {language === 'pt' ? 'Nenhuma anomalia detectada' : 'No anomalies detected'}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                {language === 'pt' ? 'Suas campanhas estão funcionando perfeitamente' : 'Your campaigns are running smoothly'}
              </p>
            </div>
          )}
        </div>

        {recentAnomalies.length > 3 && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 font-medium text-sm transition-colors duration-200">
              {language === 'pt' ? 'Ver todas as anomalias →' : 'View all anomalies →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryDashboard;
