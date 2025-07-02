import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    if (sessionId) {
      // Opcional: Buscar detalhes da sessão do seu backend
      // para exibir informações específicas da compra
      console.log('Session ID:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h1>Pagamento Realizado com Sucesso!</h1>
        <p>
          Obrigado por escolher a Otmizy.ai! Seu plano foi ativado e você já pode 
          acessar todas as funcionalidades do seu dashboard.
        </p>
        <div className="success-actions">
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="primary-btn"
          >
            Acessar Dashboard
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className="secondary-btn"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;