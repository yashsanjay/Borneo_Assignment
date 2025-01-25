import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            {user.role === 'Admin' && <Link to="/admin">Admin Dashboard</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
