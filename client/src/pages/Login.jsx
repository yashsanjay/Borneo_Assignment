import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Login and get the token
      console.log("helloo");
      
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token;

      // Store the token and decode user information
      login(token);

      // Decode the token to get the user's role
      const userData = JSON.parse(atob(token.split('.')[1]));

      // Redirect based on role
      if (userData.role === 'Admin') {
        navigate('/admin'); // Admin Dashboard
      } else {
        navigate('/loggedIn'); // Default Home
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
