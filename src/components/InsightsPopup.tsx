import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Brain, 
  Users, 
  Clock, 
  DollarSign,
  BarChart3,
  Lightbulb
} from 'lucide-react';

interface InsightsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStrategy: {
    title: string;
    description: string;
    impact: string;
  };
}

const InsightsPopup: React.FC<InsightsPopupProps> = ({ isOpen, onClose, selectedStrategy }) => {
  const strategyDetails = {
    'Otimização de Audience': {
      icon: <Target className="w-8 h-8 text-blue-400" />,
      insights: [
        {
          title: 'Análise Demográfica',
          description: 'Idade 25-34 anos apresenta 67% maior taxa de conversão',
          icon: <Users className="w-5 h-5 text-blue-400" />
        },
        {
          title: 'Comportamento de Compra',
          description: 'Usuários mobile convertem 2.3x mais que desktop neste segmento',
          icon: <TrendingUp className="w-5 h-5 text-green-400" />
        },
        {
          title: 'Interesses Relevantes',
          description: 'Adicionados 12 novos interesses com alta afinidade',
          icon: <Brain className="w-5 h-5 text-purple-400" />
        }
      ],
      recommendations: [
        'Aumentar budget para faixa etária 25-34 anos em 40%',
        'Criar campanhas específicas para mobile',
        'Expandir targeting para interesses similares identificados',
        'Implementar lookalike audiences baseadas nos melhores conversores'
      ]
    },
    'Ajuste de Horários': {
      icon: <Clock className="w-8 h-8 text-green-400" />,
      insights: [
        {
          title: 'Picos de Conversão',
          description: 'Horário de 19h-22h concentra 45% das conversões',
          icon: <Clock className="w-5 h-5 text-green-400" />
        },
        {
          title: 'Dias da Semana',
          description: 'Terça e quarta-feira apresentam melhor performance',
          icon: <BarChart3 className="w-5 h-5 text-blue-400" />
        },
        {
          title: 'Sazonalidade',
          description: 'Padrão semanal identificado com 92% de precisão',
          icon: <TrendingUp className="w-5 h-5 text-yellow-400" />
        }
      ],
      recommendations: [
        'Concentrar 60% do budget entre 19h-22h',
        'Reduzir investimento em finais de semana',
        'Implementar day parting automatizado',
        'Criar campanhas específicas para horários de pico'
      ]
    },
    'Palavras-chave Negativas': {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      insights: [
        {
          title: 'Termos Irrelevantes',
          description: '15 palavras-chave gerando tráfego sem conversão',
          icon: <Zap className="w-5 h-5 text-red-400" />
        },
        {
          title: 'Economia Projetada',
          description: 'R$ 1.200/mês em gastos desnecessários identificados',
          icon: <DollarSign className="w-5 h-5 text-green-400" />
        },
        {
          title: 'Quality Score',
          description: 'Melhoria esperada de 2.2 pontos na relevância',
          icon: <BarChart3 className="w-5 h-5 text-blue-400" />
        }
      ],
      recommendations: [
        'Adicionar 15 palavras-chave negativas identificadas',
        'Revisar match types para maior precisão',
        'Implementar monitoramento automático de search terms',
        'Criar listas de negativas por grupo de anúncios'
      ]
    }
  };

  const currentStrategy = strategyDetails[selectedStrategy.title as keyof typeof strategyDetails] || strategyDetails['Otimização de Audience'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900 border-yellow-500/20">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-2xl">
            {currentStrategy.icon}
            <span className="text-yellow-400">{selectedStrategy.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Impact Summary */}
          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Impacto Projetado</h3>
                  <p className="text-muted-foreground">{selectedStrategy.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-green-400">
                    {selectedStrategy.impact}
                  </span>
                  <p className="text-sm text-muted-foreground">nos próximos 7 dias</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
              Insights da IA
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentStrategy.insights.map((insight, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700/50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      {insight.icon}
                      <div>
                        <h4 className="font-semibold mb-1">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 text-purple-400 mr-2" />
              Recomendações da IA
            </h3>
            <div className="space-y-3">
              {currentStrategy.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800/30 rounded-lg">
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                    {index + 1}
                  </Badge>
                  <p className="text-sm flex-1">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Details */}
          <Card className="bg-gray-800/30 border-gray-700/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
                Detalhes Técnicos
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 text-muted-foreground">Modelo de IA</h4>
                  <p className="text-sm">Machine Learning com Random Forest</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-muted-foreground">Confiança</h4>
                  <p className="text-sm text-green-400">94.7%</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-muted-foreground">Dados Analisados</h4>
                  <p className="text-sm">90 dias de histórico</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-muted-foreground">Última Atualização</h4>
                  <p className="text-sm">Tempo real</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InsightsPopup;