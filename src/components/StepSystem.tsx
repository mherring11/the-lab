import React from 'react';

const steps = [
  {
    number: '01',
    title: 'INITIAL ASSESSMENT',
    description: 'Kickstart your journey with a free consultation to evaluate your fitness goals and health needs.',
  },
  {
    number: '02',
    title: 'PERSONALIZED FITNESS TESTING',
    description: 'Comprehensive fitness assessment to benchmark your current health and performance levels.',
  },
  {
    number: '03',
    title: 'TAILORED TRAINING PLAN',
    description: 'Customized training and nutrition programs designed to match your specific goals and lifestyle.',
  },
  {
    number: '04',
    title: 'ONGOING COACHING & SUPPORT',
    description: 'Continuous guidance and progress tracking to ensure you stay on track and achieve results.',
  },
];

export default function StepSystem() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-lg font-semibold text-gray-600">HOW IT WORKS</h3>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
            STEP SUCCESS <span className="bg-accent text-primary px-4 py-1 rounded">SYSTEM</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="bg-gray-100 rounded-lg p-6 h-full">
                <div className="absolute -top-4 left-6 bg-primary text-white text-xl font-bold w-12 h-12 flex items-center justify-center rounded">
                  {step.number}
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
