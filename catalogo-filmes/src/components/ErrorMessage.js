import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Ocorreu um erro</h3>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="error-retry-btn">
          Tentar novamente
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;