import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { X, Calendar, Mail, User, Shield } from 'lucide-react';
import { format } from 'date-fns';
const UserEditModal = ({ isOpen, onClose, user, onSave }) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        email: '',
        role: 'user',
        trialEndDate: null, // Add explicit type
        hasActiveSubscription: false,
    });
    useEffect(() => {
        if (user) {
            setUserData({
                id: user.id || '',
                name: user.name || '',
                email: user.email || '',
                role: user.role || 'user',
                trialEndDate: user.trialEndDate || null,
                hasActiveSubscription: user.hasActiveSubscription || false,
            });
        }
    }, [user]);
    if (!isOpen)
        return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(userData);
            onClose();
        }
        catch (error) {
            console.error('Error saving user:', error);
            alert('Failed to save user. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full", children: [_jsxs("div", { className: "bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: user?.id ? 'Edit User' : 'Add New User' }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-500", children: _jsx(X, { size: 20 }) })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "p-4 space-y-4", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Name" }), _jsxs("div", { className: "flex items-center", children: [_jsx(User, { size: 20, className: "text-gray-400 mr-2" }), _jsx("input", { type: "text", name: "name", required: true, className: "shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md", value: userData.name, onChange: (e) => setUserData({ ...userData, name: e.target.value }) })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), _jsxs("div", { className: "flex items-center", children: [_jsx(Mail, { size: 20, className: "text-gray-400 mr-2" }), _jsx("input", { type: "email", name: "email", required: true, className: "shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md", value: userData.email, onChange: (e) => setUserData({ ...userData, email: e.target.value }) })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Role" }), _jsxs("div", { className: "flex items-center", children: [_jsx(Shield, { size: 20, className: "text-gray-400 mr-2" }), _jsxs("select", { name: "role", className: "shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md", value: userData.role, onChange: (e) => setUserData({ ...userData, role: e.target.value }), children: [_jsx("option", { value: "user", children: "User" }), _jsx("option", { value: "admin", children: "Admin" }), _jsx("option", { value: "owner", children: "Owner" })] })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Trial End Date" }), _jsxs("div", { className: "flex items-center", children: [_jsx(Calendar, { size: 20, className: "text-gray-400 mr-2" }), _jsx("input", { type: "date", name: "trialEndDate", className: "shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md", value: userData.trialEndDate ? format(new Date(userData.trialEndDate), 'yyyy-MM-dd') : '', onChange: (e) => setUserData({
                                                        ...userData,
                                                        trialEndDate: e.target.value ? new Date(e.target.value).toISOString() : null, // Cast to null
                                                    }) })] }), _jsx("p", { className: "mt-1 text-xs text-gray-500", children: "Leave empty for no trial period" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "has-subscription", name: "hasActiveSubscription", type: "checkbox", className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded", checked: userData.hasActiveSubscription, onChange: (e) => setUserData({ ...userData, hasActiveSubscription: e.target.checked }) }), _jsx("label", { htmlFor: "has-subscription", className: "ml-2 block text-sm text-gray-900", children: "Has Active Subscription" })] })] }), _jsxs("div", { className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200", children: [_jsx("button", { type: "submit", disabled: loading, className: "w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50", children: loading ? 'Saving...' : 'Save' }), _jsx("button", { type: "button", onClick: onClose, className: "mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm", children: "Cancel" })] })] })] }) }));
};
export default UserEditModal;
