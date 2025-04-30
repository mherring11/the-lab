import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../store';
// @ts-ignore - Fix import
import { AppState } from '../types';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  // @ts-ignore - Fix type error
  const user = useAppStore((state: AppState) => state.user);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== 'admin' && user.role !== 'owner') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default AdminRoute;