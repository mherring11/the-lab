import React from "react";

export default function ServicesPage() {
  return (
    <div id="services" className="bg-gray-100">
      {/* Services Hero */}
      <div className="relative bg-white text-center py-16">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/src/assets/logo.png" // Your logo path
            alt="The Lab Logo"
            className="h-24" // Adjust the height as needed
          />
        </div>
        {/* SERVICES Heading */}
        <h1 className="text-5xl font-bold bg-black text-yellow-400 inline-block px-6 py-2 rounded">
          SERVICES
        </h1>
      </div>

      {/* Pricing Section */}
      <section
        id="personal-training"
        className="py-16 bg-white text-center scroll-mt-24"
      >
        <h2 className="text-3xl font-bold mb-6">PERSONAL TRAINING PRICING</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-gray-100 shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Personal Training</h3>
            <p className="text-2xl font-bold text-yellow-500">$40</p>
            <p className="text-gray-600">Per Session</p>
          </div>
          <div className="bg-gray-100 shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Couples Training</h3>
            <p className="text-2xl font-bold text-yellow-500">$30</p>
            <p className="text-gray-600">Per Person/Per Session</p>
          </div>
          <div className="bg-gray-100 shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Group Training: 3-4 People</h3>
            <p className="text-2xl font-bold text-yellow-500">$25</p>
            <p className="text-gray-600">Per Person/Per Session</p>
          </div>
        </div>
      </section>

      {/* Bootcamp Section */}
      <section
        id="bootcamp"
        className="py-16 bg-white text-center scroll-mt-24"
      >
        <h2 className="text-3xl font-bold mb-6">BOOTCAMP CLASSES</h2>
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Unlimited Bootcamp Class */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Unlimited Bootcamp Class</h3>
              <p className="text-gray-600">
                Mondays, Wednesdays, Thursday, and Saturday.
              </p>
            </div>
            <div>
              <div className="flex gap-2 mb-4">
                <span className="bg-black text-yellow-400 font-bold rounded-full px-3 py-1">M</span>
                <span className="bg-black text-yellow-400 font-bold rounded-full px-3 py-1">W</span>
                <span className="bg-black text-yellow-400 font-bold rounded-full px-3 py-1">TH</span>
                <span className="bg-black text-yellow-400 font-bold rounded-full px-3 py-1">S</span>
              </div>
              <p className="text-lg font-semibold">$250 per month</p>
              <button className="bg-yellow-400 text-black rounded-lg px-4 py-2 mt-4 font-bold">
                Pre-register
              </button>
            </div>
          </div>

          {/* Single Bootcamp Class */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Single Bootcamp Class</h3>
              <p className="text-gray-600">Monday, 7:00pm - 8:00pm</p>
              <p className="text-gray-600">Wednesday, 7:00pm - 8:00pm</p>
              <p className="text-gray-600">Thursday, 7:00pm - 8:00pm</p>
              <p className="text-gray-600">Saturday, 9:00am - 10:00am</p>
            </div>
            <div>
              <p className="text-lg font-semibold">$20 per class</p>
              <button className="bg-yellow-400 text-black rounded-lg px-4 py-2 mt-4 font-bold">
                Pre-register
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
