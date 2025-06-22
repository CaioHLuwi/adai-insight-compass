
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Receipt } from 'lucide-react';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'ads' | 'company' | 'collaborators' | 'taxes' | 'other';
  vendor?: string;
  notes?: string;
}

const Expenses = () => {
  const { language } = useLanguage();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenseType, setExpenseType] = useState('ads');
  const [vendor, setVendor] = useState('');
  const [notes, setNotes] = useState('');

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      description: 'Google Ads Campaign - Black Friday',
      amount: 2500.00,
      category: 'Marketing Digital',
      date: '2024-01-15',
      type: 'ads',
      vendor: 'Google',
      notes: 'Campanha promocional para Black Friday'
    },
    {
      id: '2',
      description: 'Salário - Designer Gráfico',
      amount: 4500.00,
      category: 'Recursos Humanos',
      date: '2024-01-10',
      type: 'collaborators',
      vendor: 'João Silva',
      notes: 'Salário mensal'
    },
    {
      id: '3',
      description: 'ISS - Imposto sobre Serviços',
      amount: 750.00,
      category: 'Impostos',
      date: '2024-01-08',
      type: 'taxes',
      vendor: 'Prefeitura Municipal',
      notes: 'Imposto mensal'
    }
  ]);

  const expenseTypes = [
    { value: 'ads', label: language === 'pt' ? 'Anúncios' : 'Ads' },
    { value: 'company', label: language === 'pt' ? 'Empresa' : 'Company' },
    { value: 'collaborators', label: language === 'pt' ? 'Colaboradores' : 'Collaborators' },
    { value: 'taxes', label: language === 'pt' ? 'Impostos' : 'Taxes' },
    { value: 'other', label: language === 'pt' ? 'Outros' : 'Other' }
  ];

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setCategory('');
    setExpenseType('ads');
    setVendor('');
    setNotes('');
    setEditingExpense(null);
  };

  const handleSaveExpense = () => {
    const expenseData = {
      id: editingExpense?.id || Date.now().toString(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split('T')[0],
      type: expenseType as Expense['type'],
      vendor,
      notes
    };

    if (editingExpense) {
      setExpenses(prev => prev.map(exp => exp.id === editingExpense.id ? expenseData : exp));
    } else {
      setExpenses(prev => [...prev, expenseData]);
    }

    resetForm();
    setShowCreateDialog(false);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setExpenseType(expense.type);
    setVendor(expense.vendor || '');
    setNotes(expense.notes || '');
    setShowCreateDialog(true);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const getTotalByType = (type: string) => {
    return expenses
      .filter(exp => exp.type === type)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          {language === 'pt' ? 'Despesas' : 'Expenses'}
        </h1>
        <Dialog open={showCreateDialog} onOpenChange={(open) => {
          setShowCreateDialog(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:to-yellow-700">
              <Plus className="w-4 h-4 mr-2" />
              {language === 'pt' ? 'Nova Despesa' : 'New Expense'}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-yellow-500/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingExpense 
                  ? (language === 'pt' ? 'Editar Despesa' : 'Edit Expense')
                  : (language === 'pt' ? 'Nova Despesa' : 'New Expense')
                }
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label className="text-white">{language === 'pt' ? 'Descrição' : 'Description'}</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={language === 'pt' ? 'Descrição da despesa' : 'Expense description'}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">{language === 'pt' ? 'Valor' : 'Amount'}</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">{language === 'pt' ? 'Categoria' : 'Category'}</Label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder={language === 'pt' ? 'Ex: Marketing Digital' : 'Ex: Digital Marketing'}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">{language === 'pt' ? 'Tipo' : 'Type'}</Label>
                <Select value={expenseType} onValueChange={setExpenseType}>
                  <SelectTrigger className="bg-gray-700 border-yellow-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-yellow-500/20">
                    {expenseTypes.map(type => (
                      <SelectItem key={type.value} value={type.value} className="text-white hover:bg-gray-600">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white">{language === 'pt' ? 'Fornecedor/Pessoa' : 'Vendor/Person'}</Label>
                <Input
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  placeholder={language === 'pt' ? 'Nome do fornecedor' : 'Vendor name'}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-white">{language === 'pt' ? 'Observações' : 'Notes'}</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === 'pt' ? 'Observações adicionais...' : 'Additional notes...'}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div className="col-span-2 flex gap-2">
                <Button 
                  onClick={handleSaveExpense}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 flex-1"
                >
                  {language === 'pt' ? 'Salvar' : 'Save'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowCreateDialog(false)}
                  className="border-gray-500 text-gray-300 hover:bg-gray-700"
                >
                  {language === 'pt' ? 'Cancelar' : 'Cancel'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {expenseTypes.map(type => (
          <Card key={type.value} className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-yellow-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-yellow-400 text-sm font-medium">
                {type.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                R$ {getTotalByType(type.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total Expenses Card */}
      <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            {language === 'pt' ? 'Total de Despesas' : 'Total Expenses'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-400">
            R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-white">
            {language === 'pt' ? 'Lista de Despesas' : 'Expenses List'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Descrição' : 'Description'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Categoria' : 'Category'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Tipo' : 'Type'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Valor' : 'Amount'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Data' : 'Date'}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Ações' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-700/30">
                    <td className="px-6 py-4 text-white font-medium">{expense.description}</td>
                    <td className="px-6 py-4 text-gray-300">{expense.category}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        {expenseTypes.find(t => t.value === expense.type)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-red-400 font-semibold">
                      R$ {expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(expense.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                          onClick={() => handleEditExpense(expense)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                          onClick={() => handleDeleteExpense(expense.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;
