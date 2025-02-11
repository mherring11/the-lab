import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Logo from './Logo';
import { Phone, Mail } from 'lucide-react';
const services = [
    { text: 'Personal Training', id: 'personal-training' },
    { text: 'Bootcamp', id: 'bootcamp' },
];
const exploreLinks = [
    { text: 'Terms of Service', href: 'https://www.freeprivacypolicy.com/live/59252fa8-f324-47b8-815b-64be2fac048f' },
    { text: 'Privacy Policy', href: 'https://www.freeprivacypolicy.com/live/1955fcf3-cd90-442b-bf3f-d52263cb7a10' },
];
const contactInfo = [
    { icon: Phone, text: '(210) 284-1082', href: 'tel:+12102841082' },
    { icon: Mail, text: 'contact@thelab210.com', href: 'mailto:contact@thelab210.com' },
];
export default function Footer() {
    return (_jsx("footer", { className: "bg-white pt-16 pb-8", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left mb-12", children: [_jsxs("div", { className: "flex flex-col items-center md:items-start", children: [_jsx("a", { href: "#top", "aria-label": "Go to homepage", className: "mb-4", children: _jsx(Logo, {}) }), _jsx("p", { className: "text-gray-600", children: "Built in The Lab, Validated by Effort" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "SERVICES" }), _jsx("ul", { className: "space-y-3", children: services.map(({ text, id }) => (_jsx("li", { children: _jsx("button", { onClick: () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), className: "text-gray-600 hover:text-primary focus:outline-none", children: text }) }, id))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "EXPLORE" }), _jsx("ul", { className: "space-y-3", children: exploreLinks.map(({ text, href }) => (_jsx("li", { children: _jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "text-gray-600 hover:text-primary", children: text }) }, text))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-gray-900 mb-4", children: "CONTACT US" }), _jsx("ul", { className: "space-y-3", children: contactInfo.map(({ icon: Icon, text, href }) => (_jsxs("li", { className: "flex items-center justify-center md:justify-start space-x-2", children: [_jsx(Icon, { className: "h-5 w-5 text-primary" }), _jsx("a", { href: href, className: "text-gray-600 hover:text-primary", children: text })] }, text))) })] })] }), _jsx("div", { className: "border-t border-gray-200 pt-8 flex flex-col items-center", children: _jsxs("p", { className: "text-gray-500 text-sm text-center", children: ["\u00A9 ", new Date().getFullYear(), " The Lab | All rights reserved"] }) })] }) }));
}
