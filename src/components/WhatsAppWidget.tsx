
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean; isButton?: boolean }>>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const agentName = 'Izy';
  const agentInitials = 'IZ';

  const messageSequence = [
    { text: 'Olá, como você está?', delay: 1000 },
    { text: 'O que acha de conhecer nossa plataforma e aumentar o faturamento da sua empresa já no primeiro mês?', delay: 2000 },
    { text: 'Entrar em contato', delay: 1500, isButton: true }
  ];

  useEffect(() => {
    if (isOpen && currentStep < messageSequence.length) {
      const timer = setTimeout(() => {
        const currentMessage = messageSequence[currentStep];
        
        if (currentMessage.isButton) {
          setMessages(prev => [...prev, { text: currentMessage.text, isBot: true, isButton: true }]);
        } else {
          // Show typing indicator first
          setMessages(prev => [...prev, { text: '...', isBot: true }]);
          
          setTimeout(() => {
            setMessages(prev => [
              ...prev.slice(0, -1), // Remove typing indicator
              { text: currentMessage.text, isBot: true }
            ]);
          }, 1000);
        }
        
        setCurrentStep(prev => prev + 1);
      }, messageSequence[currentStep].delay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStep]);

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent('Olá! Gostaria de conhecer mais sobre a plataforma Otmizy.ai');
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const openChat = () => {
    setIsOpen(true);
    setMessages([]);
    setCurrentStep(0);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={openChat}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Abrir WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-2xl z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">{agentInitials}</span>
              </div>
              <div>
                <div className="font-semibold">{agentName}</div>
                <div className="text-xs opacity-90">Online</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 h-60 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className="mb-3">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {agentInitials}
                  </div>
                  <div className="flex-1">
                    {message.isButton ? (
                      <Button
                        onClick={handleWhatsAppRedirect}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-4 rounded-lg"
                      >
                        {message.text}
                      </Button>
                    ) : (
                      <div className="bg-white p-3 rounded-lg shadow-sm border max-w-xs">
                        {message.text === '...' ? (
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-800">{message.text}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              Powered by WhatsApp
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppWidget;
