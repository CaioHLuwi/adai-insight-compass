
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Activity, DollarSign, TrendingUp, Calendar, Eye, UserCheck, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useLanguage } from '@/hooks/useLanguage';

const Zeuz = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');

  // Mock data for dashboard
  const monthlyRevenue = [
    { month: 'Jan', value: 45000 },
    { month: 'Fev', value: 52000 },
    { month: 'Mar', value: 48000 },
    { month: 'Abr', value: 61000 },
    { month: 'Mai', value: 55000 },
    { month: 'Jun', value: 67000 },
    { month: 'Jul', value: 73000 },
    { month: 'Ago', value: 69000 },
    { month: 'Set', value: 78000 },
    { month: 'Out', value: 82000 },
    { month: 'Nov', value: 85000 },
    { month: 'Dez', value: 91000 }
  ];

  const userGrowth = [
    { month: 'Jan', users: 1200 },
    { month: 'Fev', users: 1450 },
    { month: 'Mar', users: 1680 },
    { month: 'Abr', users: 1920 },
    { month: 'Mai', users: 2150 },
    { month: 'Jun', users: 2400 }
  ];

  const sessionData = [
    { name: 'Sessões Ativas', value: 847, color: '#22c55e' },
    { name: 'Sessões Inativas', value: 234, color: '#ef4444' },
    { name: 'Sessões Pendentes', value: 125, color: '#f59e0b' }
  ];

  const yearlyForecast = [
    { quarter: 'Q1 2024', revenue: 180000, projection: 195000 },
    { quarter: 'Q2 2024', revenue: 220000, projection: 235000 },
    { quarter: 'Q3 2024', revenue: 285000, projection: 290000 },
    { quarter: 'Q4 2024', revenue: 0, projection: 320000 }
  ];

  const stats = {
    totalUsers: 2847,
    activeUsers: 1923,
    totalSessions: 1206,
    monthlyRevenue: 91000,
    yearlyProjection: 1040000,
    growth: 23.5
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Total de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-green-500 text-sm">+12.5% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Usuários Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-green-500 text-sm">+8.2% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Receita Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">R$ {stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-green-500 text-sm">+{stats.growth}% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Projeção Anual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">R$ {(stats.yearlyProjection / 1000)}K</div>
            <p className="text-blue-500 text-sm">Baseado na tendência atual</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
              Faturamento Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area type="monotone" dataKey="value" stroke="#EAB308" fill="#EAB308" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-yellow-500" />
              Sessões Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sessionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {sessionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {sessionData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-300">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2 text-yellow-500" />
            Crescimento de Usuários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="users" fill="#EAB308" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Novos Usuários (30 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">487</div>
            <p className="text-green-500 text-sm">+18.2% vs período anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Taxa de Retenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">78.5%</div>
            <p className="text-blue-500 text-sm">Média dos últimos 3 meses</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Usuários Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">623</div>
            <p className="text-yellow-500 text-sm">21.9% do total</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSessions = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Sessões Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">847</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <UserCheck className="w-4 h-4 mr-2" />
              Usuários Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">1,203</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Tempo Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">24m</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Pico Diário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">2,847</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-white">Distribuição de Sessões por Horário</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={[
              { hour: '00h', sessions: 45 },
              { hour: '03h', sessions: 23 },
              { hour: '06h', sessions: 67 },
              { hour: '09h', sessions: 234 },
              { hour: '12h', sessions: 456 },
              { hour: '15h', sessions: 567 },
              { hour: '18h', sessions: 678 },
              { hour: '21h', sessions: 543 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Area type="monotone" dataKey="sessions" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
            Evolução da Receita Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line type="monotone" dataKey="value" stroke="#EAB308" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Receita Atual (Dez)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">R$ 91.000</div>
            <p className="text-green-500 text-sm">+23.5% vs Nov</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Melhor Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">R$ 91.000</div>
            <p className="text-yellow-500 text-sm">Dezembro 2023</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Crescimento Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+15.2%</div>
            <p className="text-blue-500 text-sm">Por mês (último ano)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderForecast = () => (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-yellow-500" />
            Projeção Anual 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={yearlyForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="quarter" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="revenue" fill="#EAB308" name="Receita Real" />
              <Bar dataKey="projection" fill="#22C55E" name="Projeção" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Meta Anual 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">R$ 1.040.000</div>
            <p className="text-green-500 text-sm">Baseado na tendência atual</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Progresso até agora</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">68.5%</div>
            <p className="text-blue-500 text-sm">R$ 712.000 realizados</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return renderUsers();
      case 'sessions':
        return renderSessions();
      case 'revenue':
        return renderRevenue();
      case 'forecast':
        return renderForecast();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Zeuz - Dashboard Administrativo
            </h1>
            <p className="text-gray-400 mt-2">Painel de controle e monitoramento da plataforma</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            onClick={() => setActiveSection('overview')}
            variant={activeSection === 'overview' ? 'default' : 'outline'}
            className={activeSection === 'overview' ? 'bg-yellow-500 text-black' : 'border-yellow-500/20 text-white hover:bg-yellow-500/10'}
          >
            Visão Geral
          </Button>
          <Button
            onClick={() => setActiveSection('users')}
            variant={activeSection === 'users' ? 'default' : 'outline'}
            className={activeSection === 'users' ? 'bg-yellow-500 text-black' : 'border-yellow-500/20 text-white hover:bg-yellow-500/10'}
          >
            <Users className="w-4 h-4 mr-2" />
            Usuários
          </Button>
          <Button
            onClick={() => setActiveSection('sessions')}
            variant={activeSection === 'sessions' ? 'default' : 'outline'}
            className={activeSection === 'sessions' ? 'bg-yellow-500 text-black' : 'border-yellow-500/20 text-white hover:bg-yellow-500/10'}
          >
            <Activity className="w-4 h-4 mr-2" />
            Sessões Atuais
          </Button>
          <Button
            onClick={() => setActiveSection('revenue')}
            variant={activeSection === 'revenue' ? 'default' : 'outline'}
            className={activeSection === 'revenue' ? 'bg-yellow-500 text-black' : 'border-yellow-500/20 text-white hover:bg-yellow-500/10'}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Faturamento Mensal
          </Button>
          <Button
            onClick={() => setActiveSection('forecast')}
            variant={activeSection === 'forecast' ? 'default' : 'outline'}
            className={activeSection === 'forecast' ? 'bg-yellow-500 text-black' : 'border-yellow-500/20 text-white hover:bg-yellow-500/10'}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Previsão Anual
          </Button>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Zeuz;
