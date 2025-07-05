import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  X, 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3,
  Activity,
  Target,
  Star,
  Crown,
  Trophy,
  Award,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface DemoPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoPopup: React.FC<DemoPopupProps> = ({ open, onOpenChange }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Mock data for demo
  const mockStats = {
    revenue: 'R$ 45.780',
    campaigns: 12,
    conversions: 847,
    roas: '4.2x'
  };

  const mockCampaigns = [
    { name: 'Black Friday 2024', spend: 'R$ 2.450', revenue: 'R$ 8.920', roas: '3.6x', status: 'Ativa' },
    { name: 'Lançamento Produto', spend: 'R$ 1.280', revenue: 'R$ 5.120', roas: '4.0x', status: 'Ativa' },
    { name: 'Retargeting Q4', spend: 'R$ 890', revenue: 'R$ 4.450', roas: '5.0x', status: 'Pausada' }
  ];

  const mockAchievements = [
    { name: 'Primeiro ROI +300%', icon: <Trophy className="w-6 h-6" />, unlocked: true },
    { name: 'Mestre do Tráfego', icon: <Crown className="w-6 h-6" />, unlocked: true },
    { name: 'Otimizador Elite', icon: <Award className="w-6 h-6" />, unlocked: false },
    { name: 'Rei das Conversões', icon: <Star className="w-6 h-6" />, unlocked: false }
  ];

  const pages = [
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'campaigns', name: 'Campanhas', icon: <Target className="w-4 h-4" /> },
    { id: 'achievements', name: 'Conquistas', icon: <Trophy className="w-4 h-4" /> },
    { id: 'analytics', name: 'Analytics', icon: <Activity className="w-4 h-4" /> }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Receita</p>
                <p className="text-xl font-bold text-white">{mockStats.revenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Campanhas</p>
                <p className="text-xl font-bold text-white">{mockStats.campaigns}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Conversões</p>
                <p className="text-xl font-bold text-white">{mockStats.conversions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">ROAS</p>
                <p className="text-xl font-bold text-white">{mockStats.roas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-gray-800/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-white">Campanhas em Destaque</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockCampaigns.slice(0, 3).map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div>
                  <p className="font-medium text-white">{campaign.name}</p>
                  <p className="text-sm text-gray-400">Gasto: {campaign.spend} • Receita: {campaign.revenue}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="border-yellow-500/20 text-yellow-400">
                    ROAS {campaign.roas}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Suas Campanhas</h3>
        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Zap className="w-4 h-4 mr-2" />
          Otimizar com IA
        </Button>
      </div>
      
      <div className="grid gap-4">
        {mockCampaigns.map((campaign, index) => (
          <Card key={index} className="bg-gray-800/50 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-white">{campaign.name}</h4>
                  <Badge variant={campaign.status === 'Ativa' ? 'default' : 'secondary'} className="mt-1">
                    {campaign.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-400">{campaign.roas}</p>
                  <p className="text-sm text-gray-400">ROAS</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Gasto</p>
                  <p className="text-lg font-semibold text-white">{campaign.spend}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Receita</p>
                  <p className="text-lg font-semibold text-white">{campaign.revenue}</p>
                </div>
              </div>
              
              <Progress value={Math.random() * 100} className="mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Suas Conquistas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAchievements.map((achievement, index) => (
          <Card key={index} className={`border ${achievement.unlocked ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30' : 'bg-gray-800/50 border-gray-600'}`}>
            <CardContent className="p-6 text-center">
              <div className={`text-4xl mb-3 ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'}`}>
                {achievement.icon}
              </div>
              <h4 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                {achievement.name}
              </h4>
              {achievement.unlocked && (
                <Badge className="mt-2 bg-yellow-500 text-black">
                  Desbloqueado!
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardContent className="p-6 text-center">
          <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-white mb-2">Próxima Conquista</h4>
          <p className="text-gray-300 mb-4">Alcance R$ 100.000 em receita para desbloquear "Magnata Digital"</p>
          <Progress value={45} className="mb-2" />
          <p className="text-sm text-gray-400">R$ 45.780 / R$ 100.000</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Analytics Avançado</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white text-sm">Conversão por Fonte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Facebook Ads</span>
                <span className="text-yellow-400 font-semibold">42%</span>
              </div>
              <Progress value={42} />
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Google Ads</span>
                <span className="text-blue-400 font-semibold">38%</span>
              </div>
              <Progress value={38} />
              <div className="flex justify-between items-center">
                <span className="text-gray-300">TikTok Ads</span>
                <span className="text-purple-400 font-semibold">20%</span>
              </div>
              <Progress value={20} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/50 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white text-sm">Insights da IA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-sm font-medium">✓ Oportunidade Detectada</p>
              <p className="text-gray-300 text-sm">Aumente o orçamento da campanha "Black Friday" em 20% para maximizar ROAS</p>
            </div>
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-sm font-medium">⚠ Atenção Necessária</p>
              <p className="text-gray-300 text-sm">CPA da campanha "Retargeting" subiu 15% nos últimos 3 dias</p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm font-medium">💡 Sugestão</p>
              <p className="text-gray-300 text-sm">Teste novos criativos para audiência 25-34 anos</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'campaigns':
        return renderCampaigns();
      case 'achievements':
        return renderAchievements();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderDashboard();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-gray-900 border-yellow-500/20">
        <DialogHeader className="border-b border-yellow-500/20 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Demo - Plataforma Otmizy.ai
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Navigation */}
          <div className="flex space-x-2 mt-4">
            {pages.map((page) => (
              <Button
                key={page.id}
                variant={currentPage === page.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(page.id)}
                className={`${
                  currentPage === page.id 
                    ? 'bg-yellow-500 text-black' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {page.icon}
                <span className="ml-2">{page.name}</span>
              </Button>
            ))}
          </div>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          {renderCurrentPage()}
        </div>
        
        <div className="border-t border-yellow-500/20 pt-4 px-6 pb-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Esta é uma demonstração com dados fictícios para mostrar as funcionalidades da plataforma.
            </p>
            <Button 
              onClick={() => onOpenChange(false)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Começar Agora
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoPopup;