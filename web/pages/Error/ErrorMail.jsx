import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorMail.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isProfileStatus')
    navigate('/auth')
  }
  return (
    <div className="error-wrapper">
      <div className="error-card">
        <div className="error-icon">⚠️</div>
        <h1 className="error-message">
          Inorder to access profile you need to create account as a provider by registering from same mail id!
        </h1>
        <p className="error-subtext">
          May be your Provider profile and User account emails don't match.
        </p>
        <div className="button-div">
        <button className="error-btn" onClick={handleLogout}>
          Go to Login
        </button>
        <button className="error-btn" onClick={() => navigate('/provider')}>
          Go to home
        </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;