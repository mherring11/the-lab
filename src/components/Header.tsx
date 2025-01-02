import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false); // Close menu after clicking a link
  };

  return (
    <header className="fixed w-full bg-white shadow z-50 font-Montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="text-lg font-semibold text-black hover:text-primary transition"
            >
              Home
            </Link>
            <Link
              to="/#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="text-lg font-semibold text-black hover:text-primary transition"
            >
              About
            </Link>
            <Link
              to="/#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("services");
              }}
              className="text-lg font-semibold text-black hover:text-primary transition"
            >
              Services
            </Link>
            <Link
              to="/#blog"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("blog");
              }}
              className="text-lg font-semibold text-black hover:text-primary transition"
            >
              Blog
            </Link>
          </nav>

          {/* Begin Your Journey Button */}
          <button
            onClick={() => scrollToSection("appointment")}
            className="hidden md:block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-sm"
          >
            Begin Your Journey
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="space-y-4 p-4">
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="block text-lg font-semibold text-black hover:text-primary transition"
            >
              Home
            </Link>
            <Link
              to="/#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="block text-lg font-semibold text-black hover:text-primary transition"
            >
              About
            </Link>
            <Link
              to="/#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("services");
              }}
              className="block text-lg font-semibold text-black hover:text-primary transition"
            >
              Services
            </Link>
            <Link
              to="/#blog"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("blog");
              }}
              className="block text-lg font-semibold text-black hover:text-primary transition"
            >
              Blog
            </Link>
            <button
              onClick={() => scrollToSection("appointment")}
              className="block w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-center text-sm"
            >
              Begin Your Journey
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}