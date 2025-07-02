import React from 'react';

const Cancel = () => {
  return (
    <div className="cancel-page">
      <div className="cancel-container">
        <div className="cancel-icon">❌</div>
        <h1>Pagamento Cancelado</h1>
        <p>
          Não se preocupe! Você pode tentar novamente a qualquer momento. 
          Estamos aqui para ajudar caso tenha alguma dúvida.
        </p>
        <div className="cancel-actions">
          <button 
            onClick={() => window.location.href = '/planos'}
            className="primary-btn"
          >
            Ver Planos Novamente
          </button>
          <button 
            onClick={() => window.location.href = '/contato'}
            className="secondary-btn"
          >
            Falar com Suporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;