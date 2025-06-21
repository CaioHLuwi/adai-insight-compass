
import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, MousePointer, Target, Zap } from 'lucide-react';

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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (severity: AnomalyAlert['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const kpiCards = [
    {
      title: 'Total Spend Today',
      value: formatCurrency(totalSpendToday),
      icon: DollarSign,
      gradient: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Average CPC',
      value: formatCurrency(avgCPC),
      icon: MousePointer,
      gradient: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Average CPA',
      value: formatCurrency(avgCPA),
      icon: Target,
      gradient: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Conversions Today',
      value: conversionsToday.toLocaleString(),
      icon: Zap,
      gradient: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Monitor your ad performance in real-time</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live data</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Anomalies Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Anomaly Alerts</h2>
              <p className="text-gray-600 text-sm">Latest 3 detected anomalies</p>
            </div>
          </div>
          <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
            {recentAnomalies.length} Active
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
                        {anomaly.severity}
                      </span>
                      {anomaly.campaign && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {anomaly.campaign}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-800 font-medium">{anomaly.message}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-500">{formatTime(anomaly.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No anomalies detected</p>
              <p className="text-gray-400 text-sm">Your campaigns are running smoothly</p>
            </div>
          )}
        </div>

        {recentAnomalies.length > 3 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
              View all anomalies →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryDashboard;
