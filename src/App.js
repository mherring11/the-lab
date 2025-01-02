import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from './components/Header';
import Hero from './components/Hero';
import TheLabExperience from './components/TheLabExperience';
import ServicesPage from './components/ServicesPage';
import CTASection from './components/CTASection';
import AboutSection from './components/AboutSection';
import StepSystem from './components/StepSystem';
import AppointmentForm from './components/AppointmentForm';
import Footer from './components/Footer';
export default function App() {
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("main", { children: [_jsx(Hero, {}), _jsx(TheLabExperience, {}), _jsx(CTASection, {}), _jsx(AboutSection, {}), _jsx(StepSystem, {}), _jsx(ServicesPage, {}), _jsx(AppointmentForm, {})] }), _jsx(Footer, {})] }));
}
