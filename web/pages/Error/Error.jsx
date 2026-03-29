import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

const NotFoundPage = () => {
  return (
    <div className="nf-container">
      <div className="nf-content">
        <h1 className="nf-error-code">404</h1>
        <div className="nf-divider"></div>
        <h2 className="nf-title">Page Not Found</h2>
        <p className="nf-description">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="nf-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;