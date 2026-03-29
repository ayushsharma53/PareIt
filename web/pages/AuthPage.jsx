import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ui/Toast';
import './AuthPage.css';

const AuthPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        toast(`${isLogin ? 'Login' : 'Signup'} Successful!`, "success");
        
        if (data.role === "provider") {
          navigate('/provider');
        } else if (data.role === "admin") {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        toast(data.message || 'Something went wrong', "error");
      }
    } catch (error) {
      toast('Something went wrong', "error");
      console.error('Error:', error);
    }
  };

  return (
    <div className="ap-auth-container">
      <div className="ap-auth-card">
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="ap-subtitle">
          {isLogin 
            ? 'Enter your details to login and access your profile.' 
            : 'Fill in the form to join our community and access all features.'}
        </p>

        <form className="ap-auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="ap-input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="John Doe" 
                required 
                className='ap-input-field' 
                onChange={handleChange}
              />
            </div>
          )}
          
          <div className="ap-input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="email@example.com" 
              className='ap-input-field' 
              required 
              onChange={handleChange}
            />
          </div>

          <div className="ap-input-group">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="••••••••"  
              className='ap-input-field' 
              required 
              onChange={handleChange}
            />
          </div>

          <div className='ap-input-group'>
            <label>Select Role</label>
            <select name="role" className="ap-input-field" onChange={handleChange} required>
              <option value="">-- Please Select --</option>
              <option value="customer">Customer</option>
              <option value="provider">Provider</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="ap-primary-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="ap-toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <span onClick={toggleMode}>{isLogin ? 'Sign Up' : 'Login'}</span>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;