import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './sidebarCustomer.css';
import logo from '../../assets/Logo.png';
import { useToast } from '../ui/Toast';

const Sidebar = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Retrieve the userId for the profile link
  const userId = localStorage.getItem('userId');

  // Define Customer-specific routes
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Bookings', path: '/bookings' },
    { name: 'Chats', path: '/chats-customer' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    toast("Logged out successfully", "error");
    navigate('/auth');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo-section" onClick={() => navigate('/customer' || '/')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className="logo-icon" />
          <span className="logo-text">PareIt</span>
        </div>
        
        <nav className="nav-menu">
          {navItems.map((item) => (
            <div 
              key={item.name}
              // Dynamically apply the active class based on the current URL
              className={`nav-item ${location.pathname === item.path ? 'nav-item-active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {/* Using a generic icon class similar to your Sitter sidebar */}
              <span className="icon-home">{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        {isLoggedIn ? (
          <button className="btn-logout" onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <button className="btn-login" onClick={() => navigate('/auth')}>Log in</button>
            <button className="btn-signup" onClick={() => navigate('/auth')}>Sign up</button>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;