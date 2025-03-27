import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Menu, X, Facebook, Instagram } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { pathname } = useLocation();
    // For Home, if we're on the home page, scroll to top using window.scrollTo
    const handleHomeClick = (e) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    // For About and Services, if on home page, scroll to the corresponding section.
    // Otherwise, let the link navigate to "/#about" or "/#services" (Home's useEffect will handle scrolling).
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };
    const handleAboutClick = (e) => {
        if (pathname === "/") {
            e.preventDefault();
            scrollToSection("about");
        }
    };
    const handleServicesClick = (e) => {
        if (pathname === "/") {
            e.preventDefault();
            scrollToSection("services");
        }
    };
    return (_jsxs("header", { className: "fixed w-full bg-white shadow z-50 font-Montserrat", children: [_jsx("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-center h-24", children: [_jsx("div", { className: "absolute left-4 flex-shrink-0", children: _jsx(Link, { to: "/", onClick: handleHomeClick, children: _jsx(Logo, {}) }) }), _jsxs("nav", { className: "hidden md:flex space-x-8", children: [_jsx(Link, { to: "/", onClick: handleHomeClick, className: "text-lg font-semibold text-black hover:text-primary transition", children: "Home" }), _jsx(Link, { to: "/#about", onClick: handleAboutClick, className: "text-lg font-semibold text-black hover:text-primary transition", children: "About" }), _jsx(Link, { to: "/#services", onClick: handleServicesClick, className: "text-lg font-semibold text-black hover:text-primary transition", children: "Services" }), _jsx(Link, { to: "/camp", className: "text-lg font-semibold text-black hover:text-primary transition", children: "Camp" })] }), _jsxs("div", { className: "absolute right-4 flex items-center space-x-4", children: [_jsxs("div", { className: "hidden md:flex space-x-4", children: [_jsx("a", { href: "https://www.facebook.com/profile.php?id=61571518048845", target: "_blank", rel: "noopener noreferrer", "aria-label": "Facebook", className: "transform transition-transform hover:scale-125 focus:outline-none hover:text-yellow-500", children: _jsx(Facebook, { className: "h-6 w-6 text-black transition" }) }), _jsx("a", { href: "https://www.instagram.com/thelab210/", target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", className: "transform transition-transform hover:scale-125 focus:outline-none hover:text-yellow-500", children: _jsx(Instagram, { className: "h-6 w-6 text-black transition" }) })] }), _jsx("button", { onClick: () => scrollToSection("appointment"), className: "hidden md:block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-sm", children: "Begin Your Journey" })] }), _jsx("button", { className: "md:hidden text-black absolute right-4", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), children: isMobileMenuOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) })] }) }), isMobileMenuOpen && (_jsx("div", { className: "md:hidden bg-white shadow-lg", children: _jsxs("nav", { className: "space-y-4 p-4", children: [_jsx(Link, { to: "/", onClick: (e) => {
                                if (pathname === "/") {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }
                                else {
                                    setIsMobileMenuOpen(false);
                                }
                            }, className: "block text-lg font-semibold text-black hover:text-primary transition", children: "Home" }), _jsx(Link, { to: "/#about", onClick: (e) => {
                                if (pathname === "/") {
                                    e.preventDefault();
                                    scrollToSection("about");
                                }
                            }, className: "block text-lg font-semibold text-black hover:text-primary transition", children: "About" }), _jsx(Link, { to: "/#services", onClick: (e) => {
                                if (pathname === "/") {
                                    e.preventDefault();
                                    scrollToSection("services");
                                }
                            }, className: "block text-lg font-semibold text-black hover:text-primary transition", children: "Services" }), _jsx(Link, { to: "/camp", className: "block text-lg font-semibold text-black hover:text-primary transition", onClick: () => setIsMobileMenuOpen(false), children: "Camp" }), _jsx("button", { onClick: () => scrollToSection("appointment"), className: "block w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-center text-sm", children: "Begin Your Journey" })] }) }))] }));
}
