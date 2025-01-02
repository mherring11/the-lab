import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("section", { className: "bg-black py-24 relative overflow-hidden", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [_jsxs("div", { className: "text-white", children: [_jsxs("h2", { className: "text-4xl md:text-5xl font-bold leading-tight", children: ["ACHIEVE RESULTS WITH", _jsx("br", {}), "WORKOUTS THAT WORK", _jsx("br", {}), _jsx("span", { className: "text-primary", children: "FOR YOU" })] }), _jsx("div", { className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-4", children: features.map((feature) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Check, { className: "h-5 w-5 text-primary" }), _jsx("span", { className: "text-gray-300", children: feature })] }, feature))) }), _jsxs("button", { onClick: scrollToAppointmentForm, className: "mt-8 bg-primary text-black px-8 py-3 rounded-md text-lg font-medium hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-black inline-flex items-center space-x-2", children: ["BEGIN YOUR JOURNEY", _jsx("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: _jsx("path", { d: "M5 12h14m-7-7l7 7-7 7", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })] })] }), _jsx("div", { className: "relative h-full", children: _jsx("img", { src: "/src/assets/shutterstock_1379743754-1.jpg" // Update with the correct path
                            , alt: "Fitness trainers", className: "rounded-lg object-cover w-full h-[500px]" }) })] }) }) }));
}
