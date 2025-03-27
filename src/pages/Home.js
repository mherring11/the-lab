import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Home.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Import site-wide components
import Header from '../components/Header';
import Footer from '../components/Footer';
// Import the sections you want to display on the home page
import Hero from '../components/Hero';
import TheLabExperience from '../components/TheLabExperience';
import CTASection from '../components/CTASection';
import AboutSection from '../components/AboutSection';
import StepSystem from '../components/StepSystem';
import ServicesPage from '../components/ServicesPage';
import AppointmentForm from '../components/AppointmentForm';
export default function Home() {
    const { hash } = useLocation();
    useEffect(() => {
        if (hash) {
            // Delay scrolling slightly to ensure all sections have rendered
            setTimeout(() => {
                const id = hash.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    }, [hash]);
    return (_jsxs("div", { className: "min-h-screen", children: [_jsx(Header, {}), _jsxs("main", { children: [_jsx(Hero, {}), _jsx(TheLabExperience, {}), _jsx(CTASection, {}), _jsx(AboutSection, {}), _jsx(StepSystem, {}), _jsx(ServicesPage, {}), _jsx(AppointmentForm, {})] }), _jsx(Footer, {})] }));
}
