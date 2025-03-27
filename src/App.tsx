// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

// Import your page components
import Home from './pages/Home';
import CampPage from './pages/CampPage';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/camp" element={<CampPage />} />
      </Routes>
    </>
  );
}
