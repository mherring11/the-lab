import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarClock } from 'lucide-react';
import { useAppStore } from '../store';
import { differenceInDays } from 'date-fns';
const TrialStatusIndicator = () => {
    const user = useAppStore(state => state.user);
    // Skip for admin/owner or if user has subscription
    if (!user || user.role === 'admin' || user.role === 'owner' || user.hasActiveSubscription) {
        return null;
    }
    // Calculate trial status
    const trialEndDate = user.trialEndDate ? new Date(user.trialEndDate) : null;
    const isTrialActive = trialEndDate && trialEndDate > new Date();
    const daysLeft = trialEndDate ? Math.max(0, differenceInDays(trialEndDate, new Date())) : 0;
    if (!isTrialActive)
        return null;
    return (_jsxs("div", { className: "flex items-center mr-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm", children: [_jsx(CalendarClock, { className: "w-4 h-4 mr-1" }), _jsxs("span", { children: ["Trial: ", _jsx("b", { children: daysLeft }), " days left"] })] }));
};
export default TrialStatusIndicator;
