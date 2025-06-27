
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, TrendingUp, Target, Zap, BarChart3, Settings, MessageCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Strategy {
  id: number;
  title: string;
  description: string;
  impact: string;
  icon: React.ReactNode;
  color: string;
  active: boolean;
}

const Chatbot = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Eu sou a Izy, sua assistente de IA da Otmizy! 🚀 Como posso ajudá-lo a otimizar suas campanhas hoje?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const strategies: Strategy[] = [
    {
      id: 1,
      title: "Otimização de Audience",
      description: "Identifiquei que seu público de 25-34 anos tem 3x mais conversões. Sugiro aumentar o budget para essa faixa etária.",
      impact: "+47% ROAS",
      icon: <Target className="w-6 h-6 text-blue-400" />,
      color: "border-blue-500/30 bg-blue-500/5",
      active: true
    },
    {
      id: 2,
      title: "Ajuste de Horários",
      description: "Suas campanhas performam melhor entre 19h-22h. Recomendo concentrar 60% do budget nesse período.",
      impact: "+32% CTR",
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      color: "border-green-500/30 bg-green-500/5",
      active: false
    },
    {
      id: 3,
      title: "Palavras-chave Negativas",
      description: "Detectei 15 termos que estão gastando budget sem converter. Adicionar essas palavras negativas pode economizar R$ 1.2k/mês.",
      impact: "-28% CPC",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      color: "border-yellow-500/30 bg-yellow-500/5",
      active: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStrategy((prev) => (prev + 1) % strategies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    {
      title: 'Estratégias de Marketing',
      description: 'Desenvolva estratégias personalizadas',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-blue-500',
      prompt: 'Preciso de estratégias de marketing para minha campanha'
    },
    {
      title: 'Otimizar Campanhas',
      description: 'Melhore o desempenho das suas campanhas',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-green-500',
      prompt: 'Como posso otimizar minhas campanhas atuais?'
    },
    {
      title: 'Análise de Métricas',
      description: 'Entenda suas métricas e KPIs',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-purple-500',
      prompt: 'Preciso analisar as métricas das minhas campanhas'
    },
    {
      title: 'Automação',
      description: 'Configure automações inteligentes',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-yellow-500',
      prompt: 'Como configurar automações para minhas campanhas?'
    },
    {
      title: 'Configurações',
      description: 'Ajuste suas configurações',
      icon: <Settings className="w-6 h-6" />,
      color: 'bg-gray-500',
      prompt: 'Preciso ajuda com as configurações da plataforma'
    },
    {
      title: 'Suporte Geral',
      description: 'Tire suas dúvidas gerais',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-indigo-500',
      prompt: 'Tenho uma dúvida geral sobre a plataforma'
    }
  ];

  const generateResponse = (userMessage: string): string => {
    const responses = {
      estrategias: [
        "Ótima pergunta sobre estratégias! Para campanhas eficazes, recomendo: 1) Definir público-alvo específico, 2) Criar mensagens personalizadas, 3) Testar diferentes criativos, 4) Usar dados para otimização contínua. Quer que eu detalhe algum desses pontos?",
        "Para estratégias de marketing eficazes, sugiro focar em: segmentação precisa, testes A/B constantes, análise de concorrentes e otimização baseada em dados. Qual aspecto te interessa mais?",
        "As melhores estratégias incluem: 1) Análise profunda do público, 2) Criação de funis de conversão, 3) Automação de campanhas, 4) Monitoramento em tempo real. Posso ajudar a implementar alguma?"
      ],
      otimizar: [
        "Para otimizar suas campanhas, analise: CTR, CPA, ROAS e taxa de conversão. Recomendo: ajustar palavras-chave, refinar públicos, testar novos criativos e otimizar horários de veiculação. Quer focar em alguma métrica específica?",
        "Excelente! Para otimização, sugiro: 1) Revisar palavras-chave negativas, 2) Ajustar lances automáticos, 3) Testar novos públicos similares, 4) Analisar horários de melhor performance. Por onde começamos?",
        "Para otimizar campanhas efetivamente: identifique gargalos, teste elementos visuais, ajuste segmentação, monitore concorrência e use automações inteligentes. Qual campanha você gostaria de focar?"
      ],
      metricas: [
        "Vamos analisar suas métricas! As principais são: ROAS (retorno sobre investimento em anúncios), CPA (custo por aquisição), CTR (taxa de cliques) e LTV (valor do cliente). Qual métrica está te preocupando mais?",
        "Para análise de métricas eficaz, foque em: 1) ROAS mínimo de 3:1, 2) CPA abaixo do LTV, 3) CTR acima da média do setor, 4) Taxa de conversão crescente. Quer que eu analise alguma métrica específica?",
        "Métricas essenciais para acompanhar: impressões, cliques, conversões, receita, ROAS, CPC e qualidade do tráfego. Posso ajudar a interpretar os dados das suas campanhas!"
      ],
      automacao: [
        "Automações inteligentes podem revolucionar suas campanhas! Sugiro: 1) Lances automáticos baseados em ROAS, 2) Pausar campanhas com baixo desempenho, 3) Ajustar orçamentos automaticamente, 4) Enviar relatórios programados. Qual automação te interessa?",
        "Para automação eficaz, configure: regras de otimização de lance, alertas de performance, redistribuição automática de orçamento e relatórios personalizados. Por onde você gostaria de começar?",
        "As automações mais eficazes incluem: gestão de lances, otimização de públicos, controle de orçamento e alertas inteligentes. Posso ajudar a configurar qualquer uma dessas!"
      ],
      configuracoes: [
        "Nas configurações, você pode: 1) Conectar suas contas de anúncios, 2) Definir metas e alertas, 3) Configurar relatórios automáticos, 4) Ajustar preferências de notificação. Precisa de ajuda com algum item específico?",
        "Para configurar a plataforma corretamente: conecte todas as suas contas, defina seus KPIs principais, configure alertas personalizados e estabeleça frequência de relatórios. Qual configuração você gostaria de ajustar?",
        "Vamos configurar tudo perfeitamente! Posso ajudar com: integração de plataformas, definição de metas, configuração de dashboards e personalização de alertas. O que precisa configurar primeiro?"
      ],
      default: [
        "Interessante pergunta! Baseado na minha experiência com campanhas, posso sugerir algumas estratégias personalizadas. Você poderia me contar mais detalhes sobre seu objetivo específico?",
        "Ótima questão! Para te ajudar melhor, preciso entender: qual é seu principal desafio atual? Está relacionado a performance, orçamento, ou estratégia geral?",
        "Posso ajudar com isso! A Otmizy oferece várias ferramentas para otimização. Que tipo de resultado você está buscando alcançar com suas campanhas?"
      ]
    };

    const message = userMessage.toLowerCase();
    
    if (message.includes('estratégia') || message.includes('marketing') || message.includes('campanha')) {
      return responses.estrategias[Math.floor(Math.random() * responses.estrategias.length)];
    } else if (message.includes('otimiz') || message.includes('melhor') || message.includes('performance')) {
      return responses.otimizar[Math.floor(Math.random() * responses.otimizar.length)];
    } else if (message.includes('métrica') || message.includes('roas') || message.includes('cpa') || message.includes('kpi')) {
      return responses.metricas[Math.floor(Math.random() * responses.metricas.length)];
    } else if (message.includes('automaç') || message.includes('automát') || message.includes('regra')) {
      return responses.automacao[Math.floor(Math.random() * responses.automacao.length)];
    } else if (message.includes('configur') || message.includes('ajust') || message.includes('preferên')) {
      return responses.configuracoes[Math.floor(Math.random() * responses.configuracoes.length)];
    } else {
      return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    if (!messageText) setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const response = generateResponse(textToSend);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Otmizy.ai
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sua assistente de IA para otimização de campanhas. Transforme seus dados em insights acionáveis!
          </p>
          <Badge className="mt-4 bg-yellow-500/10 text-yellow-400 border-yellow-500/20 animate-pulse">
            🤖 IA Avançada • Disponível 24/7
          </Badge>
        </div>

        {/* Izy AI Agent Preview Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/20 p-6">
            <div className="bg-gray-900/80 rounded-xl p-6 backdrop-blur-sm">
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
                    <h3 className="text-xl font-bold text-yellow-400">Izy AI Assistant</h3>
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
                    }`}
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg">
                  Aplicar Sugestões da Izy
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline" className="border-yellow-500/20 hover:bg-yellow-500/10 px-6 py-3 rounded-lg">
                  Ver Mais Insights
                </Button>
              </div>

              {/* Real-time indicator */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Monitoramento em tempo real • Última atualização: agora</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-yellow-500/20 h-fit">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Ações Rápidas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto p-4 border-yellow-500/20 hover:bg-yellow-500/10 hover:border-yellow-500/40 transition-all"
                      onClick={() => handleSendMessage(action.prompt)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`${action.color} p-2 rounded-lg flex-shrink-0`}>
                          {action.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-white">{action.title}</div>
                          <div className="text-sm text-muted-foreground">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-yellow-500/20 h-[700px] flex flex-col">
              <CardHeader className="border-b border-yellow-500/20">
                <CardTitle className="flex items-center space-x-2 text-yellow-400">
                  <Bot className="w-6 h-6" />
                  <span>Chat com Izy</span>
                  <div className="ml-auto flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400">Online</span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden p-0">
                {/* Messages Area */}
                <div className="h-full overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div className={`flex space-x-3 max-w-3xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' 
                            ? 'bg-yellow-500 text-black' 
                            : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                        }`}>
                          {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                        </div>
                        <div className={`rounded-lg px-4 py-3 ${
                          message.role === 'user' 
                            ? 'bg-yellow-500 text-black' 
                            : 'bg-gray-700 text-white'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <span className="text-xs opacity-60 mt-2 block">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="flex space-x-3 max-w-3xl">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black flex items-center justify-center flex-shrink-0">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div className="bg-gray-700 text-white rounded-lg px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-sm">Izy está pensando...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-yellow-500/20 p-4">
                  <div className="flex space-x-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Digite sua pergunta sobre campanhas, métricas ou otimizações..."
                      className="flex-1 bg-gray-700 border-yellow-500/20 text-white placeholder:text-gray-400"
                      onKeyPress={handleKeyPress}
                      disabled={isLoading}
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    💡 Clique nas ações rápidas ao lado ou digite sua pergunta aqui
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
