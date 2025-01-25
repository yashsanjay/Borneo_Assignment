import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';

const Admin = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return <AdminDashboard />;
};

export default Admin;
