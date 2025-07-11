import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, TrendingUp, Target, Users, DollarSign } from 'lucide-react';

interface OptimizationResultsProps {
  selectedStrategy: {
    title: string;
    description: string;
    impact: string;
  };
}

const OptimizationResults: React.FC<OptimizationResultsProps> = ({ selectedStrategy }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    'Analisando dados históricos...',
    'Identificando padrões de conversão...',
    'Calculando otimizações...',
    'Aplicando configurações...',
    'Validando resultados...'
  ];

  const optimizationData = {
    'Otimização de Audience': {
      metrics: [
        { label: 'ROAS Atual', value: '3.2x', newValue: '4.7x', icon: TrendingUp },
        { label: 'CPA Médio', value: 'R$ 45', newValue: 'R$ 32', icon: DollarSign },
        { label: 'Alcance', value: '12.5K', newValue: '18.2K', icon: Users },
        { label: 'CTR', value: '2.1%', newValue: '3.4%', icon: Target }
      ]
    },
    'Ajuste de Horários': {
      metrics: [
        { label: 'CTR Médio', value: '2.1%', newValue: '2.8%', icon: Target },
        { label: 'Impressões', value: '45K', newValue: '52K', icon: TrendingUp },
        { label: 'CPC', value: 'R$ 1.20', newValue: 'R$ 0.95', icon: DollarSign },
        { label: 'Conversões', value: '89', newValue: '117', icon: CheckCircle }
      ]
    },
    'Palavras-chave Negativas': {
      metrics: [
        { label: 'CPC Médio', value: 'R$ 1.45', newValue: 'R$ 1.04', icon: DollarSign },
        { label: 'Gasto Desperdiçado', value: 'R$ 1.2K', newValue: 'R$ 0', icon: TrendingUp },
        { label: 'Relevância', value: '6.2', newValue: '8.9', icon: Target },
        { label: 'Quality Score', value: '7.1', newValue: '9.3', icon: CheckCircle }
      ]
    }
  };

  const currentData = optimizationData[selectedStrategy.title as keyof typeof optimizationData] || optimizationData['Otimização de Audience'];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true);
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <Card className="mt-8 bg-gray-900/90 border-yellow-500/20">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">
            {selectedStrategy.title}
          </h3>
          <p className="text-muted-foreground">
            Aplicando otimizações baseadas em IA...
          </p>
        </div>

        {/* Loading Steps */}
        <div className="mb-6">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-3 transition-all duration-700 ease-out transform ${
                  index <= currentStep 
                    ? 'opacity-100 translate-x-0 scale-100' 
                    : 'opacity-30 translate-x-8 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index < currentStep 
                    ? 'bg-green-400 scale-100' 
                    : index === currentStep 
                      ? 'bg-yellow-400 animate-pulse scale-110' 
                      : 'bg-gray-600 scale-75'
                }`}></div>
                <span className={`text-sm transition-all duration-500 ${
                  index <= currentStep ? 'text-white font-medium' : 'text-muted-foreground'
                } ${index === currentStep ? 'animate-pulse' : ''}`}>
                  {index === currentStep ? (
                    <span className="inline-block">
                      {step.split('').map((char, charIndex) => (
                        <span
                          key={charIndex}
                          className="inline-block animate-fade-in"
                          style={{
                            animationDelay: `${charIndex * 50}ms`,
                            animationFillMode: 'both'
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </span>
                  ) : (
                    step
                  )}
                </span>
                {index < currentStep && (
                  <CheckCircle className="w-4 h-4 text-green-400 animate-scale-in" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progresso</span>
            <span className="text-sm font-semibold">{progress}%</span>
          </div>
          <div className="relative">
            <Progress 
              value={progress} 
              className="h-4 bg-gray-700"
            />
            <div 
              className="absolute top-0 left-0 h-4 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)`,
                boxShadow: '0 0 10px rgba(251, 191, 36, 0.3)'
              }}
            />
          </div>
        </div>

        {/* Campaign Metrics */}
        {isComplete && (
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-lg font-semibold text-center text-green-400 mb-4">
              ✓ Otimização Concluída!
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {currentData.metrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <div 
                    key={index}
                    className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <IconComponent className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">
                        {metric.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-400 line-through text-sm">
                        {metric.value}
                      </span>
                      <span className="text-green-400 font-semibold">
                        {metric.newValue}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-4">
              <span className="text-2xl font-bold text-green-400">
                {selectedStrategy.impact}
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                Melhoria projetada nos próximos 7 dias
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OptimizationResults;