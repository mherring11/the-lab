import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { X, Calendar } from 'lucide-react';
const TrialManagementModal = ({ isOpen, onClose, user, onSave }) => {
    const [loading, setLoading] = useState(false);
    const [trialEndDate, setTrialEndDate] = useState(() => {
        // Initialize with user's current trial end date or 14 days from now
        return user?.trialEndDate
            ? new Date(user.trialEndDate)
            : addDays(new Date(), 14);
    });
    if (!isOpen || !user)
        return null;
    const handleQuickSelect = (days) => {
        setTrialEndDate(addDays(new Date(), days));
    };
    const handleSave = async () => {
        setLoading(true);
        try {
            await onSave(user.id, trialEndDate.toISOString());
            onClose();
        }
        catch (error) {
            console.error('Error updating trial:', error);
            alert('Failed to update trial period. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full", children: [_jsxs("div", { className: "bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Manage Trial Period" }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-500", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "px-4 py-5", children: [_jsxs("div", { className: "mb-5", children: [_jsxs("p", { className: "text-sm text-gray-500", children: [_jsx("span", { className: "font-medium text-gray-700", children: "User:" }), " ", user?.name, " (", user?.email, ")"] }), _jsxs("p", { className: "text-sm text-gray-500 mt-1", children: [_jsx("span", { className: "font-medium text-gray-700", children: "Current status:" }), " ", user?.hasActiveSubscription
                                            ? 'Active subscription'
                                            : user?.trialEndDate && new Date(user.trialEndDate) > new Date()
                                                ? `Trial ending on ${format(new Date(user.trialEndDate), 'MMM d, yyyy')}`
                                                : 'Trial expired'] })] }), _jsxs("div", { className: "mb-5", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Set Trial End Date" }), _jsxs("div", { className: "flex items-center", children: [_jsx(Calendar, { size: 20, className: "text-gray-400 mr-2" }), _jsx("input", { type: "date", className: "shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md", value: format(trialEndDate, 'yyyy-MM-dd'), onChange: (e) => setTrialEndDate(new Date(e.target.value)) })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3 mb-5", children: [_jsx("button", { type: "button", onClick: () => handleQuickSelect(7), className: "inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50", children: "7 Days" }), _jsx("button", { type: "button", onClick: () => handleQuickSelect(14), className: "inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50", children: "14 Days" }), _jsx("button", { type: "button", onClick: () => handleQuickSelect(30), className: "inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50", children: "30 Days" })] }), user?.hasActiveSubscription && (_jsx("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-5", children: _jsx("div", { className: "flex", children: _jsx("div", { className: "ml-3", children: _jsx("p", { className: "text-sm text-yellow-700", children: "This user has an active subscription. Setting a trial end date will not affect their subscription status." }) }) }) })), _jsxs("div", { className: "flex justify-end space-x-3 mt-5", children: [_jsx("button", { type: "button", onClick: onClose, className: "inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleSave, disabled: loading, className: "inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50", children: loading ? 'Saving...' : 'Save Changes' })] })] })] }) }));
};
export default TrialManagementModal;
