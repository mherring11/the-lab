import React from "react";
import bootcampImage from "../assets/bootcamp-cones.jpg";

export default function Hero() {
  return (
    <div className="relative h-[95vh]"> {/* Adjusted height */}
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bootcampImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main tagline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 font-montserrat">
            Built in The Lab, Validated by Effort
          </h1>
          {/* Subheading */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-8 font-montserrat">
            Where Fitness Meets Science: Personalized Training and Bootcamps
          </h2>
          {/* Call-to-action button */}
          <button
            onClick={() => {
              const appointmentSection = document.getElementById("appointment");
              if (appointmentSection) {
                appointmentSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="mt-4 bg-primary text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-montserrat"
          >
            Begin Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}
