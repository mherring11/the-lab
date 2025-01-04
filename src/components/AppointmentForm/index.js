import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import emailjs from "emailjs-com";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormTextarea } from "./FormTextarea";
const serviceOptions = ["Personal Training", "Bootcamp"];
export default function AppointmentForm() {
    const [status, setStatus] = useState(""); // Tracks form submission status
    const [isSubmitting, setIsSubmitting] = useState(false); // Prevents duplicate submissions
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            console.log("Form is already submitting. Please wait.");
            return;
        }
        setIsSubmitting(true);
        console.log("Form submission started...");
        try {
            const result = await emailjs.sendForm("service_qxh6hg6", // Replace with your EmailJS service ID
            "template_z3slqb3", // Replace with your EmailJS template ID
            e.target, "TB8AMH9EDTqIKOF0P" // Replace with your EmailJS public key
            );
            console.log("Email sent successfully:", result.text);
            setStatus("success");
        }
        catch (error) {
            console.error("Error sending email:", error?.text || error.message || error);
            setStatus("error");
        }
        finally {
            setIsSubmitting(false);
            console.log("Form submission ended.");
        }
    };
    return (_jsx("section", { id: "appointment", className: "py-16 bg-gray-100", style: { scrollMarginTop: "6rem" }, children: _jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx("h2", { className: "text-4xl font-bold text-center mb-12 italic", children: "Start Your Fitness Journey" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-gray-200 p-8 rounded-lg", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(FormInput, { label: "Your Full Name", type: "text", name: "fullName", required: true }), _jsx(FormInput, { label: "Your Email Address", type: "email", name: "email", required: true }), _jsx(FormInput, { label: "Best Phone Number to Reach You", type: "tel", name: "phone", required: true }), _jsx(FormInput, { label: "Preferred Start Date", type: "date", name: "date", required: true })] }), _jsx("div", { className: "text-center mt-6", children: _jsx(FormSelect, { label: "How Can We Help?", name: "service", options: serviceOptions, required: true }) }), _jsx(FormTextarea, { label: "Tell Us About Your Fitness Goals", name: "message", className: "mt-6", required: true }), _jsx("button", { type: "submit", className: `w-full mt-6 py-3 px-4 rounded font-medium transition-colors ${isSubmitting
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-black text-white hover:bg-gray-900"}`, disabled: isSubmitting, children: isSubmitting ? "Submitting..." : "Let’s Do This" })] }), status === "success" && (_jsx("p", { className: "text-green-600 text-center mt-4", children: "Thank you for reaching out! We\u2019ll follow up shortly." })), status === "error" && (_jsx("p", { className: "text-red-600 text-center mt-4", children: "Something went wrong. Please try again." }))] }) }));
}
