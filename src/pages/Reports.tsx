
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileSpreadsheet, Filter, Search } from 'lucide-react';

const Reports = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('today');
  const [groupBy, setGroupBy] = useState('campaign');
  const [productFilter, setProductFilter] = useState('');
  const [textContainsFilter, setTextContainsFilter] = useState('');

  const campaigns = [
    {
      id: '1',
      name: 'Campanha Black Friday',
      product: 'Tênis Esportivo',
      spend: 1250.50,
      revenue: 4850.75,
      roas: 3.88,
      profit: 2100.25,
      clicks: 1520,
      conversions: 85,
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Promoção Verão',
      product: 'Óculos de Sol',
      spend: 890.30,
      revenue: 3200.60,
      roas: 3.59,
      profit: 1850.30,
      clicks: 980,
      conversions: 62,
      date: '2024-01-14'
    },
    {
      id: '3',
      name: 'Coleção Inverno',
      product: 'Casaco Premium',
      spend: 2100.80,
      revenue: 8950.40,
      roas: 4.26,
      profit: 4200.60,
      clicks: 2150,
      conversions: 145,
      date: '2024-01-13'
    }
  ];

  const dateFilters = [
    { value: 'today', label: language === 'pt' ? 'Hoje' : 'Today' },
    { value: 'yesterday', label: language === 'pt' ? 'Ontem' : 'Yesterday' },
    { value: 'thisWeek', label: language === 'pt' ? 'Esta semana' : 'This week' },
    { value: 'thisMonth', label: language === 'pt' ? 'Este mês' : 'This month' },
    { value: 'thisYear', label: language === 'pt' ? 'Este ano' : 'This year' },
    { value: 'last7Days', label: language === 'pt' ? 'Últimos 7 dias' : 'Last 7 days' }
  ];

  const handleExportToXLS = () => {
    console.log('Exporting to XLS...');
    // Export logic would go here
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProduct = !productFilter || campaign.product.toLowerCase().includes(productFilter.toLowerCase());
    const matchesText = !textContainsFilter || campaign.name.toLowerCase().includes(textContainsFilter.toLowerCase());
    
    return matchesSearch && matchesProduct && matchesText;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          {language === 'pt' ? 'Relatórios' : 'Reports'}
        </h1>
        <Button onClick={handleExportToXLS} className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          {language === 'pt' ? 'Exportar XLS' : 'Export XLS'}
        </Button>
      </div>

      {/* Filters Section */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Filter className="w-5 h-5 text-yellow-400" />
            {language === 'pt' ? 'Filtros' : 'Filters'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === 'pt' ? 'Buscar' : 'Search'}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'pt' ? 'Buscar campanhas...' : 'Search campaigns...'}
                  className="bg-gray-700 border-yellow-500/20 text-white pl-10"
                />
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === 'pt' ? 'Período' : 'Period'}
              </label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="bg-gray-700 border-yellow-500/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-yellow-500/20">
                  {dateFilters.map(filter => (
                    <SelectItem key={filter.value} value={filter.value} className="text-white hover:bg-gray-600">
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Group By */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === 'pt' ? 'Agrupar por' : 'Group by'}
              </label>
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="bg-gray-700 border-yellow-500/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-yellow-500/20">
                  <SelectItem value="campaign" className="text-white hover:bg-gray-600">
                    {language === 'pt' ? 'Campanha' : 'Campaign'}
                  </SelectItem>
                  <SelectItem value="product" className="text-white hover:bg-gray-600">
                    {language === 'pt' ? 'Produto' : 'Product'}
                  </SelectItem>
                  <SelectItem value="date" className="text-white hover:bg-gray-600">
                    {language === 'pt' ? 'Data' : 'Date'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {language === 'pt' ? 'Produto' : 'Product'}
              </label>
              <Input
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                placeholder={language === 'pt' ? 'Filtrar por produto...' : 'Filter by product...'}
                className="bg-gray-700 border-yellow-500/20 text-white"
              />
            </div>
          </div>

          {/* Text Contains Filter */}
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {language === 'pt' ? 'Contém texto' : 'Contains text'}
            </label>
            <Input
              value={textContainsFilter}
              onChange={(e) => setTextContainsFilter(e.target.value)}
              placeholder={language === 'pt' ? 'Buscar por texto específico...' : 'Search for specific text...'}
              className="bg-gray-700 border-yellow-500/20 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Campaign Table */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-yellow-500/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Campanha' : 'Campaign'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Produto' : 'Product'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Gasto' : 'Spend'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Receita' : 'Revenue'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-yellow-400">
                    ROAS
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Lucro' : 'Profit'}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-yellow-400">
                    Clicks
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Conversões' : 'Conversions'}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-yellow-400">
                    {language === 'pt' ? 'Data' : 'Date'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-700/30">
                    <td className="px-6 py-4 text-white font-medium">{campaign.name}</td>
                    <td className="px-6 py-4 text-gray-300">{campaign.product}</td>
                    <td className="px-6 py-4 text-right text-red-400">
                      R$ {campaign.spend.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-green-400">
                      R$ {campaign.revenue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-yellow-400">
                      {campaign.roas.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-green-400">
                      R$ {campaign.profit.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-300">
                      {campaign.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-blue-400">
                      {campaign.conversions}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(campaign.date).toLocaleDateString()}
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

export default Reports;
