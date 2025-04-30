import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Upload, Camera, Check } from 'lucide-react';
export default function FormAnalysis({ onClose }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const handleFileChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setFile(null);
            setPreview(null);
            return;
        }
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        // Create preview URL
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreview(previewUrl);
    };
    const handleAnalyze = () => {
        if (!file)
            return;
        setIsAnalyzing(true);
        // Simulate analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            setResults({
                score: 82,
                feedback: [
                    "Knee alignment looks good during the squat",
                    "Depth is appropriate for your mobility level",
                    "Try to maintain a more neutral spine at the bottom position",
                    "Keep your chest up more throughout the movement"
                ]
            });
        }, 2000);
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-md", children: [_jsxs("div", { className: "flex justify-between items-center p-4 border-b", children: [_jsxs("h2", { className: "text-lg font-semibold text-gray-900 flex items-center", children: [_jsx(Camera, { className: "h-5 w-5 mr-2 text-yellow-500" }), "Form Analysis"] }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-500", children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsx("div", { className: "p-4", children: !results ? (_jsx(_Fragment, { children: preview ? (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: preview, alt: "Video preview", className: "w-full h-48 object-cover rounded-md" }), _jsx("button", { onClick: () => {
                                                setFile(null);
                                                setPreview(null);
                                            }, className: "absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsx("div", { className: "mt-4", children: _jsx("button", { onClick: handleAnalyze, disabled: isAnalyzing, className: "w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500", children: isAnalyzing ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Analyzing..."] })) : ('Analyze Form') }) })] })) : (_jsxs("div", { className: "flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6", children: [_jsx(Upload, { className: "h-12 w-12 text-gray-400 mb-4" }), _jsx("p", { className: "text-sm text-gray-500 mb-4 text-center", children: "Upload a video of your exercise form for AI analysis" }), _jsx("input", { type: "file", id: "video-upload", accept: "video/*,image/*", onChange: handleFileChange, className: "hidden" }), _jsxs("label", { htmlFor: "video-upload", className: "flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer", children: [_jsx(Camera, { className: "h-4 w-4 mr-2" }), "Select Video"] })] })) })) : (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Form Score" }), _jsx("div", { className: "bg-green-100 text-green-800 text-lg font-bold rounded-full h-12 w-12 flex items-center justify-center", children: results.score })] }), _jsxs("div", { className: "border-t pt-4", children: [_jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Feedback:" }), _jsx("ul", { className: "space-y-2", children: results.feedback.map((item, index) => (_jsxs("li", { className: "flex items-start text-sm", children: [_jsx(Check, { className: "h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" }), _jsx("span", { children: item })] }, index))) })] }), _jsx("div", { className: "pt-4", children: _jsx("button", { onClick: () => {
                                        setFile(null);
                                        setPreview(null);
                                        setResults(null);
                                    }, className: "w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500", children: "Try Another Video" }) })] })) })] }) }));
}
