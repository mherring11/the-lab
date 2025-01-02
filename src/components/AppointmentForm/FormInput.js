import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function FormInput({ label, type, name, required, className = '' }) {
    return (_jsxs("div", { className: className, children: [_jsx("label", { htmlFor: name, className: "block text-gray-800 mb-2", children: label }), _jsx("input", { type: type, id: name, name: name, required: required, className: "w-full px-4 py-2 rounded bg-white border-0 focus:ring-2 focus:ring-primary" })] }));
}
