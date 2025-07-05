import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  ArrowRight, 
  Home, 
  Zap, 
  Crown, 
  Trophy,
  Star,
  Sparkles,
  Gift,
  TrendingUp
} from 'lucide-react';

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    if (sessionId) {
      // Opcional: Buscar detalhes da sessão do seu backend
      // para exibir informações específicas da compra
      console.log('Session ID:', sessionId);
    }
  }, [sessionId]);

  const benefits = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: "IA Otimizando 24/7",
      description: "Suas campanhas já estão sendo otimizadas automaticamente"
    },
    {
      icon: <Crown className="w-5 h-5 text-purple-400" />,
      title: "Acesso Premium",
      description: "Todos os recursos avançados liberados para você"
    },
    {
      icon: <Trophy className="w-5 h-5 text-yellow-400" />,
      title: "Sistema de Conquistas",
      description: "Desbloqueie badges exclusivos conforme evolui"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-400" />,
      title: "Analytics Completo",
      description: "Dashboards personalizados com insights profundos"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-yellow-500 rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-500/10 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-green-500/10 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-purple-500/10 rotate-12"></div>
      </div>

      <div className="max-w-2xl w-full relative">
        <Card className="bg-gray-800/50 border-green-500/20 backdrop-blur-sm relative overflow-hidden">
          {/* Celebration animation background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 animate-bounce">
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="absolute top-8 right-8 animate-pulse">
              <Star className="w-5 h-5 text-purple-400" />
            </div>
            <div className="absolute bottom-6 left-8 animate-bounce delay-150">
              <Gift className="w-5 h-5 text-green-400" />
            </div>
          </div>

          <CardContent className="p-8 text-center relative">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              🎉 Pagamento Realizado com Sucesso!
            </h1>

            {/* Welcome Message */}
            <div className="mb-8">
              <p className="text-gray-300 text-lg mb-4">
                <strong className="text-yellow-400">Bem-vindo à família Otmizy.ai!</strong>
                <br />
                Seu plano foi ativado e você já pode acessar todas as funcionalidades premium.
              </p>
              
              <Badge className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 text-yellow-400 border-yellow-500/20 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Status: Premium Ativo
              </Badge>
            </div>

            {/* Benefits Grid */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                O que você já pode fazer agora:
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-700/30 to-gray-600/20 p-4 rounded-lg border border-yellow-500/10">
                    <div className="flex items-start gap-3">
                      {benefit.icon}
                      <div className="text-left">
                        <h3 className="font-semibold text-white text-sm">{benefit.title}</h3>
                        <p className="text-gray-400 text-xs mt-1">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                🚀 Tudo pronto! Comece a otimizar suas campanhas agora mesmo.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 shadow-lg"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Acessar Dashboard
                </Button>
                
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="border-yellow-500/20 hover:bg-yellow-500/10 text-white px-6"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Voltar ao Início
                </Button>
              </div>
            </div>

            {/* Welcome Bonus */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold text-purple-400">Bônus de Boas-vindas!</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Você ganhou <strong className="text-yellow-400">3 otimizações gratuitas</strong> com nossa IA para começar com o pé direito!
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="mt-6">
              <p className="text-gray-400 text-sm">
                Precisa de ajuda para começar? 
                <span className="text-yellow-400 ml-1">contato@otmizy.ai</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;