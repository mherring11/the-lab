import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp, updateUser } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Sign up the user
            const { data, error } = await signUp({ email, password });
            if (error)
                throw error;
            // Calculate trial end date (14 days from now)
            const trialEndDate = new Date();
            trialEndDate.setDate(trialEndDate.getDate() + 14);
            // Format as ISO string for database storage
            const trialEndDateString = trialEndDate.toISOString();
            // Update user with trial info
            if (data?.user) {
                await updateUser({
                    id: data.user.id,
                    email: data.user.email,
                    role: 'user',
                    trialEndDate: trialEndDateString,
                    hasActiveSubscription: false,
                    // Add any other user info you want to save
                    name: name || '',
                });
            }
            // Redirect to payment page
            navigate('/payment-required', {
                state: {
                    trialInfo: {
                        isActive: true,
                        daysLeft: 14
                    }
                }
            });
        }
        catch (error) {
            console.error('Error signing up:', error);
            setError(error.message);
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("div", { className: "flex justify-center", children: _jsx(Link, { to: "/", children: _jsx("div", { className: "cursor-pointer", children: _jsx(Logo, {}) }) }) }), _jsx("h2", { className: "mt-6 text-center text-3xl font-display font-bold text-gray-900", children: "Create your account" }), _jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: ["Already have an account?", ' ', _jsx(Link, { to: "/login", className: "font-medium text-yellow-500 hover:text-yellow-600", children: "Sign in" })] })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsxs("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [error && (_jsxs("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-start", children: [_jsx(AlertCircle, { className: "h-5 w-5 mr-2 flex-shrink-0 mt-0.5" }), _jsx("span", { children: error })] })), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Full Name" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "name", name: "name", type: "text", autoComplete: "name", required: true, value: name, onChange: (e) => setName(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email address" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "password", name: "password", type: "password", autoComplete: "new-password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirm-password", className: "block text-sm font-medium text-gray-700", children: "Confirm Password" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "confirm-password", name: "confirmPassword", type: "password", autoComplete: "new-password", required: true, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" }) })] }), _jsx("div", { children: _jsx("button", { type: "submit", disabled: loading, className: `w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black ${loading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400'}`, children: loading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Creating account..."] })) : ('Sign up') }) })] }), _jsx("div", { className: "mt-6 bg-blue-50 border border-blue-200 rounded-md p-4", children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Zap, { className: "h-5 w-5 text-blue-600" }) }), _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-sm font-medium text-blue-800", children: "Free Trial Included" }), _jsx("div", { className: "mt-2 text-sm text-blue-700", children: _jsx("p", { children: "Sign up today and get a 7-day free trial with full access to all premium features!" }) })] })] }) })] }) })] }));
}
