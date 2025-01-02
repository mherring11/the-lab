import React from 'react';
import { Check } from 'lucide-react';

const features = [
  'Personalized Fitness Assessments',
  'Custom Training Programs',
  'Community-Building Bootcamp Sessions',
  'Nutrition Guidance for Sustainable Results',
  'Progress Tracking and Milestone Celebrations',
  'Virtual Training Options for Added Flexibility',
];

export default function CTASection() {
  const scrollToAppointmentForm = () => {
    const appointmentSection = document.getElementById('appointment');
    if (appointmentSection) {
      appointmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-black py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              ACHIEVE RESULTS WITH<br />
              WORKOUTS THAT WORK<br />
              <span className="text-primary">FOR YOU</span>
            </h2>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToAppointmentForm}
              className="mt-8 bg-primary text-black px-8 py-3 rounded-md text-lg font-medium hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-black inline-flex items-center space-x-2"
            >
              BEGIN YOUR JOURNEY
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M5 12h14m-7-7l7 7-7 7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="relative h-full">
            <img
              src="/src/assets/shutterstock_1379743754-1.jpg" // Update with the correct path
              alt="Fitness trainers"
              className="rounded-lg object-cover w-full h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
