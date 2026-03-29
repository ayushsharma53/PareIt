import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added useLocation
import './sidebarSitter.css';
import logo from '../../assets/Logo.png'
import { useToast } from '../ui/Toast';

const Sidebar = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation(); // Helps us track the current URL
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userId = localStorage.getItem('userId');
  
  // Define your routes mapping
  const navItems = [
    { name: 'Home', path: '/provider' },
    { name: 'Requests', path: '/requests' },
    { name: 'Chats', path: '/chats-provider' },
    { name: 'Profile', path: userId ? `/profile/${userId}` : '/auth'}
  ]

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isProfileStatus')
    setIsLoggedIn(false);
    toast("Logged out successfully", "error");
    navigate('/auth');
  };

  // Helper function to handle navigation and state
  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo-section" onClick={() => navigate('/provider')} style={{cursor: 'pointer'}}>
          <img src={logo} alt="Logo" className="logo-icon" />
          <span className="logo-text">PareIt</span>
        </div>
        
        <nav className="nav-menu">
          {navItems.map((item) => (
            <div 
              key={item.name}
              // Check if the current URL matches the item path to set active class
              className={`nav-item ${location.pathname === item.path ? 'nav-item-active' : ''}`}
              onClick={() => handleTabClick(item.path)}
            >
              <span className={`icon-home`}>{item.name}</span>
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