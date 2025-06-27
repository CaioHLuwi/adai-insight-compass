
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Crown, Gem, Star, Target, Zap, TrendingUp } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  points: number;
  level: 'Bronze' | 'Prata' | 'Ouro' | 'Diamante';
  icon: React.ReactNode;
  unlocked: boolean;
  color: string;
}

interface AchievementSectionProps {
  isVisible: boolean;
  getText: (key: string) => string;
}

const AchievementSection = ({ isVisible, getText }: AchievementSectionProps) => {
  const [currentAchievement, setCurrentAchievement] = useState(0);
  const [userPoints, setUserPoints] = useState(1250);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Primeiro ROAS',
      description: 'Alcance seu primeiro ROAS de 3:1',
      points: 100,
      level: 'Bronze',
      icon: <Target className="w-6 h-6" />,
      unlocked: true,
      color: 'from-amber-600 to-amber-800'
    },
    {
      id: 2,
      title: 'Otimizador Expert',
      description: 'Otimize 10 campanhas com sucesso',
      points: 250,
      level: 'Prata',
      icon: <Zap className="w-6 h-6" />,
      unlocked: true,
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 3,
      title: 'ROI Master',
      description: 'Mantenha ROI acima de 500% por 30 dias',
      points: 500,
      level: 'Ouro',
      icon: <Crown className="w-6 h-6" />,
      unlocked: true,
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 4,
      title: 'Performance Legend',
      description: 'Alcance 1000% de ROI em uma campanha',
      points: 1000,
      level: 'Diamante',
      icon: <Gem className="w-6 h-6" />,
      unlocked: false,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 5,
      title: 'Traffic Genius',
      description: 'Gere mais de R$ 100k em vendas',
      points: 750,
      level: 'Ouro',
      icon: <TrendingUp className="w-6 h-6" />,
      unlocked: false,
      color: 'from-green-400 to-green-600'
    },
    {
      id: 6,
      title: 'Conversion King',
      description: 'Alcance taxa de conversão de 15%',
      points: 300,
      level: 'Prata',
      icon: <Award className="w-6 h-6" />,
      unlocked: true,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAchievement((prev) => (prev + 1) % achievements.length);
    }, 6000); // Changed from 3000ms to 6000ms (slower animation)

    return () => clearInterval(interval);
  }, [achievements.length]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  return (
    <section id="achievements" className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/20 relative z-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{getText('achievementsTitle')}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {getText('achievementsSubtitle')}
          </p>
          
          {/* Points and Progress */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">{userPoints.toLocaleString()}</span>
              <span className="text-muted-foreground">pontos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-2xl font-bold">{unlockedCount}/{achievements.length}</span>
              <span className="text-muted-foreground">conquistas</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-gray-800 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-1000 ease-out"
                style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Progresso: {Math.round((unlockedCount / achievements.length) * 100)}%
            </p>
          </div>
        </div>

        {/* Featured Achievement */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 animate-pulse">
              ✨ Conquista em Destaque
            </Badge>
          </div>
          
          <Card className={`max-w-2xl mx-auto bg-gradient-to-r ${achievements[currentAchievement].color} p-1 hover-scale transition-all duration-1000`}>
            <div className="bg-gray-900 rounded-lg p-8">
              <div className="flex items-center justify-center mb-6">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${achievements[currentAchievement].color} flex items-center justify-center text-white transition-all duration-1000`}>
                  {achievements[currentAchievement].icon}
                </div>
              </div>
              <div className="text-center">
                <Badge className={`mb-4 ${achievements[currentAchievement].unlocked ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                  {achievements[currentAchievement].level} • {achievements[currentAchievement].points} pts
                </Badge>
                <h3 className="text-2xl font-bold mb-2">{achievements[currentAchievement].title}</h3>
                <p className="text-muted-foreground mb-4">{achievements[currentAchievement].description}</p>
                {achievements[currentAchievement].unlocked ? (
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                    ✅ Desbloqueada
                  </Badge>
                ) : (
                  <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20">
                    🔒 Bloqueada
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Card 
              key={achievement.id} 
              className={`${achievement.unlocked ? 'bg-gray-800/50 border-yellow-500/20' : 'bg-gray-800/20 border-gray-700/20'} hover-scale transition-all duration-300 ${index === currentAchievement ? 'ring-2 ring-yellow-500/50' : ''}`}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${achievement.unlocked ? `bg-gradient-to-r ${achievement.color}` : 'bg-gray-600'} flex items-center justify-center text-white mx-auto mb-4 transition-all duration-500`}>
                  {achievement.icon}
                </div>
                <Badge className={`mb-3 ${achievement.unlocked ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                  {achievement.level}
                </Badge>
                <h4 className="font-semibold mb-2">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                <div className="flex items-center justify-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">{achievement.points}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Rewards */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Próximas Recompensas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">+7</span>
                </div>
                <h4 className="font-semibold mb-2">Dias Extras</h4>
                <p className="text-sm text-muted-foreground mb-2">1500 pontos</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: `${(userPoints/1500)*100}%`}}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Placa Exclusiva</h4>
                <p className="text-sm text-muted-foreground mb-2">2500 pontos</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: `${(userPoints/2500)*100}%`}}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-black" />
                </div>
                <h4 className="font-semibold mb-2">Status VIP</h4>
                <p className="text-sm text-muted-foreground mb-2">5000 pontos</p>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: `${(userPoints/5000)*100}%`}}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;
