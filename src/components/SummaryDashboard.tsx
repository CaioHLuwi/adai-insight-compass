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

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : language === 'ru' ? 'ru-RU' : language === 'de' ? 'de-DE' : 'en-US', {
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

  const getFieldValue = (fieldId: string) => {
    const sampleData: Record<string, any> = {
      gross_revenue: formatCurrency(5694.64),
      spend: formatCurrency(totalSpendToday),
      roas: '2.85x',
      profit: formatCurrency(2847.32),
      net_revenue: formatCurrency(4847.32),
      sales_payment: '152',
      pending_sales: '8',
      roi: '185%',
      profit_margin: '50%',
      refunded_sales: '3',
      chargeback_sales: '1',
      returned_sales: '2',
      refund_rate: '1.97%',
      chargeback: formatCurrency(45.20),
      arpu: formatCurrency(37.47),
      tax: formatCurrency(569.46),
      product_costs: formatCurrency(1200.00),
      fee: formatCurrency(142.37),
      sales_product: '152',
      revenue_product: formatCurrency(5694.64),
      approval_rate: '94.7%',
      sales_day: '152',
      cpa: formatCurrency(avgCPA)
    };
    return sampleData[fieldId] || '0';
  };

  const getFieldIcon = (fieldId: string) => {
    const iconMap: Record<string, any> = {
      gross_revenue: DollarSign,
      spend: MousePointer,
      roas: Target,
      profit: TrendingUp,
      net_revenue: DollarSign,
      sales_payment: Zap,
      pending_sales: Target,
      cpa: Target
    };
    return iconMap[fieldId] || DollarSign;
  };

  const getFieldName = (field: DashboardField) => {
    return field.nameTranslations[language] || field.nameTranslations['en'] || field.name;
  };

  // Default fields if none provided
  const defaultFields = [
    {
      id: 'gross_revenue',
      nameTranslations: {
        en: 'Total Spend Today',
        pt: 'Gasto Total Hoje',
        es: 'Gasto Total Hoy',
        ru: 'Общие расходы сегодня',
        de: 'Gesamtausgaben heute'
      },
      category: 'costs' as const,
      isVisible: true,
      order: 1
    },
    {
      id: 'spend',
      nameTranslations: {
        en: 'Average CPC',
        pt: 'CPC Médio',
        es: 'CPC Promedio',
        ru: 'Средний CPC',
        de: 'Durchschnittlicher CPC'
      },
      category: 'metrics' as const,
      isVisible: true,
      order: 2
    },
    {
      id: 'roas',
      nameTranslations: {
        en: 'Average CPA',
        pt: 'CPA Médio',
        es: 'CPA Promedio',
        ru: 'Средний CPA',
        de: 'Durchschnittlicher CPA'
      },
      category: 'metrics' as const,
      isVisible: true,
      order: 3
    },
    {
      id: 'profit',
      nameTranslations: {
        en: 'Conversions Today',
        pt: 'Conversões Hoje',
        es: 'Conversiones Hoy',
        ru: 'Конверсии сегодня',
        de: 'Konversionen heute'
      },
      category: 'metrics' as const,
      isVisible: true,
      order: 4
    }
  ];

  const fieldsToDisplay = visibleFields.length > 0 ? visibleFields : defaultFields;

  // Map default values for default fields
  const getDefaultFieldValue = (fieldId: string) => {
    switch (fieldId) {
      case 'gross_revenue': return formatCurrency(totalSpendToday);
      case 'spend': return formatCurrency(avgCPC);
      case 'roas': return formatCurrency(avgCPA);
      case 'profit': return conversionsToday.toLocaleString();
      default: return getFieldValue(fieldId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
            {language === 'pt' ? 'Visão Geral do Dashboard' : 
             language === 'es' ? 'Resumen del Dashboard' :
             language === 'ru' ? 'Обзор панели' :
             language === 'de' ? 'Dashboard-Übersicht' :
             'Dashboard Overview'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {language === 'pt' ? 'Monitore o desempenho dos seus anúncios em tempo real' : 
             language === 'es' ? 'Monitorea el rendimiento de tus anuncios en tiempo real' :
             language === 'ru' ? 'Отслеживайте эффективность ваших объявлений в реальном времени' :
             language === 'de' ? 'Überwachen Sie die Leistung Ihrer Anzeigen in Echtzeit' :
             'Monitor your ad performance in real-time'}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>{language === 'pt' ? 'Dados ao vivo' : 
                 language === 'es' ? 'Datos en vivo' :
                 language === 'ru' ? 'Данные в реальном времени' :
                 language === 'de' ? 'Live-Daten' :
                 'Live data'}</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {fieldsToDisplay.map((field, index) => {
          const Icon = getFieldIcon(field.id);
          const value = visibleFields.length > 0 ? getFieldValue(field.id) : getDefaultFieldValue(field.id);
          
          return (
            <div
              key={field.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                  <Icon className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-green-500 font-medium">+12%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{getFieldName(field)}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
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
                {language === 'pt' ? 'Alertas de Anomalia Recentes' : 
                 language === 'es' ? 'Alertas de Anomalía Recientes' :
                 language === 'ru' ? 'Последние предупреждения об аномалиях' :
                 language === 'de' ? 'Aktuelle Anomalie-Warnungen' :
                 'Recent Anomaly Alerts'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {language === 'pt' ? 'Últimas 3 anomalias detectadas' : 
                 language === 'es' ? 'Últimas 3 anomalías detectadas' :
                 language === 'ru' ? 'Последние 3 обнаруженные аномалии' :
                 language === 'de' ? 'Letzte 3 erkannte Anomalien' :
                 'Latest 3 detected anomalies'}
              </p>
            </div>
          </div>
          <span className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 dark:from-red-900/30 dark:to-red-800/30 dark:text-red-300 text-xs font-medium px-3 py-1 rounded-full">
            {recentAnomalies.length} {language === 'pt' ? 'Ativas' : 
                                     language === 'es' ? 'Activas' :
                                     language === 'ru' ? 'Активные' :
                                     language === 'de' ? 'Aktiv' :
                                     'Active'}
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
                         language === 'es' ?
                          (anomaly.severity === 'high' ? 'Alta' : 
                           anomaly.severity === 'medium' ? 'Media' : 'Baja') :
                         language === 'ru' ?
                          (anomaly.severity === 'high' ? 'Высокая' : 
                           anomaly.severity === 'medium' ? 'Средняя' : 'Низкая') :
                         language === 'de' ?
                          (anomaly.severity === 'high' ? 'Hoch' : 
                           anomaly.severity === 'medium' ? 'Mittel' : 'Niedrig') :
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
                {language === 'pt' ? 'Nenhuma anomalia detectada' : 
                 language === 'es' ? 'No se detectaron anomalías' :
                 language === 'ru' ? 'Аномалий не обнаружено' :
                 language === 'de' ? 'Keine Anomalien erkannt' :
                 'No anomalies detected'}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                {language === 'pt' ? 'Suas campanhas estão funcionando perfeitamente' : 
                 language === 'es' ? 'Tus campañas funcionan perfectamente' :
                 language === 'ru' ? 'Ваши кампании работают отлично' :
                 language === 'de' ? 'Ihre Kampagnen laufen reibungslos' :
                 'Your campaigns are running smoothly'}
              </p>
            </div>
          )}
        </div>

        {recentAnomalies.length > 3 && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 font-medium text-sm transition-colors duration-200">
              {language === 'pt' ? 'Ver todas as anomalias →' : 
               language === 'es' ? 'Ver todas las anomalías →' :
               language === 'ru' ? 'Посмотреть все аномалии →' :
               language === 'de' ? 'Alle Anomalien anzeigen →' :
               'View all anomalies →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryDashboard;
