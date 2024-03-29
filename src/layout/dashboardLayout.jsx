import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function DashboardLayout() {
  const { user } = useAuth();

  console.log(user);

  if (!user) {
    return <Navigate to="/auth" />;
  }
  return <Outlet />;
}

export default DashboardLayout;
