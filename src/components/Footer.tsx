import React from 'react';
import Logo from './Logo';
import { Phone, Mail, Facebook, Instagram } from 'lucide-react';
import threadsLogo from '../assets/Threads Logo.png'; // Import the Threads logo

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
  { icon: threadsLogo, href: 'https://www.threads.net/@thelab210', isCustom: true }, // Custom Threads logo
];

// Scroll function to navigate to the service section
const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Clickable Logo and Description */}
          <div>
            <a href="#top" aria-label="Go to homepage">
              <Logo />
            </a>
            <p className="mt-4 text-gray-600">Built in The Lab, Validated by Effort</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">SERVICES</h3>
            <ul className="space-y-3">
              {services.map(({ text, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="text-gray-600 hover:text-primary focus:outline-none"
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">CONTACT US</h3>
            <ul className="space-y-3">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <a href={href} className="text-gray-600 hover:text-primary">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map(({ icon, href, isCustom }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-transform hover:scale-125 focus:outline-none"
              aria-label="Social Media Link"
            >
              {isCustom ? (
                <img
                  src={icon}
                  alt="Threads Logo"
                  className="h-6 w-6"
                />
              ) : (
                React.createElement(icon, { className: 'h-6 w-6 text-black' })
              )}
            </a>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} The Lab | All rights reserved
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerLinks.map(({ text, href }) => (
              <a key={text} href={href} className="text-sm text-gray-500 hover:text-primary">
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
