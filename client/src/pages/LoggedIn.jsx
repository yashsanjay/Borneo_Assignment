import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoggedIn() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/'); // Redirect to the homepage
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#007bff',
        }}
      >
        Congrats!
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          maxWidth: '600px',
          lineHeight: '1.5',
          marginBottom: '1.5rem',
        }}
      >
        You are successfully logged in. Enjoy your experience with our application!
      </p>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          color: '#fff',
          backgroundColor: '#dc3545',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#bd2130')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
      >
        Logout
      </button>
    </div>
  );
}
