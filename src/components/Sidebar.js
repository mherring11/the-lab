import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store';
import Logo from './Logo';
import { HomeIcon, ChartBarIcon, UserGroupIcon, CalendarIcon, ChatBubbleLeftEllipsisIcon, CogIcon, BoltIcon, FireIcon, ClipboardDocumentListIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
const Sidebar = () => {
    // @ts-ignore - Fix type issues
    const user = useAppStore(state => state.user);
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
        { name: 'Workouts', path: '/workouts', icon: FireIcon },
        { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
        { name: 'Training Log', path: '/workout-logger', icon: ClipboardDocumentListIcon },
        { name: 'Performance', path: '/performance-metrics', icon: BoltIcon },
        { name: 'Community', path: '/community', icon: UserGroupIcon },
        { name: 'Challenges', path: '/challenges', icon: CalendarIcon },
        { name: 'Chat', path: '/chat', icon: ChatBubbleLeftEllipsisIcon },
    ];
    return (_jsx("div", { className: "bg-white text-gray-800 h-screen fixed left-0 top-0 overflow-y-auto shadow-lg w-64", children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsx("div", { className: "p-4 flex items-center", children: _jsx(Link, { to: "/home", className: "flex items-center", children: _jsx(Logo, { asLink: true }) }) }), _jsx("nav", { className: "mt-6 flex-grow", children: _jsx("ul", { className: "space-y-1 px-2", children: navItems.map((item) => (_jsx("li", { children: _jsxs(Link, { to: item.path, className: `flex items-center px-4 py-3 hover:bg-gray-100 rounded-md transition-colors ${isActive(item.path) ? 'bg-blue-100 text-blue-700' : ''}`, children: [_jsx(item.icon, { className: "h-5 w-5" }), _jsx("span", { className: "ml-3", children: item.name })] }) }, item.path))) }) }), user?.role === 'admin' && (_jsxs("div", { className: "mt-6 mb-2 px-4", children: [_jsx("p", { className: "text-xs uppercase text-gray-500 font-semibold mb-2", children: "Administration" }), _jsxs("ul", { className: "space-y-1 px-2", children: [_jsx("li", { children: _jsxs(Link, { to: "/admin", className: `flex items-center px-4 py-3 hover:bg-gray-100 rounded-md transition-colors ${isActive('/admin') ? 'bg-blue-100 text-blue-700' : ''}`, children: [_jsx(CogIcon, { className: "h-5 w-5" }), _jsx("span", { className: "ml-3", children: "Admin Dashboard" })] }) }), _jsx("li", { children: _jsxs(Link, { to: "/admin/users", className: `flex items-center px-4 py-3 hover:bg-gray-100 rounded-md transition-colors ${isActive('/admin/users') ? 'bg-blue-100 text-blue-700' : ''}`, children: [_jsx(UserGroupIcon, { className: "h-5 w-5" }), _jsx("span", { className: "ml-3", children: "Manage Users" })] }) }), _jsx("li", { children: _jsxs(Link, { to: "/admin/analytics", className: `flex items-center px-4 py-3 hover:bg-gray-100 rounded-md transition-colors ${isActive('/admin/analytics') ? 'bg-blue-100 text-blue-700' : ''}`, children: [_jsx(ChartBarIcon, { className: "h-5 w-5" }), _jsx("span", { className: "ml-3", children: "Platform Analytics" })] }) })] })] })), _jsx("div", { className: "mt-auto border-t border-gray-200 p-4", children: _jsxs("div", { className: "flex flex-col space-y-3", children: [_jsxs(Link, { to: "/settings", className: "flex items-center", children: [_jsx("div", { className: "h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center", children: user?.avatar ? (_jsx("img", { src: user.avatar, alt: "Profile", className: "h-8 w-8 rounded-full" })) : (_jsx("span", { className: "text-sm font-medium text-blue-700", children: user?.name?.charAt(0) || 'U' })) }), _jsxs("div", { className: "ml-3 flex-grow", children: [_jsx("p", { className: "text-sm font-medium text-gray-800", children: user?.name || 'User' }), _jsx("p", { className: "text-xs text-gray-500", children: user?.email || '' })] }), _jsx(CogIcon, { className: "h-4 w-4 text-gray-400" })] }), _jsxs("button", { onClick: () => useAppStore.getState().logout(), className: "flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors", children: [_jsx(ArrowRightOnRectangleIcon, { className: "h-5 w-5" }), _jsx("span", { className: "ml-3", children: "Logout" })] })] }) })] }) }));
};
export default Sidebar;
