import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
const AuthLayout = () => {
    const [expanded, setExpanded] = useState(true);
    // Ideally, this state should be lifted up from Sidebar or shared via context
    return (_jsxs("div", { className: "flex h-screen bg-gray-50", children: [_jsx(Sidebar, {}), _jsx("div", { className: `flex-1 overflow-auto ${expanded ? 'ml-64' : 'ml-20'}`, children: _jsx(Outlet, {}) })] }));
};
export default AuthLayout;
