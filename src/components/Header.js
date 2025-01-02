import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
export default function Header() {
    const scrollToSection = (sectionId) => {
        if (sectionId === "home") {
            // Scroll to the top of the page
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        else {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    };
    return (_jsx("header", { className: "fixed w-full bg-white shadow z-50 font-Montserrat", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-24", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx(Logo, {}) }), _jsxs("div", { className: "flex items-center space-x-8", children: [_jsxs("nav", { className: "hidden md:flex space-x-8", children: [_jsx(Link, { to: "/", onClick: (e) => {
                                            e.preventDefault(); // Prevent default navigation
                                            scrollToSection("home");
                                        }, className: "text-lg font-semibold text-black hover:text-primary transition", children: "Home" }), _jsx(Link, { to: "/#about", onClick: (e) => {
                                            e.preventDefault(); // Prevent default navigation
                                            scrollToSection("about");
                                        }, className: "text-lg font-semibold text-black hover:text-primary transition", children: "About" }), _jsx(Link, { to: "/#services", onClick: (e) => {
                                            e.preventDefault(); // Prevent default navigation
                                            scrollToSection("services");
                                        }, className: "text-lg font-semibold text-black hover:text-primary transition", children: "Services" }), _jsx(Link, { to: "/#blog", onClick: (e) => {
                                            e.preventDefault(); // Prevent default navigation
                                            scrollToSection("blog");
                                        }, className: "text-lg font-semibold text-black hover:text-primary transition", children: "Blog" })] }), _jsx("button", { onClick: () => scrollToSection("appointment"), className: "hidden md:block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-sm", children: "Begin Your Journey" })] }), _jsx("button", { className: "md:hidden text-black", children: _jsx(Menu, { size: 24 }) })] }) }) }));
}
