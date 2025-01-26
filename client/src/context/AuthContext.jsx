// context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  // Using the useNavigate hook to navigate programmatically

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1]));
      setUser(userData);
      if (userData.role === 'Admin') {
        navigate('/admin');  // Redirect to /admin if the user is an admin
      }
    }
  }, [navigate]); // Make sure to use navigate in useEffect as a dependency

  const login = (token) => {
    localStorage.setItem('token', token);
    const userData = JSON.parse(atob(token.split('.')[1]));
    setUser(userData);
    if (userData.role === 'Admin') {
      navigate('/admin');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
