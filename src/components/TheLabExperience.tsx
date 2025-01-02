import React from "react";

export default function TheLabExperience() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to{" "}
            <span className="bg-black text-primary px-4 py-1 rounded inline-block">
              The Lab
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Fitness is a journey of discovery. Here, we combine the science of
            performance with the art of coaching to help you unlock your true
            potential. Our environment is built on community, innovation, and a
            commitment to personal growth.
          </p>
        </div>

        {/* Unique Aspects */}
        <div className="space-y-8">
          <p className="text-center text-lg text-gray-600">
            This isn’t just about achieving fitness goals—it’s about building a
            stronger, more confident version of yourself. A holistic approach
            fosters mental resilience, emotional balance, and sustainable
            progress in every area of your life.
          </p>

          <p className="text-center text-lg text-gray-600">
            Through research-driven training techniques and a personalized
            strategy for every client, we ensure that every step you take is
            purposeful and effective. Whether it's in group settings or
            one-on-one coaching, the focus is always on what works best for
            you.
          </p>
        </div>
      </div>
    </section>
  );
}
