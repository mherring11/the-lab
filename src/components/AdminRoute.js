import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../store';
const AdminRoute = ({ children }) => {
    // @ts-ignore - Fix type error
    const user = useAppStore((state) => state.user);
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (user.role !== 'admin' && user.role !== 'owner') {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default AdminRoute;
