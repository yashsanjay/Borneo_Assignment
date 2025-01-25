import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '1rem' }}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
