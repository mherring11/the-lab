import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Clock, BarChart, Award, ArrowRight } from 'lucide-react';
// Helper function to convert store workout to component workout
export const convertWorkout = (workout) => {
    return {
        ...workout,
        title: workout.title || workout.name, // Use name as fallback for title
        duration: workout.duration || 30, // Default duration
        difficulty: workout.difficulty || 'intermediate',
        category: workout.category || 'general',
        targetMuscles: workout.targetMuscles || []
    };
};
const WorkoutCard = ({ workout, onClick }) => {
    // Helper function to get difficulty color
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner':
                return 'bg-green-100 text-green-800';
            case 'intermediate':
                return 'bg-yellow-100 text-yellow-800';
            case 'advanced':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    // Helper function to get category icon
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'strength':
                return _jsx(BarChart, { className: "h-4 w-4 mr-1" });
            case 'cardio':
                return _jsx(Clock, { className: "h-4 w-4 mr-1" });
            case 'hiit':
                return _jsx(Award, { className: "h-4 w-4 mr-1" });
            default:
                return null;
        }
    };
    return (_jsx("div", { className: "bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer", onClick: onClick, children: _jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h3", { className: "font-medium text-lg text-gray-900", children: workout.title }), workout.aiGenerated === true && (_jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800", children: "AI" }))] }), _jsx("p", { className: "text-gray-500 text-sm mb-4 line-clamp-2", children: workout.description }), _jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center text-sm text-gray-500", children: [_jsx(Clock, { className: "h-4 w-4 mr-1" }), _jsxs("span", { children: [workout.duration, " min"] })] }), _jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getDifficultyColor(workout.difficulty)}`, children: workout.difficulty })] }), _jsx("div", { className: "border-t border-gray-100 pt-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center text-sm text-gray-700", children: [getCategoryIcon(workout.category), _jsx("span", { className: "capitalize", children: workout.category.replace('-', ' ') })] }), _jsxs("span", { className: "text-yellow-600 text-sm font-medium flex items-center", children: ["View Details", _jsx(ArrowRight, { className: "h-4 w-4 ml-1" })] })] }) })] }) }));
};
export default WorkoutCard;
