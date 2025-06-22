
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Campaigns = () => {
  const { language } = useLanguage();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showConfigDialog, setShowConfigDialog] = useState(false);

  const allFields = [
    { key: 'name', label: language === 'pt' ? 'Nome' : 'Name', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'dailyBudget', label: language === 'pt' ? 'Orçamento Diário' : 'Daily Budget', visible: true },
    { key: 'ctr', label: 'CTR', visible: true },
    { key: 'cpa', label: 'CPA', visible: true },
    { key: 'cpc', label: 'CPC', visible: true },
    { key: 'grossRevenue', label: language === 'pt' ? 'Faturamento Bruto' : 'Gross Revenue', visible: false },
    { key: 'spend', label: language === 'pt' ? 'Gasto' : 'Spend', visible: false },
    { key: 'roas', label: 'ROAS', visible: false },
    { key: 'profit', label: language === 'pt' ? 'Lucro' : 'Profit', visible: false },
    { key: 'netRevenue', label: language === 'pt' ? 'Faturamento Líquido' : 'Net Revenue', visible: false },
    { key: 'paidSales', label: language === 'pt' ? 'Vendas / Pagamento' : 'Paid Sales', visible: false },
    { key: 'pendingSales', label: language === 'pt' ? 'Vendas Pendentes' : 'Pending Sales', visible: false },
    { key: 'roi', label: 'ROI', visible: false },
    { key: 'profitMargin', label: language === 'pt' ? 'Margem de Lucro' : 'Profit Margin', visible: false },
    { key: 'refundedSales', label: language === 'pt' ? 'Vendas Reembolsadas' : 'Refunded Sales', visible: false },
    { key: 'chargebackSales', label: language === 'pt' ? 'Vendas Chargeback' : 'Chargeback Sales', visible: false },
    { key: 'returnedSales', label: language === 'pt' ? 'Vendas Devolvidas' : 'Returned Sales', visible: false },
    { key: 'refundRate', label: language === 'pt' ? 'Taxa de Reembolso' : 'Refund Rate', visible: false },
    { key: 'chargeback', label: 'Chargeback', visible: false },
    { key: 'arpu', label: 'ARPU', visible: false },
    { key: 'tax', label: language === 'pt' ? 'Imposto' : 'Tax', visible: false },
    { key: 'productCosts', label: language === 'pt' ? 'Custos de Produto' : 'Product Costs', visible: false },
    { key: 'rate', label: language === 'pt' ? 'Taxa' : 'Rate', visible: false },
    { key: 'productSales', label: language === 'pt' ? 'Vendas / Produto' : 'Sales / Product', visible: false },
    { key: 'productRevenue', label: language === 'pt' ? 'Faturamento / Produto' : 'Revenue / Product', visible: false },
    { key: 'approvalRate', label: language === 'pt' ? 'Taxa de Aprovação' : 'Approval Rate', visible: false },
    { key: 'dailySales', label: language === 'pt' ? 'Vendas / dia' : 'Sales / Day', visible: false }
  ];

  const [visibleFields, setVisibleFields] = useState(allFields);

  const campaigns = [
    {
      name: 'Holiday Sale Campaign',
      status: 'Active',
      dailyBudget: 150.00,
      ctr: 3.2,
      cpa: 25.50,
      cpc: 1.85,
      grossRevenue: 2500.00,
      spend: 185.00,
      roas: 13.5,
      profit: 2000.00,
      netRevenue: 2315.00
    }
  ];

  const toggleFieldVisibility = (fieldKey: string) => {
    setVisibleFields(prev => 
      prev.map(field => 
        field.key === fieldKey ? { ...field, visible: !field.visible } : field
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          {language === 'pt' ? 'Campanhas' : 'Campaigns'}
        </h1>
        
        <div className="flex gap-2">
          <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400">
                <Settings className="w-4 h-4 mr-2 text-yellow-400" />
                {language === 'pt' ? 'Configurar Tabela' : 'Configure Table'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-gray-800 border-yellow-500/20">
              <DialogHeader>
                <DialogTitle className="text-white">{language === 'pt' ? 'Configurar Campos da Tabela' : 'Configure Table Fields'}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {visibleFields.map((field) => (
                  <div key={field.key} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={field.visible}
                      onCheckedChange={() => toggleFieldVisibility(field.key)}
                    />
                    <label className="text-sm text-white">{field.label}</label>
                  </div>
                ))}
              </div>
              <Button onClick={() => setShowConfigDialog(false)} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900">
                {language === 'pt' ? 'Salvar' : 'Save'}
              </Button>
            </DialogContent>
          </Dialog>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'pt' ? 'Criar Campanha' : 'Create Campaign'}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-yellow-500/20">
              <DialogHeader>
                <DialogTitle className="text-white">{language === 'pt' ? 'Criar Nova Campanha' : 'Create New Campaign'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-white">{language === 'pt' ? 'Nome da Campanha' : 'Campaign Name'}</Label>
                  <Input placeholder={language === 'pt' ? 'Digite o nome da campanha' : 'Enter campaign name'} className="bg-gray-700 border-yellow-500/20 text-white" />
                </div>
                <div>
                  <Label className="text-white">{language === 'pt' ? 'ID da Conta Google Ads' : 'Google Ads Account ID'}</Label>
                  <Input placeholder="123-456-7890" className="bg-gray-700 border-yellow-500/20 text-white" />
                </div>
                <div>
                  <Label className="text-white">{language === 'pt' ? 'ID da Campanha' : 'Campaign ID'}</Label>
                  <Input placeholder="987654321" className="bg-gray-700 border-yellow-500/20 text-white" />
                </div>
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900">
                  {language === 'pt' ? 'Conectar e Importar' : 'Connect and Import'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-yellow-500/20 rounded-xl shadow-lg border overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 p-4 border-b border-yellow-500/20">
          <p className="text-sm text-yellow-400">
            {language === 'pt' 
              ? '💡 Para sincronizar automaticamente: Configure sua API do Google Ads em Configurações > Integrações'
              : '💡 For auto-sync: Configure your Google Ads API in Settings > Integrations'}
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-700/50">
              <tr>
                {visibleFields.filter(field => field.visible).map((field) => (
                  <th key={field.key} className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-800/30 divide-y divide-gray-600">
              {campaigns.map((campaign, index) => (
                <tr key={index} className="hover:bg-yellow-500/10">
                  {visibleFields.filter(field => field.visible).map((field) => (
                    <td key={field.key} className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {field.key === 'status' ? (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          campaign.status === 'Active' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {campaign.status}
                        </span>
                      ) : field.key.includes('Budget') || field.key.includes('Revenue') || field.key.includes('Cost') ? (
                        `$${campaign[field.key]?.toFixed(2) || '0.00'}`
                      ) : field.key.includes('Rate') || field.key === 'ctr' ? (
                        `${campaign[field.key] || 0}%`
                      ) : (
                        campaign[field.key] || '-'
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
