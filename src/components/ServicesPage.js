import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import logo from "../assets/logo.png"; // Import the logo correctly
export default function ServicesPage() {
    const handlePreRegister = () => {
        // Handle pre-registration logic here, such as redirecting to a registration page
        window.location.href = "/register";
    };
    return (_jsxs("div", { id: "services", className: "bg-gray-100", children: [_jsxs("div", { className: "relative bg-white text-center py-16", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("img", { src: logo, alt: "The Lab Logo", className: "h-24" }) }), _jsx("h1", { className: "text-5xl font-bold bg-black text-yellow-400 inline-block px-6 py-2 rounded", children: "SERVICES" })] }), _jsxs("section", { id: "personal-training", className: "py-16 bg-white text-center scroll-mt-24", children: [_jsx("h2", { className: "text-3xl font-bold mb-6", children: "PERSONAL TRAINING PRICING" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto", children: [
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
                        ].map((item) => (_jsxs("div", { className: "bg-gray-100 shadow-lg rounded-lg p-6", children: [_jsx("h3", { className: "text-xl font-semibold mb-2", children: item.title }), _jsx("p", { className: "text-2xl font-bold text-yellow-500", children: item.price }), _jsx("p", { className: "text-gray-600", children: item.description })] }, item.title))) })] }), _jsxs("section", { id: "bootcamp", className: "py-16 bg-white text-center scroll-mt-24", children: [_jsx("h2", { className: "text-3xl font-bold mb-6", children: "BOOTCAMP CLASSES" }), _jsx("div", { className: "space-y-8 max-w-5xl mx-auto", children: [
                            {
                                title: "Unlimited Bootcamp Class",
                                description: "Mondays, Wednesdays, Thursday, and Saturday.",
                                schedule: ["M", "W", "TH", "S"],
                                price: "$250 per month",
                                buttonLabel: "Enroll Now",
                            },
                            {
                                title: "Single Bootcamp Class",
                                description: [
                                    "Monday, 7:00pm - 8:00pm",
                                    "Wednesday, 7:00pm - 8:00pm",
                                    "Thursday, 7:00pm - 8:00pm",
                                    "Saturday, 9:00am - 10:00am",
                                ],
                                price: "$20 per class",
                                buttonLabel: "Enroll Now",
                            },
                        ].map((bootcamp, index) => (_jsxs("div", { className: "bg-gray-100 p-8 rounded-lg shadow-lg flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold", children: bootcamp.title }), Array.isArray(bootcamp.description) ? (bootcamp.description.map((desc, idx) => (_jsx("p", { className: "text-gray-600", children: desc }, idx)))) : (_jsx("p", { className: "text-gray-600", children: bootcamp.description }))] }), _jsxs("div", { className: "text-right", children: [bootcamp.schedule && (_jsx("div", { className: "flex gap-2 mb-4 justify-center", children: bootcamp.schedule.map((day) => (_jsx("span", { className: "bg-black text-yellow-400 font-bold rounded-full px-3 py-1", children: day }, day))) })), _jsx("p", { className: "text-lg font-semibold", children: bootcamp.price }), _jsx("button", { onClick: handlePreRegister, className: "bg-yellow-400 text-black rounded-lg px-4 py-2 mt-4 font-bold hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500", children: bootcamp.buttonLabel })] })] }, index))) })] })] }));
}
