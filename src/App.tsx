import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TheLabExperience from './components/TheLabExperience';
import ServicesPage from './components/ServicesPage';
import CTASection from './components/CTASection';
import AboutSection from './components/AboutSection';
import StepSystem from './components/StepSystem';
import AppointmentForm from './components/AppointmentForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TheLabExperience />
        <CTASection />
        <AboutSection />
        <StepSystem />
        <ServicesPage />
        <AppointmentForm />
      </main>
      <Footer />
    </div>
  );
}
