import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// This is a stub component that just redirects to the Subscribe page
const PaymentRequired = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Redirect to the Subscribe page with the same state
    navigate('/subscribe', { state: location.state, replace: true });
  }, [navigate, location.state]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Redirecting...
        </h2>
      </div>
    </div>
  );
};

export default PaymentRequired;