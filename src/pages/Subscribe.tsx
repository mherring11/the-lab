import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

const Subscribe = () => {
  // @ts-ignore - Working around type issues
  const user = useAppStore(state => state.user);
  // @ts-ignore - Working around type issues
  const setUser = useAppStore(state => state.setUser);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/dashboard';
  
  const handleSubscribe = () => {
    // Mock subscription logic - update user with subscription
    if (user) {
      setUser({
        ...user,
        hasActiveSubscription: true,
        trialEndDate: null // Remove trial if it exists
      });
      
      // Navigate back to the protected page they were trying to access
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Subscribe to The Lab
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Get full access to all premium features
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <h3 className="text-lg font-medium text-blue-900">
                Premium Membership
              </h3>
              <p className="mt-2 text-sm text-blue-700">
                Subscribe to access all premium features including personal training, AI workout plans, and exclusive content.
              </p>
              <ul className="mt-3 list-disc list-inside text-sm text-blue-700">
                <li>Unlimited workout plans</li>
                <li>AI-generated training</li>
                <li>Access to all premium content</li>
                <li>Personal coaching features</li>
              </ul>
              <div className="mt-4 text-center">
                <span className="text-2xl font-bold text-blue-900">$10</span>
                <span className="text-blue-700">/month</span>
              </div>
            </div>

            <button
              onClick={handleSubscribe}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Subscribe Now
            </button>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <Link
                  to="/dashboard"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;