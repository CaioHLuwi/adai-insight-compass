
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: number; text: string; isButton?: boolean }>>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // First message
      setTimeout(() => {
        setMessages([{ id: 1, text: "Olá, como você está? 👋" }]);
        setIsTyping(true);
        
        // Second message after typing
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { id: 2, text: "O que acha de conhecer nossa plataforma e aumentar o faturamento da sua empresa já no primeiro mês? 🚀" }]);
          setIsTyping(true);
          
          // Button after typing
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: 3, text: "Entrar em contato", isButton: true }]);
          }, 2000);
        }, 3000);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Olá! Gostaria de conhecer mais sobre a plataforma Otmizy.ai");
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          size="sm"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl z-50 overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
              IZ
            </div>
            <div>
              <p className="font-semibold">Izy</p>
              <p className="text-xs opacity-90">Assistente Otmizy.ai</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className="mb-3 animate-slideUp">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    IZ
                  </div>
                  <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-64">
                    {message.isButton ? (
                      <Button
                        onClick={handleWhatsAppRedirect}
                        className="w-full bg-green-500 hover:bg-green-600 text-white text-sm"
                        size="sm"
                      >
                        {message.text}
                      </Button>
                    ) : (
                      <p className="text-gray-800 text-sm">{message.text}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="mb-3">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    IZ
                  </div>
                  <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-100 border-t">
            <p className="text-xs text-gray-500 text-center">
              Powered by WhatsApp
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppWidget;
