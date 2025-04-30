import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Calendar, User } from 'lucide-react';
export default function ChallengeCard({ challenge, onClick }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };
    const getTypeColors = () => {
        switch (challenge.type) {
            case 'sprint':
                return 'bg-blue-50 text-blue-700';
            case 'strength':
                return 'bg-red-50 text-red-700';
            default:
                return 'bg-purple-50 text-purple-700';
        }
    };
    return (_jsx("div", { className: "border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white", onClick: onClick, children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: challenge.title }), _jsx("span", { className: `px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColors()}`, children: challenge.type })] }), _jsx("p", { className: "mt-1 text-sm text-gray-500 line-clamp-2", children: challenge.description }), _jsxs("div", { className: "mt-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [_jsx(Calendar, { className: "h-4 w-4 mr-1" }), formatDate(challenge.startDate), " - ", formatDate(challenge.endDate)] }), _jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [_jsx(User, { className: "h-4 w-4 mr-1" }), challenge.participants.length] })] })] }) }));
}
