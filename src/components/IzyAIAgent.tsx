
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Lightbulb, TrendingUp, Target, Zap, ArrowRight } from 'lucide-react';
import OptimizationResults from './OptimizationResults';
import InsightsPopup from './InsightsPopup';

const IzyAIAgent = () => {
  const [currentStrategy, setCurrentStrategy] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const strategies = [
    {
      id: 1,
      title: "Otimização de Audience",
      description: "Identifiquei que seu público de 25-34 anos tem 3x mais conversões. Sugiro aumentar o budget para essa faixa etária.",
      impact: "+47% ROAS",
      icon: <Target className="w-6 h-6 text-blue-400" />,
      color: "border-blue-500/30 bg-blue-500/5"
    },
    {
      id: 2,
      title: "Ajuste de Horários",
      description: "Suas campanhas performam melhor entre 19h-22h. Recomendo concentrar 60% do budget nesse período.",
      impact: "+32% CTR",
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      color: "border-green-500/30 bg-green-500/5"
    },
    {
      id: 3,
      title: "Palavras-chave Negativas",
      description: "Detectei 15 termos que estão gastando budget sem converter. Adicionar essas palavras negativas pode economizar R$ 1.2k/mês.",
      impact: "-28% CPC",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      color: "border-yellow-500/30 bg-yellow-500/5"
    }
  ];

  // Removed auto-cycling - keeping "Otimização de Audience" as default

  const handleStrategyClick = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStrategy(index);
      setIsAnimating(false);
    }, 300);
  };

  const handleApplySuggestions = () => {
    setShowResults(true);
  };

  const handleShowInsights = () => {
    setShowInsights(true);
  };

  return (
    <div className="mt-12 relative">
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-8 mx-auto max-w-5xl">
        <div className="bg-gray-900/80 rounded-xl p-6 backdrop-blur-sm border border-yellow-500/20">
          {/* Izy Header */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Bot className="w-6 h-6 text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400">Izy.Ai</h3>
                <p className="text-sm text-muted-foreground">Analisando suas campanhas em tempo real</p>
              </div>
            </div>
          </div>

          {/* Strategy Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {strategies.map((strategy, index) => (
              <Card 
                key={strategy.id}
                className={`relative cursor-pointer transition-all duration-500 hover-scale ${
                  index === currentStrategy 
                    ? `${strategy.color} ring-2 ring-yellow-500/50 transform scale-105` 
                    : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70'
                } ${isAnimating && index === currentStrategy ? 'animate-pulse' : ''}`}
                onClick={() => handleStrategyClick(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    {strategy.icon}
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{strategy.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {strategy.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-400">{strategy.impact}</span>
                    {index === currentStrategy && (
                      <div className="flex items-center text-yellow-400 text-sm">
                        <Lightbulb className="w-4 h-4 mr-1" />
                        Ativa
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleApplySuggestions}
              className="bg-yellow-500 hover:bg-yellow-600 text-background px-6 py-3 rounded-lg"
            >
              Aplicar Sugestões da Izy
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              onClick={handleShowInsights}
              variant="outline" 
              className="border-yellow-500/20 hover:bg-yellow-500/10 px-6 py-3 rounded-lg"
            >
              Ver Mais Insights
            </Button>
          </div>

          {/* Real-time indicator */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Monitoramento em tempo real • Última atualização: agora</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Optimization Results */}
      {showResults && (
        <OptimizationResults selectedStrategy={strategies[currentStrategy]} />
      )}

      {/* Insights Popup */}
      <InsightsPopup 
        isOpen={showInsights}
        onClose={() => setShowInsights(false)}
        selectedStrategy={strategies[currentStrategy]}
      />
    </div>
  );
};

export default IzyAIAgent;
