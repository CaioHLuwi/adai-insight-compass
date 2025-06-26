
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Eu sou a Izy, sua assistente de IA da Otmizy. Como posso ajudá-lo a otimizar suas campanhas hoje?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callOpenAI = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: 'marketing_optimization'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.response || generateFallbackResponse(userMessage);
    } catch (error) {
      console.error('OpenAI API error:', error);
      return generateFallbackResponse(userMessage);
    }
  };

  const generateFallbackResponse = (userMessage: string): string => {
    const responses = [
      "Ótima pergunta! Com base nos dados das suas campanhas, posso sugerir algumas otimizações específicas. Você gostaria de ver as métricas de desempenho atual?",
      "Analisando suas campanhas, vejo oportunidades de melhoria no CTR e CPA. Que tal implementarmos algumas mudanças nos anúncios?",
      "Para maximizar seu ROI, recomendo focar nos segmentos que estão performando melhor. Quer que eu mostre um relatório detalhado?",
      "Detectei algumas anomalias nos gastos recentes. Posso ajudá-lo a investigar e otimizar o orçamento das campanhas.",
      "Baseado na análise de dados, suas campanhas têm potencial para aumentar 30% no faturamento. Vamos trabalhar nisso juntos!",
      "Posso ajudá-lo a configurar automações para suas campanhas. Isso pode economizar tempo e melhorar os resultados.",
      "Que tal analisarmos o desempenho das suas palavras-chave? Posso identificar oportunidades de otimização.",
      "Vejo que você tem interesse em melhorar suas campanhas. Posso sugerir estratégias baseadas nas melhores práticas do mercado."
    ];
    
    // Simple keyword matching for more relevant responses
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('roas') || lowerMessage.includes('retorno')) {
      return "Para melhorar seu ROAS, recomendo focar em públicos que já converteram, otimizar lances e testar novos criativos. Quer que eu analise suas campanhas atuais?";
    }
    if (lowerMessage.includes('cpa') || lowerMessage.includes('custo')) {
      return "Para reduzir o CPA, sugiro revisar palavras-chave negativas, otimizar públicos e ajustar estratégias de lance. Posso ajudá-lo com isso!";
    }
    if (lowerMessage.includes('campanha') || lowerMessage.includes('campaign')) {
      return "Posso ajudá-lo a analisar e otimizar suas campanhas. Que tipo de campanha você gostaria de melhorar: Google Ads, Facebook Ads ou outra plataforma?";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const aiResponseText = await callOpenAI(currentInput);
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: aiResponseText,
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        const errorResponse: Message = {
          id: messages.length + 2,
          text: "Desculpe, estou enfrentando algumas dificuldades técnicas. Mas posso continuar ajudando com suas campanhas! Tente reformular sua pergunta.",
          isUser: false,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorResponse]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Como melhorar meu ROAS?",
    "Análise das campanhas atuais",
    "Como otimizar gastos?",
    "Estratégias para reduzir CPA",
    "Melhores práticas para Facebook Ads"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-gray-800/50 border-yellow-500/20 h-[700px] flex flex-col">
        <CardHeader className="border-b border-yellow-500/20">
          <CardTitle className="flex items-center space-x-2 text-yellow-400">
            <Sparkles className="w-6 h-6" />
            <span>Chat com Izy - IA da Otmizy</span>
            <div className="ml-auto flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">Online</span>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden p-0">
          {/* Messages Area */}
          <div className="h-full overflow-y-auto p-4 space-y-4">
            {/* Suggested Questions (shown only at start) */}
            {messages.length === 1 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Perguntas sugeridas:</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs border-yellow-500/20 hover:bg-yellow-500/10 text-gray-300"
                      onClick={() => setInputValue(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex space-x-3 max-w-3xl ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                  }`}>
                    {message.isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={`rounded-lg px-4 py-3 ${
                    message.isUser 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-gray-700 text-white'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className="text-xs opacity-60 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex space-x-3 max-w-3xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="bg-gray-700 text-white rounded-lg px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua pergunta sobre campanhas, métricas ou otimizações..."
                className="flex-1 bg-gray-700 border-yellow-500/20 text-white placeholder:text-gray-400"
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              💡 Experimente perguntar sobre: "Como melhorar meu ROAS?", "Análise das campanhas", "Otimizar gastos"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotInterface;
