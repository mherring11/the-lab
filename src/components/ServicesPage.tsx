import React from "react";
import logo from "../assets/logo.png"; // Import the logo correctly

export default function ServicesPage() {
  return (
    <div id="services" className="bg-gray-100">
      {/* Services Hero */}
      <div className="relative bg-white text-center py-16">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="The Lab Logo" className="h-24" />
        </div>
        {/* SERVICES Heading */}
        <h1 className="text-5xl font-bold bg-black text-yellow-400 inline-block px-6 py-2 rounded">
          SERVICES
        </h1>
      </div>

      {/* Personal Training Section */}
      <section
        id="personal-training"
        className="py-16 bg-white text-center scroll-mt-24"
      >
        <h2 className="text-3xl font-bold mb-6">PERSONAL TRAINING PRICING</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Personal Training",
              price: "$40",
              description: "Per Session",
            },
            {
              title: "Couples Training",
              price: "$30",
              description: "Per Person/Per Session",
            },
            {
              title: "Group Training: 3-4 People",
              price: "$25",
              description: "Per Person/Per Session",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-gray-100 shadow-lg rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-2xl font-bold text-yellow-500">{item.price}</p>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bootcamp Section */}
      <section
        id="bootcamp"
        className="py-16 bg-white text-center scroll-mt-24"
      >
        <h2 className="text-3xl font-bold mb-6">BOOTCAMP CLASSES</h2>
        <div className="space-y-8 max-w-5xl mx-auto">
          {[
            {
              title: "Unlimited Bootcamp Classes",
              description: "Mon, Wed, Thur, and Sat.",
              schedule: ["M", "W", "TH", "S"],
              price: "$175 per month",
              buttonLabel: "Enroll Now",
              url: "https://pay.thelab210.com/bootcamp-membership", // Link for Unlimited Bootcamp Class
            },
            {
              title: "Speed & Agility Camp",
              description: "Tue and Thur.",
              schedule: ["T", "TH"],
              price: "$250 total",
              buttonLabel: "Enroll Now",
              url: "https://pay.thelab210.com/summer-camp",
            },
          ].map((bootcamp, index) => (
            <div
              key={index}
              className="bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col items-center md:flex-row md:justify-between text-center md:text-left"
            >
              <div className="flex-grow">
                <h3 className="text-xl font-bold">{bootcamp.title}</h3>
                <p className="text-gray-600">{bootcamp.description}</p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-4 text-center">
                {bootcamp.schedule && (
                  <div className="flex gap-2 mb-4 justify-center">
                    {bootcamp.schedule.map((day) => (
                      <span
                        key={day}
                        className="bg-black text-yellow-400 font-bold rounded-full px-3 py-1"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-lg font-semibold">{bootcamp.price}</p>
                <a
                  href={bootcamp.url || "#"}
                  target={bootcamp.url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="bg-yellow-400 text-black rounded-lg px-4 py-2 mt-2 font-bold hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 inline-block"
                >
                  {bootcamp.buttonLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
