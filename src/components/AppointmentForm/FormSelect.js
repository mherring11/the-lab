import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function FormSelect({ label, name, options, required, className = '' }) {
    return (_jsxs("div", { className: className, children: [_jsx("label", { htmlFor: name, className: "block text-gray-800 mb-2", children: label }), _jsxs("select", { id: name, name: name, required: required, className: "w-full px-4 py-2 rounded bg-white border-0 focus:ring-2 focus:ring-primary", defaultValue: "", children: [_jsx("option", { value: "", disabled: true, children: "Select the option" }), options.map((option) => (_jsx("option", { value: option, children: option }, option)))] })] }));
}
