import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollToSection = (sectionId) => {
        if (sectionId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        else {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
        setIsMobileMenuOpen(false); // Close menu after clicking a link
    };
    return (_jsxs("header", { className: "fixed w-full bg-white shadow z-50 font-Montserrat", children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-24", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Logo, {}) }), _jsxs("nav", { className: "hidden md:flex space-x-8", children: [_jsx(Link, { to: "/", onClick: (e) => {
                                        e.preventDefault();
                                        scrollToSection("home");
                                    }, className: "text-lg font-semibold text-black hover:text-primary transition", children: "Home" }), _jsx(Link, { to: "/#about", onClick: (e) => {
                                        e.preventDefault();
                                        scrollToSection("about");
                                    }, className: "text-lg font-semibold text-black hover:text-primary transition", children: "About" }), _jsx(Link, { to: "/#services", onClick: (e) => {
                                        e.preventDefault();
                                        scrollToSection("services");
                                    }, className: "text-lg font-semibold text-black hover:text-primary transition", children: "Services" }), _jsx(Link, { to: "/#blog", onClick: (e) => {
                                        e.preventDefault();
                                        scrollToSection("blog");
                                    }, className: "text-lg font-semibold text-black hover:text-primary transition", children: "Blog" })] }), _jsx("button", { onClick: () => scrollToSection("appointment"), className: "hidden md:block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-sm", children: "Begin Your Journey" }), _jsx("button", { className: "md:hidden text-black", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), children: isMobileMenuOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) })] }) }), isMobileMenuOpen && (_jsx("div", { className: "md:hidden bg-white shadow-lg", children: _jsxs("nav", { className: "space-y-4 p-4", children: [_jsx(Link, { to: "/", onClick: (e) => {
                                e.preventDefault();
                                scrollToSection("home");
                            }, className: "block text-lg font-semibold text-black hover:text-primary transition", children: "Home" }), _jsx(Link, { to: "/#about", onClick: (e) => {
                                e.preventDefault();
                                scrollToSection("about");
                            }, className: "block text-lg font-semibold text-black hover:text-primary transition", children: "About" }), _jsx(Link, { to: "/#services", onClick: (e) => {
                                e.preventDefault();
                                scrollToSection("services");
                            }, className: "block text-lg font-semibold text-black hover:text-primary transition", children: "Services" }), _jsx(Link, { to: "/#blog", onClick: (e) => {
                                e.preventDefault();
                                scrollToSection("blog");
                            }, className: "block text-lg font-semibold text-black hover:text-primary transition", children: "Blog" }), _jsx("button", { onClick: () => scrollToSection("appointment"), className: "block w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-center text-sm", children: "Begin Your Journey" })] }) }))] }));
}
