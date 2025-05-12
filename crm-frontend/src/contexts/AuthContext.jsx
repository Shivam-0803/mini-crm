import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    try {
      console.log('Checking authentication...');
      // Use our API instance with credentials for authentication check
      const response = await axios.get('https://mini-crm-backend-3ri2.onrender.com/auth/me', { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Auth response:', response.data);

      if (response.data && response.data.user) {
        console.log('Auth check successful:', response.data.user);
        setUser(response.data.user);
        
        // Store user info for future use
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setError(null);
        
        // Redirect to dashboard if on login page
        if (location.pathname === '/' || location.pathname === '/login') {
          navigate('/dashboard');
        }
      } else {
        console.log('Auth check returned no user');
        setUser(null);
        localStorage.removeItem('user');
        
        // Only redirect to login if not already there
        if (location.pathname !== '/' && location.pathname !== '/login') {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Auth check error:', error.response || error);
      setUser(null);
      localStorage.removeItem('user');
      
      if (error.response?.status === 401) {
        console.log('User is not authenticated');
        if (location.pathname !== '/' && location.pathname !== '/login') {
          navigate('/');
        }
      } else {
        setError('Authentication check failed');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to get user from localStorage first for faster loading
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    
    // Check authentication status when component mounts
    // Don't check if on login page to avoid redirect loops
    if (location.pathname !== '/login' && location.pathname !== '/') {
      checkAuth();
    } else {
      setLoading(false);
    }
    
    // Check for OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get('auth_success');

    if (authSuccess === 'true') {
      console.log('Detected successful OAuth callback');
      checkAuth();
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.pathname]);

  const login = () => {
    try {
      console.log('Initiating Google OAuth login...');
      // Redirect to Google OAuth endpoint
      window.location.href = 'https://mini-crm-backend-3ri2.onrender.com/auth/google';
    } catch (error) {
      console.error('Login redirect failed:', error);
      setError('Login failed');
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      // Clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Reset state
      setUser(null);
      setError(null);
      
      // Redirect to login page
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Logout failed');
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
