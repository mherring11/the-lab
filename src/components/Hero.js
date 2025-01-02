import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import bootcampImage from "../assets/bootcamp-cones.jpg";
export default function Hero() {
    return (_jsxs("div", { className: "relative h-[95vh]", children: [" ", _jsx("div", { className: "absolute inset-0 bg-cover bg-center", style: {
                    backgroundImage: `url(${bootcampImage})`,
                }, children: _jsx("div", { className: "absolute inset-0 bg-black/40" }) }), _jsx("div", { className: "relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 font-montserrat", children: "Built in The Lab, Validated by Effort" }), _jsx("h2", { className: "text-lg sm:text-xl md:text-2xl font-bold text-white mb-8 font-montserrat", children: "Where Fitness Meets Science: Personalized Training and Bootcamps" }), _jsx("button", { onClick: () => {
                                const appointmentSection = document.getElementById("appointment");
                                if (appointmentSection) {
                                    appointmentSection.scrollIntoView({ behavior: "smooth" });
                                }
                            }, className: "mt-4 bg-primary text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-montserrat", children: "Begin Your Journey" })] }) })] }));
}
