
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Rates = () => {
  const { language } = useLanguage();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const rates = [
    {
      id: 1,
      name: language === 'pt' ? 'Taxa de Processamento' : 'Processing Fee',
      percent: 3.5,
      rule: language === 'pt' ? 'Aplicar em todas as vendas' : 'Apply to all sales',
      paymentMethod: language === 'pt' ? 'Cartão de Crédito' : 'Credit Card'
    },
    {
      id: 2,
      name: language === 'pt' ? 'Taxa PIX' : 'PIX Fee',
      percent: 1.2,
      rule: language === 'pt' ? 'Apenas vendas acima de R$ 100' : 'Only sales above $100',
      paymentMethod: 'PIX'
    }
  ];

  const paymentMethods = [
    { value: 'credit-card', label: language === 'pt' ? 'Cartão de Crédito' : 'Credit Card' },
    { value: 'debit-card', label: language === 'pt' ? 'Cartão de Débito' : 'Debit Card' },
    { value: 'pix', label: 'PIX' },
    { value: 'boleto', label: 'Boleto' },
    { value: 'all', label: language === 'pt' ? 'Todos os Métodos' : 'All Methods' }
  ];

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          {language === 'pt' ? 'Taxas' : 'Rates'}
        </h1>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
              <Plus className="w-4 h-4 mr-2" />
              {language === 'pt' ? 'Adicionar Taxa' : 'Add Rate'}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-yellow-500/20">
            <DialogHeader>
              <DialogTitle className="text-yellow-400">{language === 'pt' ? 'Adicionar Nova Taxa' : 'Add New Rate'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-yellow-400">{language === 'pt' ? 'Nome da Taxa' : 'Rate Name'}</Label>
                <Input 
                  placeholder={language === 'pt' ? 'Ex: Taxa de Processamento' : 'Ex: Processing Fee'} 
                  className="bg-black border-yellow-500/20 text-yellow-400"
                />
              </div>
              <div>
                <Label className="text-yellow-400">{language === 'pt' ? 'Porcentagem (%)' : 'Percentage (%)'}</Label>
                <Input 
                  type="number" 
                  step="0.1" 
                  placeholder="3.5" 
                  className="bg-black border-yellow-500/20 text-yellow-400"
                />
              </div>
              <div>
                <Label className="text-yellow-400">{language === 'pt' ? 'Regra de Aplicação' : 'Application Rule'}</Label>
                <Input 
                  placeholder={language === 'pt' ? 'Ex: Aplicar em todas as vendas' : 'Ex: Apply to all sales'} 
                  className="bg-black border-yellow-500/20 text-yellow-400"
                />
              </div>
              <div>
                <Label className="text-yellow-400">{language === 'pt' ? 'Método de Pagamento' : 'Payment Method'}</Label>
                <Select>
                  <SelectTrigger className="bg-black border-yellow-500/20 text-yellow-400">
                    <SelectValue placeholder={language === 'pt' ? 'Selecione um método' : 'Select a method'} />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-yellow-500/20">
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value} className="text-yellow-400 hover:bg-yellow-500/10">
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black">
                {language === 'pt' ? 'Adicionar Taxa' : 'Add Rate'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-gray-900 rounded-xl shadow-lg border border-yellow-500/20 overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 p-4">
          <p className="text-sm text-yellow-300">
            {language === 'pt' 
              ? '💡 As taxas são automaticamente deduzidas do faturamento líquido e afetam o cálculo do lucro'
              : '💡 Rates are automatically deducted from net revenue and affect profit calculation'}
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-yellow-500/20">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                  {language === 'pt' ? 'Nome' : 'Name'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                  {language === 'pt' ? 'Porcentagem' : 'Percentage'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                  {language === 'pt' ? 'Regra' : 'Rule'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                  {language === 'pt' ? 'Método de Pagamento' : 'Payment Method'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                  {language === 'pt' ? 'Ações' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-yellow-500/10">
              {rates.map((rate) => (
                <tr key={rate.id} className="hover:bg-yellow-500/5">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-400">
                    {rate.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">
                    {rate.percent}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">
                    {rate.rule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">
                    {rate.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button variant="outline" size="sm" className="border-yellow-500/20 hover:bg-yellow-500/10 text-yellow-400">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-500/20 hover:bg-red-500/10 text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rates;
