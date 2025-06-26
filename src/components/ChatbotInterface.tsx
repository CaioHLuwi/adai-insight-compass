
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, Sparkles } from 'lucide-react';

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

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Ótima pergunta! Com base nos dados das suas campanhas, posso sugerir algumas otimizações específicas. Você gostaria de ver as métricas de desempenho atual?",
      "Analisando suas campanhas, vejo oportunidades de melhoria no CTR e CPA. Que tal implementarmos algumas mudanças nos anúncios?",
      "Para maximizar seu ROI, recomendo focar nos segmentos que estão performando melhor. Quer que eu mostre um relatório detalhado?",
      "Detectei algumas anomalias nos gastos recentes. Posso ajudá-lo a investigar e otimizar o orçamento das campanhas.",
      "Baseado na análise de dados, suas campanhas têm potencial para aumentar 30% no faturamento. Vamos trabalhar nisso juntos!"
    ];
    
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
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-gray-800/50 border-yellow-500/20 h-[600px] flex flex-col">
        <CardHeader className="border-b border-yellow-500/20">
          <CardTitle className="flex items-center space-x-2 text-yellow-400">
            <Sparkles className="w-6 h-6" />
            <span>Chat com Izy - IA da Otmizy</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden p-0">
          {/* Messages Area */}
          <div className="h-full overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-2 max-w-3xl ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isUser 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-gray-700 text-yellow-400'
                  }`}>
                    {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-lg px-4 py-2 ${
                    message.isUser 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-gray-700 text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-2 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-gray-700 text-yellow-400 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-700 text-white rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-typing"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
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
