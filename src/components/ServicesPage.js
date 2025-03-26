import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import logo from "../assets/logo.png"; // Import the logo correctly
export default function ServicesPage() {
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
                        ].map((bootcamp, index) => (_jsxs("div", { className: "bg-gray-100 p-8 rounded-lg shadow-lg flex flex-col items-center md:flex-row md:justify-between text-center md:text-left", children: [_jsxs("div", { className: "flex-grow", children: [_jsx("h3", { className: "text-xl font-bold", children: bootcamp.title }), _jsx("p", { className: "text-gray-600", children: bootcamp.description })] }), _jsxs("div", { className: "mt-4 md:mt-0 md:ml-4 text-center", children: [bootcamp.schedule && (_jsx("div", { className: "flex gap-2 mb-4 justify-center", children: bootcamp.schedule.map((day) => (_jsx("span", { className: "bg-black text-yellow-400 font-bold rounded-full px-3 py-1", children: day }, day))) })), _jsx("p", { className: "text-lg font-semibold", children: bootcamp.price }), _jsx("a", { href: bootcamp.url || "#", target: bootcamp.url ? "_blank" : "_self", rel: "noopener noreferrer", className: "bg-yellow-400 text-black rounded-lg px-4 py-2 mt-2 font-bold hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 inline-block", children: bootcamp.buttonLabel })] })] }, index))) })] })] }));
}
