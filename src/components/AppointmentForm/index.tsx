import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormTextarea } from "./FormTextarea";

const serviceOptions = ["Personal Training", "Bootcamp"];

export default function AppointmentForm() {
  const [status, setStatus] = useState(""); // Tracks form submission status
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevents duplicate submissions

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      console.log("Form is already submitting. Please wait.");
      return;
    }

    setIsSubmitting(true);
    console.log("Form submission started...");

    try {
      const result = await emailjs.sendForm(
        "service_qxh6hg6", // Replace with your EmailJS service ID
        "template_z3slqb3", // Replace with your EmailJS template ID
        e.target as HTMLFormElement,
        "TB8AMH9EDTqIKOF0P" // Replace with your EmailJS public key
      );

      console.log("Email sent successfully:", result.text);
      setStatus("success");
    } catch (error: any) {
      console.error("Error sending email:", error?.text || error.message || error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
      console.log("Form submission ended.");
    }
  };

  return (
    <section
      id="appointment"
      className="py-16 bg-gray-100"
      style={{ scrollMarginTop: "6rem" }} // Ensures title is visible after scrolling
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 italic">
          Start Your Fitness Journey
        </h2>

        <form onSubmit={handleSubmit} className="bg-gray-200 p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Your Full Name" type="text" name="fullName" required />
            <FormInput label="Your Email Address" type="email" name="email" required />
            <FormInput label="Best Phone Number to Reach You" type="tel" name="phone" required />
            <FormInput label="Preferred Start Date" type="date" name="date" required />
          </div>

          <div className="text-center mt-6">
            <FormSelect
              label="How Can We Help?"
              name="service"
              options={serviceOptions}
              required
            />
          </div>

          <FormTextarea
            label="Tell Us About Your Fitness Goals"
            name="message"
            className="mt-6"
            required
          />

          <button
            type="submit"
            className={`w-full mt-6 py-3 px-4 rounded font-medium transition-colors ${
              isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Let’s Do This"}
          </button>
        </form>

        {status === "success" && (
          <p className="text-green-600 text-center mt-4">
            Thank you for reaching out! We’ll follow up shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center mt-4">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
