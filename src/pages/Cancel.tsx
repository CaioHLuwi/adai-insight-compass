import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  ArrowLeft, 
  Zap, 
  BarChart3, 
  Target, 
  Shield, 
  Users,
  TrendingUp,
  Heart,
  Lightbulb
} from 'lucide-react';

const Cancel = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      title: "Otimização Automática com IA",
      description: "Nossa IA otimiza suas campanhas 24/7 para maximizar seu ROAS"
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-blue-400" />,
      title: "Analytics Avançado",
      description: "Dashboards completos com insights que realmente importam"
    },
    {
      icon: <Target className="w-5 h-5 text-green-400" />,
      title: "Campanhas Ilimitadas",
      description: "Gerencie quantas campanhas quiser sem limitações"
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-400" />,
      title: "Suporte Especializado",
      description: "Time dedicado para te ajudar a alcançar seus objetivos"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-yellow-500 rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-500/10 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-orange-500/10 rounded-full"></div>
      </div>

      <div className="max-w-2xl w-full relative">
        <Card className="bg-gray-800/50 border-red-500/20 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="w-10 h-10 text-red-400" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-4">
              Pagamento Cancelado
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-lg mb-8">
              Não se preocupe! Você pode retornar e assinar a qualquer momento. 
              <br />
              <span className="text-yellow-400">Esperamos te ver em breve! 💛</span>
            </p>

            {/* Benefits Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Veja o que você está perdendo:
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-gray-700/30 p-4 rounded-lg border border-yellow-500/10">
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

              <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-3 py-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +300% de ROI médio dos nossos clientes
              </Badge>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                Esperamos te ver novamente em breve!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6"
                >
                  Ver Planos Novamente
                </Button>
                
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="border-yellow-500/20 hover:bg-yellow-500/10 text-white px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Início
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                Precisa de ajuda? Entre em contato: 
                <span className="text-yellow-400 ml-1">contato@otmizy.ai</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cancel;