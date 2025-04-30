import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Subscribe to The Lab" }), _jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Get full access to all premium features" })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsx("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-blue-50 p-4 rounded-md border border-blue-200", children: [_jsx("h3", { className: "text-lg font-medium text-blue-900", children: "Premium Membership" }), _jsx("p", { className: "mt-2 text-sm text-blue-700", children: "Subscribe to access all premium features including personal training, AI workout plans, and exclusive content." }), _jsxs("ul", { className: "mt-3 list-disc list-inside text-sm text-blue-700", children: [_jsx("li", { children: "Unlimited workout plans" }), _jsx("li", { children: "AI-generated training" }), _jsx("li", { children: "Access to all premium content" }), _jsx("li", { children: "Personal coaching features" })] }), _jsxs("div", { className: "mt-4 text-center", children: [_jsx("span", { className: "text-2xl font-bold text-blue-900", children: "$10" }), _jsx("span", { className: "text-blue-700", children: "/month" })] })] }), _jsx("button", { onClick: handleSubscribe, className: "w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", children: "Subscribe Now" }), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-300" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-white text-gray-500", children: "Or" }) })] }), _jsx("div", { className: "mt-6", children: _jsx(Link, { to: "/dashboard", className: "w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Back to Dashboard" }) })] })] }) }) })] }));
};
export default Subscribe;
