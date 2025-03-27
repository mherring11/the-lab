import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
// Import your page components
import Home from './pages/Home';
import CampPage from './pages/CampPage';
export default function App() {
    return (_jsxs(_Fragment, { children: [_jsx(ScrollToTop, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/camp", element: _jsx(CampPage, {}) })] })] }));
}
