import React from "react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 bg-white border-t border-gray-200"
      style={{ scrollMarginTop: "6rem" }} // Ensures proper alignment when scrolling
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Meet{" "}
            <span className="bg-black text-yellow-400 px-2 py-1 rounded">
              Mike
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            My mission is to empower individuals to feel strong, confident, and
            capable in every aspect of their lives. Through personalized
            training plans and dynamic bootcamp sessions, I strive to help you
            achieve sustainable results while making the journey enjoyable and
            rewarding.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Personal training here is all about customization—crafting a program tailored to your unique goals, lifestyle, and challenges. Whether you’re aiming to build strength, enhance endurance, or improve overall fitness, every session is designed to keep you progressing and motivated.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Bootcamp sessions provide a high-energy group environment that combines teamwork and intensity. They’re perfect for anyone looking to push their limits while benefiting from the camaraderie and support of a welcoming community.
          </p>
          <p className="text-lg font-bold text-gray-800">
            Together, we’ll break barriers, push boundaries, and create lasting
            change. Fitness isn’t just about workouts—it’s about building a
            stronger, healthier, and more confident you.
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="relative h-96 w-full">
          <img
            src="https://images.unsplash.com/photo-1598970434795-0c54fe7c0647?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
            alt="Personal Training & Bootcamp"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
