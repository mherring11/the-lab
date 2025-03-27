import React, { useState } from "react";
import { Menu, X, Facebook, Instagram } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // For Home, if we're on the home page, scroll to top using window.scrollTo
  const handleHomeClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // For About and Services, if on home page, scroll to the corresponding section.
  // Otherwise, let the link navigate to "/#about" or "/#services" (Home's useEffect will handle scrolling).
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleAboutClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      scrollToSection("about");
    }
  };

  const handleServicesClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      scrollToSection("services");
    }
  };

  return (
    <header className="fixed w-full bg-white shadow z-50 font-Montserrat">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-24">
          {/* Logo */}
          <div className="absolute left-4 flex-shrink-0">
            <Link to="/" onClick={handleHomeClick}>
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="text-lg font-semibold text-black hover:text-primary transition"
            >
              Home
            </Link>
            <Link
              to="/#about"
              onClick={handleAboutClick}
              className="text-lg font-semibold text-black hover:text-primary transition"
            >
              About
            </Link>
            <Link
              to="/#services"
              onClick={handleServicesClick}
              className="text-lg font-semibold text-black hover:text-primary transition"
            >
              Services
            </Link>
            <Link
              to="/camp"
              className="text-lg font-semibold text-black hover:text-primary transition"
            >
              Camp
            </Link>
          </nav>

          {/* Right Section with Social Icons and Button (Desktop) */}
          <div className="absolute right-4 flex items-center space-x-4">
            <div className="hidden md:flex space-x-4">
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
            </div>
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
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  setIsMobileMenuOpen(false);
                }
              }}
              className="block text-lg font-semibold text-black hover:text-primary transition"
            >
              Home
            </Link>
            <Link
              to="/#about"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToSection("about");
                }
              }}
              className="block text-lg font-semibold text-black hover:text-primary transition"
            >
              About
            </Link>
            <Link
              to="/#services"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToSection("services");
                }
              }}
              className="block text-lg font-semibold text-black hover:text-primary transition"
            >
              Services
            </Link>
            <Link
              to="/camp"
              className="block text-lg font-semibold text-black hover:text-primary transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Camp
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
