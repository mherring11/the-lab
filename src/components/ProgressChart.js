import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ProgressChart({ data }) {
    return (_jsx("div", { className: "space-y-4", children: data.map((item, index) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: item.label }), _jsxs("span", { className: "text-sm font-medium text-gray-700", children: [item.value, "/", item.max] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: _jsx("div", { className: `${item.color} h-2.5 rounded-full`, style: { width: `${(item.value / item.max) * 100}%` } }) })] }, index))) }));
}
