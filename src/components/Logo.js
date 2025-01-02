import { jsx as _jsx } from "react/jsx-runtime";
import logo from '../assets/logo.png';
export default function Logo() {
    return (_jsx("a", { href: "#top", className: "flex items-center", children: _jsx("img", { src: logo, alt: "The Lab Logo", className: "h-24 w-auto" }) }));
}
