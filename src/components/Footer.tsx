import React from 'react';
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
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left mb-12">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <a href="#top" aria-label="Go to homepage" className="mb-4">
              <Logo />
            </a>
            <p className="text-gray-600">Built in The Lab, Validated by Effort</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">SERVICES</h3>
            <ul className="space-y-3">
              {services.map(({ text, id }) => (
                <li key={id}>
                  <button
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-600 hover:text-primary focus:outline-none"
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">EXPLORE</h3>
            <ul className="space-y-3">
              {exploreLinks.map(({ text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">CONTACT US</h3>
            <ul className="space-y-3">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-center justify-center md:justify-start space-x-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <a href={href} className="text-gray-600 hover:text-primary">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-200 pt-8 flex flex-col items-center">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} The Lab | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
