import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner'; // Make sure you have this component

// Update your User interface to include subscription fields
interface User {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  role?: string;
  hasActiveSubscription?: boolean; // Add this
  trialEndDate?: string; // Add this
  // other properties your user might have
}

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Add subscription check
  const hasActiveSubscription = user?.hasActiveSubscription;
  const trialEndDate = user?.trialEndDate ? new Date(user.trialEndDate) : null;
  const isTrialActive = trialEndDate ? trialEndDate > new Date() : false;
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if subscription is required
  if (!hasActiveSubscription && !isTrialActive) {
    // Redirect to payment page
    return <Navigate to="/payment-required" replace />;
  }
  
  return <>{children}</>;
};

export default RequireAuth;