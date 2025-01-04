import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Logo from './Logo';
import { Phone, Mail, Facebook, Instagram } from 'lucide-react';
import threadsLogo from '../assets/Threads Logo.png';
const services = [
    { text: 'Personal Training', id: 'personal-training' },
    { text: 'Bootcamp', id: 'bootcamp' },
];
const contactInfo = [
    { icon: Phone, text: '(210) 284-1082', href: 'tel:+12102841082' },
    { icon: Mail, text: 'contact@thelab210.com', href: 'mailto:contact@thelab210.com' },
];
const footerLinks = [
    { text: 'Terms of Service', href: '#' },
    { text: 'Privacy Policy', href: '#' },
    { text: 'Blog', href: '#blog' },
];
const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61571518048845' },
    { icon: Instagram, href: 'https://www.instagram.com/thelab210/' },
    { icon: threadsLogo, href: 'https://www.threads.net/@thelab210', isCustom: true },
];
const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};
export default function Footer() {
    return (_jsx("footer", { className: "bg-white pt-16 pb-8", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between text-center md:text-left mb-12", children: [_jsxs("div", { className: "flex flex-col items-center md:items-start", children: [_jsx("a", { href: "#top", "aria-label": "Go to homepage", children: _jsx(Logo, {}) }), _jsx("p", { className: "mt-4 text-gray-600", children: "Built in The Lab, Validated by Effort" })] }), _jsxs("div", { className: "flex flex-col items-center md:items-start mt-8 md:mt-0", children: [_jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "SERVICES" }), _jsx("ul", { className: "space-y-3", children: services.map(({ text, id }) => (_jsx("li", { children: _jsx("button", { onClick: () => scrollToSection(id), className: "text-gray-600 hover:text-primary focus:outline-none", children: text }) }, id))) })] }), _jsxs("div", { className: "flex flex-col items-center md:items-start mt-8 md:mt-0", children: [_jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "CONTACT US" }), _jsx("ul", { className: "space-y-3", children: contactInfo.map(({ icon: Icon, text, href }) => (_jsxs("li", { className: "flex items-center justify-center md:justify-start space-x-2", children: [_jsx(Icon, { className: "h-5 w-5 text-primary" }), _jsx("a", { href: href, className: "text-gray-600 hover:text-primary", children: text })] }, text))) })] })] }), _jsx("div", { className: "flex justify-center space-x-6 mb-8", children: socialLinks.map(({ icon, href, isCustom }) => (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "transform transition-transform hover:scale-125 focus:outline-none", "aria-label": "Social Media Link", children: isCustom ? (_jsx("img", { src: icon, alt: "Threads Logo", className: "h-6 w-6" })) : (React.createElement(icon, { className: 'h-6 w-6 text-black' })) }, href))) }), _jsxs("div", { className: "border-t border-gray-200 pt-8 flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between", children: [_jsxs("p", { className: "text-gray-500 text-sm text-center", children: ["\u00A9 ", new Date().getFullYear(), " The Lab | All rights reserved"] }), _jsx("div", { className: "flex space-x-6", children: footerLinks.map(({ text, href }) => (_jsx("a", { href: href, className: "text-sm text-gray-500 hover:text-primary", children: text }, text))) })] })] }) }));
}
