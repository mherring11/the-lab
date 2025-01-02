import React from 'react';
import logo from '../assets/logo.png';

export default function Logo() {
  return (
    <a href="#top" className="flex items-center">
      <img src={logo} alt="The Lab Logo" className="h-24 w-auto" />
    </a>
  );
}
