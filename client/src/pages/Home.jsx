import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  };

  const linkStyle = {
    margin: '10px',
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '18px',
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome to the App</h1>
      <div>
        <Link to="/login" style={linkStyle}>
          Login
        </Link>
        <span> | </span>
        <Link to="/signup" style={linkStyle}>
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;
