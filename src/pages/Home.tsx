// Home.tsx
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Import site-wide components
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import the sections you want to display on the home page
import Hero from '../components/Hero';
import TheLabExperience from '../components/TheLabExperience';
import CTASection from '../components/CTASection';
import AboutSection from '../components/AboutSection';
import StepSystem from '../components/StepSystem';
import ServicesPage from '../components/ServicesPage';
import AppointmentForm from '../components/AppointmentForm';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Delay scrolling slightly to ensure all sections have rendered
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <div className="min-h-screen">
      {/* Shared site header */}
      <Header />

      {/* Main content */}
      <main>
        <Hero />
        <TheLabExperience />
        <CTASection />
        <AboutSection />
        <StepSystem />
        <ServicesPage />
        <AppointmentForm />
      </main>

      {/* Shared site footer */}
      <Footer />
    </div>
  );
}
