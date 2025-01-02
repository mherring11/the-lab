import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const steps = [
    {
        number: '01',
        title: 'INITIAL ASSESSMENT',
        description: 'Kickstart your journey with a free consultation to evaluate your fitness goals and health needs.',
    },
    {
        number: '02',
        title: 'PERSONALIZED FITNESS TESTING',
        description: 'Comprehensive fitness assessment to benchmark your current health and performance levels.',
    },
    {
        number: '03',
        title: 'TAILORED TRAINING PLAN',
        description: 'Customized training and nutrition programs designed to match your specific goals and lifestyle.',
    },
    {
        number: '04',
        title: 'ONGOING COACHING & SUPPORT',
        description: 'Continuous guidance and progress tracking to ensure you stay on track and achieve results.',
    },
];
export default function StepSystem() {
    return (_jsx("section", { className: "py-24 bg-white", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-600", children: "HOW IT WORKS" }), _jsxs("h2", { className: "mt-2 text-3xl font-bold text-gray-900 sm:text-5xl", children: ["STEP SUCCESS ", _jsx("span", { className: "bg-accent text-primary px-4 py-1 rounded", children: "SYSTEM" })] })] }), _jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-4", children: steps.map((step) => (_jsx("div", { className: "relative", children: _jsxs("div", { className: "bg-gray-100 rounded-lg p-6 h-full", children: [_jsx("div", { className: "absolute -top-4 left-6 bg-primary text-white text-xl font-bold w-12 h-12 flex items-center justify-center rounded", children: step.number }), _jsx("h3", { className: "mt-4 text-xl font-bold text-gray-900 mb-4", children: step.title }), _jsx("p", { className: "text-gray-600", children: step.description })] }) }, step.number))) })] }) }));
}
