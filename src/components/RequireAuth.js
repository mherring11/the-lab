import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner'; // Make sure you have this component
const RequireAuth = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    // Add subscription check
    const hasActiveSubscription = user?.hasActiveSubscription;
    const trialEndDate = user?.trialEndDate ? new Date(user.trialEndDate) : null;
    const isTrialActive = trialEndDate ? trialEndDate > new Date() : false;
    if (loading) {
        return _jsx(LoadingSpinner, {});
    }
    if (!user) {
        // Redirect to login if not logged in
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    // Check if subscription is required
    if (!hasActiveSubscription && !isTrialActive) {
        // Redirect to payment page
        return _jsx(Navigate, { to: "/payment-required", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default RequireAuth;
