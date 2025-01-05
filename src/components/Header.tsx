import React, { useState } from "react";
import { Menu, X, Facebook, Instagram } from "lucide-react"; // Import the icons
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-24">
          {/* Logo */}
          <div className="absolute left-4 flex-shrink-0">
            <Logo />
          </div>

          {/* Centered Navigation */}
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
            <a
              href="https://blog.thelab210.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-black hover:text-primary transition"
            >
              Blog
            </a>
          </nav>

          {/* Right Section with Social Icons and Button */}
          <div className="absolute right-4 flex items-center space-x-4">
            {/* Social Icons with Hover Effect */}
            <a
              href="https://www.facebook.com/profile.php?id=61571518048845"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transform transition-transform hover:scale-125 focus:outline-none hover:text-yellow-500"
            >
              <Facebook className="h-6 w-6 text-black transition" />
            </a>
            <a
              href="https://www.instagram.com/thelab210/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transform transition-transform hover:scale-125 focus:outline-none hover:text-yellow-500"
            >
              <Instagram className="h-6 w-6 text-black transition" />
            </a>

            {/* Begin Your Journey Button */}
            <button
              onClick={() => scrollToSection("appointment")}
              className="hidden md:block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-sm"
            >
              Begin Your Journey
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black absolute right-4"
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
            <a
              href="https://blog.thelab210.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-semibold text-black hover:text-primary transition"
            >
              Blog
            </a>
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
