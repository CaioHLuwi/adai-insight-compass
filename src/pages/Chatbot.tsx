
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/hooks/useLanguage';
import { ManusService, ManusMessage } from '@/services/manusService';

interface ChatMessage extends ManusMessage {
  id: string;
  timestamp: Date;
}

const Chatbot = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('manus-api-key') || '');
  const [agentType, setAgentType] = useState<'ads' | 'support'>('ads');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveApiKey = () => {
    localStorage.setItem('manus-api-key', apiKey);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !apiKey) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const manusService = new ManusService(apiKey);
      const response = await manusService.sendMessage(
        messages.map(m => ({ role: m.role, content: m.content })).concat([{ role: 'user', content: inputMessage }]),
        agentType
      );

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'pt' 
          ? 'Desculpe, ocorreu um erro ao processar sua mensagem. Verifique sua chave da API.'
          : 'Sorry, there was an error processing your message. Please check your API key.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!apiKey) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'pt' ? 'Chatbot IA' : 'AI Chatbot'}
        </h1>
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'pt' ? 'Configuração da API Manus' : 'Manus API Configuration'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {language === 'pt' 
              ? 'Para usar o chatbot IA, você precisa de uma chave da API Manus. Você pode encontrar sua chave em:'
              : 'To use the AI chatbot, you need a Manus API key. You can find your API key at:'
            }
          </p>
          <p className="text-blue-600 font-mono text-sm mb-4">https://manus.chat/dashboard/api-keys</p>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder={language === 'pt' ? 'Cole sua chave da API aqui' : 'Paste your API key here'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button onClick={saveApiKey} className="w-full">
              {language === 'pt' ? 'Salvar Chave da API' : 'Save API Key'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          {language === 'pt' ? 'Chatbot IA' : 'AI Chatbot'}
        </h1>
        <div className="flex gap-2">
          <Button
            variant={agentType === 'ads' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAgentType('ads')}
          >
            AdsBot
          </Button>
          <Button
            variant={agentType === 'support' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAgentType('support')}
          >
            SupportBot
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              {language === 'pt' 
                ? 'Comece uma conversa com o assistente IA!'
                : 'Start a conversation with the AI assistant!'
              }
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-lg p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
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
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
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
              placeholder={language === 'pt' ? 'Digite sua mensagem...' : 'Type your message...'}
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
