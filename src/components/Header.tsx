import React from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed w-full bg-white shadow z-50 font-Montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo on the far left */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Navigation links and Begin Your Journey button on the right */}
          <div className="flex items-center space-x-8">
            {/* Navigation links */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation
                  scrollToSection("home");
                }}
                className="text-lg font-semibold text-black hover:text-primary transition"
              >
                Home
              </Link>
              <Link
                to="/#about"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation
                  scrollToSection("about");
                }}
                className="text-lg font-semibold text-black hover:text-primary transition"
              >
                About
              </Link>
              <Link
                to="/#services"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation
                  scrollToSection("services");
                }}
                className="text-lg font-semibold text-black hover:text-primary transition"
              >
                Services
              </Link>
              <Link
                to="/#blog"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation
                  scrollToSection("blog");
                }}
                className="text-lg font-semibold text-black hover:text-primary transition"
              >
                Blog
              </Link>
            </nav>

            {/* Begin Your Journey button */}
            <button
              onClick={() => scrollToSection("appointment")}
              className="hidden md:block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-sm"
            >
              Begin Your Journey
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-black">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
