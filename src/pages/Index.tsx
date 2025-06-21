
import React, { useState } from 'react';
import SummaryDashboard from '../components/SummaryDashboard';
import { DashboardConfig } from '../components/DashboardConfig';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface DashboardField {
  id: string;
  name: string;
  nameTranslations: Record<string, string>;
  category: 'revenue' | 'costs' | 'metrics';
  isVisible: boolean;
  order: number;
}

interface Dashboard {
  id: string;
  name: string;
  adGroupId: string;
}

const Index = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isAddingDashboard, setIsAddingDashboard] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');
  const [newAdGroupId, setNewAdGroupId] = useState('');

  const [dashboards, setDashboards] = useState<Dashboard[]>([
    { id: '1', name: 'Campanha Principal', adGroupId: 'adgroup_001' },
    { id: '2', name: 'Black Friday', adGroupId: 'adgroup_002' },
    { id: '3', name: 'Coleção Verão', adGroupId: 'adgroup_003' },
  ]);

  const [selectedDashboard, setSelectedDashboard] = useState<string>(dashboards[0]?.id || '');

  const [dashboardFields, setDashboardFields] = useState<DashboardField[]>([
    {
      id: 'gross_revenue',
      name: 'Gross Revenue',
      nameTranslations: {
        en: 'Gross Revenue',
        pt: 'Faturamento Bruto',
        es: 'Ingresos Brutos',
        ru: 'Валовой доход',
        de: 'Bruttoumsatz'
      },
      category: 'revenue',
      isVisible: true,
      order: 1
    },
    {
      id: 'spend',
      name: 'Spend',
      nameTranslations: {
        en: 'Spend',
        pt: 'Gasto',
        es: 'Gasto',
        ru: 'Расход',
        de: 'Ausgaben'
      },
      category: 'costs',
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
      category: 'metrics',
      isVisible: true,
      order: 3
    },
    {
      id: 'profit',
      name: 'Profit',
      nameTranslations: {
        en: 'Profit',
        pt: 'Lucro',
        es: 'Beneficio',
        ru: 'Прибыль',
        de: 'Gewinn'
      },
      category: 'revenue',
      isVisible: true,
      order: 4
    },
    {
      id: 'net_revenue',
      name: 'Net Revenue',
      nameTranslations: {
        en: 'Net Revenue',
        pt: 'Faturamento Líquido',
        es: 'Ingresos Netos',
        ru: 'Чистый доход',
        de: 'Nettoumsatz'
      },
      category: 'revenue',
      isVisible: false,
      order: 0
    },
    {
      id: 'sales_payment',
      name: 'Sales/Payment',
      nameTranslations: {
        en: 'Sales/Payment',
        pt: 'Vendas/Pagamento',
        es: 'Ventas/Pago',
        ru: 'Продажи/Платеж',
        de: 'Verkäufe/Zahlung'
      },
      category: 'metrics',
      isVisible: false,
      order: 0
    },
    {
      id: 'pending_sales',
      name: 'Pending Sales',
      nameTranslations: {
        en: 'Pending Sales',
        pt: 'Vendas Pendentes',
        es: 'Ventas Pendientes',
        ru: 'Ожидающие продажи',
        de: 'Ausstehende Verkäufe'
      },
      category: 'metrics',
      isVisible: false,
      order: 0
    },
    // Add more fields as needed...
  ]);

  // Sample data for demonstration
  const sampleAnomalies = [
    {
      id: '1',
      message: language === 'pt' 
        ? 'CPC aumentou 25% na campanha "Promoção de Fim de Ano"' 
        : 'CPC increased by 25% in "Holiday Sale" campaign',
      severity: 'high' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      campaign: language === 'pt' ? 'Promoção de Fim de Ano' : 'Holiday Sale'
    },
    {
      id: '2',
      message: language === 'pt' 
        ? 'Taxa de conversão caiu abaixo de 2% em "Coleção Verão"'
        : 'Conversion rate dropped below 2% in "Summer Collection"',
      severity: 'medium' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      campaign: language === 'pt' ? 'Coleção Verão' : 'Summer Collection'
    },
    {
      id: '3',
      message: language === 'pt' 
        ? 'Orçamento diário quase esgotado para "Black Friday"'
        : 'Daily budget nearly exhausted for "Black Friday"',
      severity: 'low' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      campaign: 'Black Friday'
    }
  ];

  const handleAddDashboard = () => {
    if (newDashboardName.trim() && newAdGroupId.trim()) {
      const newDashboard: Dashboard = {
        id: Date.now().toString(),
        name: newDashboardName,
        adGroupId: newAdGroupId,
      };
      setDashboards([...dashboards, newDashboard]);
      setSelectedDashboard(newDashboard.id);
      setNewDashboardName('');
      setNewAdGroupId('');
      setIsAddingDashboard(false);
      toast({
        title: "Dashboard created",
        description: `Dashboard "${newDashboardName}" has been created successfully!`,
      });
    }
  };

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      selectDashboard: {
        en: 'Select Dashboard',
        pt: 'Selecionar Dashboard',
        es: 'Seleccionar Dashboard',
        ru: 'Выбрать панель',
        de: 'Dashboard auswählen'
      },
      addNewDashboard: {
        en: 'Add New Dashboard',
        pt: 'Adicionar Novo Dashboard',
        es: 'Agregar Nuevo Dashboard',
        ru: 'Добавить новую панель',
        de: 'Neues Dashboard hinzufügen'
      },
      dashboardName: {
        en: 'Dashboard Name',
        pt: 'Nome do Dashboard',
        es: 'Nombre del Dashboard',
        ru: 'Название панели',
        de: 'Dashboard-Name'
      },
      adGroupId: {
        en: 'Ad Group ID',
        pt: 'ID do Grupo de Anúncios',
        es: 'ID del Grupo de Anuncios',
        ru: 'ID группы объявлений',
        de: 'Anzeigengruppen-ID'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Select value={selectedDashboard} onValueChange={setSelectedDashboard}>
              <SelectTrigger className="w-[250px] border-orange-200 focus:ring-orange-500">
                <SelectValue placeholder={getText('selectDashboard')} />
              </SelectTrigger>
              <SelectContent>
                {dashboards.map((dashboard) => (
                  <SelectItem key={dashboard.id} value={dashboard.id}>
                    {dashboard.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Dialog open={isAddingDashboard} onOpenChange={setIsAddingDashboard}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-100 dark:hover:bg-orange-900/20">
                  <Plus className="w-4 h-4 mr-2 text-orange-600" />
                  {getText('addNewDashboard')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{getText('addNewDashboard')}</DialogTitle>
                  <DialogDescription>
                    Create a new dashboard for a specific ad group or campaign.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{getText('dashboardName')}</label>
                    <Input
                      placeholder="Enter dashboard name"
                      value={newDashboardName}
                      onChange={(e) => setNewDashboardName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{getText('adGroupId')}</label>
                    <Input
                      placeholder="Enter Google Ads group ID"
                      value={newAdGroupId}
                      onChange={(e) => setNewAdGroupId(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingDashboard(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddDashboard}>Create Dashboard</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <DashboardConfig
            fields={dashboardFields}
            onFieldsChange={setDashboardFields}
          />
        </div>

        <SummaryDashboard
          totalSpendToday={2847.32}
          avgCPC={1.24}
          avgCPA={18.67}
          conversionsToday={152}
          recentAnomalies={sampleAnomalies}
          visibleFields={dashboardFields.filter(f => f.isVisible).sort((a, b) => a.order - b.order)}
        />
      </div>
    </div>
  );
};

export default Index;
