
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getTranslations = () => {
    return {
      title: {
        en: 'AI Assistant',
        pt: 'Assistente IA',
        es: 'Asistente IA',
        ru: 'ИИ Ассистент',
        de: 'KI-Assistent'
      },
      startConversation: {
        en: 'Start a conversation with the AI assistant!',
        pt: 'Comece uma conversa com o assistente IA!',
        es: '¡Comienza una conversación con el asistente de IA!',
        ru: 'Начните разговор с ИИ-ассистентом!',
        de: 'Beginnen Sie ein Gespräch mit dem KI-Assistenten!'
      },
      typePlaceholder: {
        en: 'Type your message...',
        pt: 'Digite sua mensagem...',
        es: 'Escribe tu mensaje...',
        ru: 'Введите ваше сообщение...',
        de: 'Geben Sie Ihre Nachricht ein...'
      },
      welcomeMessage: {
        en: 'Hello! I\'m your AI assistant. How can I help you optimize your campaigns today?',
        pt: 'Olá! Sou seu assistente IA. Como posso ajudá-lo a otimizar suas campanhas hoje?',
        es: '¡Hola! Soy tu asistente de IA. ¿Cómo puedo ayudarte a optimizar tus campañas hoy?',
        ru: 'Привет! Я ваш ИИ-ассистент. Как я могу помочь вам оптимизировать кампании сегодня?',
        de: 'Hallo! Ich bin Ihr KI-Assistent. Wie kann ich Ihnen heute bei der Optimierung Ihrer Kampagnen helfen?'
      }
    };
  };

  const translations = getTranslations();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: translations.welcomeMessage[language] || translations.welcomeMessage.pt,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [language]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (since we don't have OpenAI integration)
    setTimeout(() => {
      const responses = [
        'Posso ajudá-lo a analisar suas métricas de campanha. Que tipo de dados você gostaria de revisar?',
        'Para otimizar suas campanhas, recomendo focar no ROAS e CTR. Precisa de ajuda específica?',
        'Vamos melhorar seus resultados! Qual plataforma você está usando principalmente?',
        'Posso sugerir estratégias baseadas nos seus dados. Quer compartilhar suas métricas atuais?',
        'Otimização é minha especialidade! Em que posso ajudar especificamente?'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          {translations.title[language] || translations.title.pt}
        </h1>
      </div>

      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-black" />
                </div>
              )}
              <div
                className={`max-w-lg p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={translations.typePlaceholder[language] || translations.typePlaceholder.pt}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !inputMessage.trim()}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
