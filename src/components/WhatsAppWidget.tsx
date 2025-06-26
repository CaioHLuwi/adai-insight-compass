
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{id: number, text: string, isBot: boolean, isButton?: boolean}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);

  const agentName = "Izy";
  const agentAvatar = "IZ"; // First and last letters

  const messageSequence = [
    { text: "Olá, como você está", delay: 1000 },
    { text: "O que acha que conhecer nossa plataforma e aumentar o faturamento da sua empresa já no primeiro mês?", delay: 2000 },
    { text: "Entrar em contato", delay: 1500, isButton: true }
  ];

  useEffect(() => {
    if (isOpen && step < messageSequence.length) {
      const currentMessage = messageSequence[step];
      
      const timer = setTimeout(() => {
        setIsTyping(true);
        
        const typingTimer = setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now(),
            text: currentMessage.text,
            isBot: true,
            isButton: currentMessage.isButton
          }]);
          setIsTyping(false);
          setStep(prev => prev + 1);
        }, 1500);

        return () => clearTimeout(typingTimer);
      }, currentMessage.delay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, step]);

  const handleWhatsAppRedirect = () => {
    const message = "Olá! Gostaria de conhecer mais sobre a plataforma Otmizy.ai";
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const resetChat = () => {
    setMessages([]);
    setStep(0);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-yellow-500 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <img 
                  src="/lovable-uploads/a7abf8a9-3e50-41f8-9f5e-3e7949379468.png" 
                  alt="Izy Avatar" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-white">{agentName}</h3>
                <p className="text-xs text-yellow-100">Agente Otmizy.ai</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                resetChat();
              }}
              className="text-white hover:text-yellow-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 max-h-64 overflow-y-auto bg-yellow-50">
            {messages.map((message) => (
              <div key={message.id} className="mb-3">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <img 
                      src="/lovable-uploads/a7abf8a9-3e50-41f8-9f5e-3e7949379468.png" 
                      alt="Izy" 
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    {message.isButton ? (
                      <button
                        onClick={handleWhatsAppRedirect}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors w-full"
                      >
                        {message.text}
                      </button>
                    ) : (
                      <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm">
                        <p className="text-sm text-gray-800">{message.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-2 mb-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <img 
                    src="/lovable-uploads/a7abf8a9-3e50-41f8-9f5e-3e7949379468.png" 
                    alt="Izy" 
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) resetChat();
        }}
        className="w-14 h-14 bg-yellow-500 hover:bg-yellow-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
