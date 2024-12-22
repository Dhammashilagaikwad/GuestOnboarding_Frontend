import React from 'react';

const ThankYou = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-gradient" 
         style={{ 
           background: 'linear-gradient(135deg, #6DD5FA, #2980B9)' 
         }}>
      <div className="text-center bg-white p-5 rounded shadow-lg" style={{ maxWidth: '500px' }}>
        <h1 className="display-4 text-primary fw-bold mb-4">Thank You!</h1>
        <p className="text-muted fs-5 mb-4">We appreciate your effort and look forward to seeing you again.</p>
        
       
        
        <button
          onClick={() => (window.location.href = '/')}
          className="btn btn-primary btn-lg shadow-sm px-5"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
