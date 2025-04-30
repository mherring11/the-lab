import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, Zap, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import Logo from './Logo'; // Import your Logo component
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn, signUp, user } = useAuth();
    // Check if we're on the signup page
    useEffect(() => {
        setIsSignup(location.pathname === '/signup');
    }, [location.pathname]);
    // Get the page user was trying to access
    const from = location.state?.from?.pathname || '/dashboard';
    // If user is already logged in, redirect to dashboard
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isSignup) {
                // Validate signup form
                if (password !== confirmPassword) {
                    setError('Passwords do not match');
                    setLoading(false);
                    return;
                }
                // Register new user
                const { error } = await signUp({ email, password });
                if (error)
                    throw error;
                navigate('/dashboard');
            }
            else {
                // Login existing user
                const { error } = await signIn({ email, password });
                if (error)
                    throw error;
                navigate(from);
            }
        }
        catch (error) {
            console.error('Authentication error:', error);
            setError(error.message || 'Authentication failed. Please try again.');
        }
        finally {
            setLoading(false);
        }
    }
    async function handlePasswordReset(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            if (error)
                throw error;
            setResetEmailSent(true);
        }
        catch (error) {
            console.error('Password reset error:', error);
            setError(error.message || 'Failed to send password reset email. Please try again.');
        }
        finally {
            setLoading(false);
        }
    }
    // Render password reset form
    if (showForgotPassword) {
        return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("div", { className: "flex justify-center", children: _jsx(Link, { to: "/", children: _jsxs("div", { className: "cursor-pointer", children: [_jsx(Logo, {}), " "] }) }) }), _jsx("h2", { className: "mt-6 text-center text-3xl font-display font-bold text-gray-900", children: "Reset your password" }), _jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Enter your email address and we'll send you a link to reset your password." })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsxs("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [error && (_jsxs("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-start", children: [_jsx(AlertCircle, { className: "h-5 w-5 mr-2 flex-shrink-0 mt-0.5" }), _jsx("span", { children: error })] })), resetEmailSent ? (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm", children: "Check your email for a link to reset your password." }), _jsx("button", { onClick: () => {
                                            setShowForgotPassword(false);
                                            setResetEmailSent(false);
                                        }, className: "text-primary-600 hover:text-primary-500 font-medium", children: "Return to login" })] })) : (_jsxs("form", { onSubmit: handlePasswordReset, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email address" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" }) })] }), _jsx("div", { children: _jsx("button", { type: "submit", disabled: loading || !email, className: `w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading || !email
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'}`, children: loading ? 'Sending...' : 'Send reset link' }) }), _jsx("div", { className: "text-center", children: _jsxs("button", { type: "button", onClick: () => setShowForgotPassword(false), className: "inline-flex items-center text-sm text-primary-600 hover:text-primary-500", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }), "Back to login"] }) })] }))] }) })] }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("div", { className: "flex justify-center", children: _jsx(Link, { to: "/", children: _jsxs("div", { className: "cursor-pointer", children: [_jsx(Logo, {}), " "] }) }) }), _jsx("h2", { className: "mt-6 text-center text-3xl font-display font-bold text-gray-900", children: isSignup ? 'Create your account' : 'Sign in' }), _jsxs("p", { className: "mt-2 text-center text-sm text-gray-600", children: [isSignup ? 'Already have an account? ' : 'Don\'t have an account? ', _jsx(Link, { to: isSignup ? '/login' : '/signup', className: "font-medium text-primary-600 hover:text-primary-500", children: isSignup ? 'Sign in' : 'Create a new account' })] })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsxs("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [error && (_jsxs("div", { className: "mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-start", children: [_jsx(AlertCircle, { className: "h-5 w-5 mr-2 flex-shrink-0 mt-0.5" }), _jsx("span", { children: error })] })), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [isSignup && (_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Full Name" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "name", name: "name", type: "text", autoComplete: "name", value: name, onChange: (e) => setName(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" }) })] })), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email address" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "password", name: "password", type: "password", autoComplete: isSignup ? "new-password" : "current-password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" }) })] }), isSignup && (_jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700", children: "Confirm Password" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "confirmPassword", name: "confirmPassword", type: "password", autoComplete: "new-password", required: true, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" }) })] })), !isSignup && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "remember-me", name: "remember-me", type: "checkbox", className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" }), _jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-900", children: "Remember me" })] }), _jsx("div", { className: "text-sm", children: _jsx("button", { type: "button", onClick: () => setShowForgotPassword(true), className: "font-medium text-primary-600 hover:text-primary-500", children: "Forgot your password?" }) })] })), _jsx("div", { children: _jsx("button", { type: "submit", disabled: loading, className: `w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400'}`, children: loading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), isSignup ? 'Creating account...' : 'Signing in...'] })) : (isSignup ? 'Sign up' : 'Sign in') }) })] }), isSignup && (_jsx("div", { className: "mt-6 bg-blue-50 border border-blue-200 rounded-md p-4", children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Zap, { className: "h-5 w-5 text-blue-600" }) }), _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-sm font-medium text-blue-800", children: "Free Trial Included" }), _jsx("div", { className: "mt-2 text-sm text-blue-700", children: _jsx("p", { children: "Sign up today and get a 7-day free trial with full access to all premium features!" }) })] })] }) }))] }) })] }));
}
