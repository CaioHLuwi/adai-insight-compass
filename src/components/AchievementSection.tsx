
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Target, 
  Crown, 
  Gem, 
  Star, 
  Award, 
  Zap, 
  TrendingUp,
  Gift,
  Lock,
  CheckCircle
} from 'lucide-react';

interface AchievementSectionProps {
  isVisible: boolean;
  getText: (key: string) => string;
}

const AchievementSection: React.FC<AchievementSectionProps> = ({ isVisible, getText }) => {
  const [animatedAchievements, setAnimatedAchievements] = useState<number[]>([]);

  const achievements = [
    {
      id: 1,
      title: "Primeira Campanha",
      description: "Complete sua primeira campanha com sucesso",
      points: 100,
      progress: 100,
      unlocked: true,
      icon: <Trophy className="w-8 h-8" />,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      difficulty: "Fácil",
      reward: "+3 dias grátis"
    },
    {
      id: 2,
      title: "Meta de ROAS",
      description: "Alcance ROAS superior a 3.0x em uma campanha",
      points: 250,
      progress: 85,
      unlocked: false,
      icon: <Target className="w-8 h-8" />,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      difficulty: "Médio",
      reward: "Badge Especialista"
    },
    {
      id: 3,
      title: "Rei das Conversões",
      description: "Obtenha mais de 1000 conversões em um mês",
      points: 500,
      progress: 60,
      unlocked: false,
      icon: <Crown className="w-8 h-8" />,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      difficulty: "Difícil",
      reward: "Placa Dourada"
    },
    {
      id: 4,
      title: "Otimizador Expert",
      description: "Use IA para otimizar 50 campanhas",
      points: 300,
      progress: 30,
      unlocked: false,
      icon: <Gem className="w-8 h-8" />,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      difficulty: "Médio",
      reward: "+7 dias grátis"
    },
    {
      id: 5,
      title: "Mestre dos CTRs",
      description: "Alcance CTR superior a 5% em 10 campanhas",
      points: 400,
      progress: 15,
      unlocked: false,
      icon: <Zap className="w-8 h-8" />,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      difficulty: "Difícil",
      reward: "Badge Premium"
    },
    {
      id: 6,
      title: "Economizador Pro",
      description: "Economize R$ 10.000 em gastos com otimizações",
      points: 750,
      progress: 5,
      unlocked: false,
      icon: <TrendingUp className="w-8 h-8" />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      difficulty: "Expert",
      reward: "Troféu Diamante"
    }
  ];

  const totalPoints = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  const nextUnlock = achievements
    .filter(a => !a.unlocked && a.progress > 0)
    .sort((a, b) => b.progress - a.progress)[0];

  useEffect(() => {
    if (isVisible) {
      achievements.forEach((achievement, index) => {
        if (achievement.unlocked) {
          setTimeout(() => {
            setAnimatedAchievements(prev => [...prev, achievement.id]);
          }, index * 200);
        }
      });
    }
  }, [isVisible]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Médio': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Difícil': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section 
      id="achievements" 
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20 relative z-10 transition-all duration-1000 delay-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{getText('achievementsTitle')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {getText('achievementsSubtitle')}
          </p>
          
          {/* Points Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-black" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">{totalPoints}</div>
                <div className="text-sm text-muted-foreground">Pontos Conquistados</div>
              </div>
            </div>
            
            {nextUnlock && (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <div className="text-lg font-semibold">{nextUnlock.title}</div>
                  <div className="text-sm text-muted-foreground">{nextUnlock.progress}% completo</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <Card 
              key={achievement.id} 
              className={`relative transition-all duration-500 hover-scale ${
                achievement.unlocked 
                  ? `${achievement.bgColor} ${achievement.borderColor} ring-2 ring-opacity-50` 
                  : 'bg-gray-800/50 border-gray-700/50'
              } ${animatedAchievements.includes(achievement.id) ? 'animate-bounce' : ''}`}
            >
              <CardContent className="p-6 text-center">
                {/* Achievement Icon */}
                <div className="mb-4 flex justify-center relative">
                  <div className={`relative ${achievement.unlocked ? achievement.color : 'text-gray-500'}`}>
                    {achievement.icon}
                    {achievement.unlocked && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                        <CheckCircle className="w-4 h-4 text-black" />
                      </div>
                    )}
                    {!achievement.unlocked && (
                      <div className="absolute inset-0 bg-gray-600/70 rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Achievement Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap justify-center gap-2 mb-3">
                    <Badge className={`text-xs ${getDifficultyColor(achievement.difficulty)}`}>
                      {achievement.difficulty}
                    </Badge>
                    <Badge className="text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      {achievement.points} pts
                    </Badge>
                  </div>
                  
                  {/* Reward */}
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <Gift className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400">{achievement.reward}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-green-400 to-green-500' 
                        : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                    }`}
                    style={{ 
                      width: `${achievement.progress}%`,
                      animation: achievement.unlocked ? 'pulse 2s infinite' : 'none'
                    }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {achievement.progress}% completo
                </p>

                {/* Unlock Animation */}
                {achievement.unlocked && animatedAchievements.includes(achievement.id) && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-32 h-32 border-4 border-yellow-400 rounded-full animate-ping opacity-30"></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-8 py-3 rounded-lg text-lg font-semibold">
            Começar a Conquistar Badges
            <Trophy className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;
