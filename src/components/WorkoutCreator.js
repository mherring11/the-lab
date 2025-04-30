import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Plus, Save, Trash2 } from 'lucide-react';
import { useAppStore } from '../store';
import { v4 as uuidv4 } from 'uuid'; // You might need to install this: npm install uuid @types/uuid
const WorkoutCreator = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: 30,
        difficulty: 'intermediate',
        category: 'strength',
        sportsFocus: '',
    });
    const [targetMuscles, setTargetMuscles] = useState([]);
    const [customMuscle, setCustomMuscle] = useState('');
    const [exercises, setExercises] = useState([
        {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: '',
            description: '',
            sets: 3,
            reps: 10,
            restTime: 60,
            formTips: [''],
            hasDuration: false,
        }
    ]);
    const addWorkout = useAppStore((state) => state.addWorkout);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleMuscleToggle = (muscle) => {
        if (targetMuscles.includes(muscle)) {
            setTargetMuscles(targetMuscles.filter(m => m !== muscle));
        }
        else {
            setTargetMuscles([...targetMuscles, muscle]);
        }
    };
    const handleAddCustomMuscle = () => {
        if (customMuscle.trim() && !targetMuscles.includes(customMuscle.trim())) {
            setTargetMuscles([...targetMuscles, customMuscle.trim()]);
            setCustomMuscle('');
        }
    };
    const handleExerciseChange = (index, field, value) => {
        const newExercises = [...exercises];
        newExercises[index] = {
            ...newExercises[index],
            [field]: value,
        };
        setExercises(newExercises);
    };
    const handleFormTipChange = (exerciseIndex, tipIndex, value) => {
        const newExercises = [...exercises];
        newExercises[exerciseIndex].formTips[tipIndex] = value;
        setExercises(newExercises);
    };
    const addFormTip = (exerciseIndex) => {
        const newExercises = [...exercises];
        newExercises[exerciseIndex].formTips.push('');
        setExercises(newExercises);
    };
    const removeFormTip = (exerciseIndex, tipIndex) => {
        const newExercises = [...exercises];
        newExercises[exerciseIndex].formTips.splice(tipIndex, 1);
        setExercises(newExercises);
    };
    const addExercise = () => {
        setExercises([
            ...exercises,
            {
                id: `ex-${uuidv4().substring(0, 8)}`,
                name: '',
                description: '',
                sets: 3,
                reps: 10,
                restTime: 60,
                formTips: [''],
                hasDuration: false,
            }
        ]);
    };
    const removeExercise = (index) => {
        if (exercises.length > 1) {
            const newExercises = [...exercises];
            newExercises.splice(index, 1);
            setExercises(newExercises);
        }
    };
    const toggleExerciseType = (index) => {
        const newExercises = [...exercises];
        newExercises[index].hasDuration = !newExercises[index].hasDuration;
        // If switching to duration, remove sets/reps and add duration
        if (newExercises[index].hasDuration) {
            delete newExercises[index].sets;
            delete newExercises[index].reps;
            newExercises[index].duration = 60; // 1 minute default
        }
        else {
            // If switching to sets/reps, remove duration and add sets/reps
            delete newExercises[index].duration;
            newExercises[index].sets = 3;
            newExercises[index].reps = 10;
        }
        setExercises(newExercises);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Clean up the exercises to ensure proper format
        const formattedExercises = exercises.map(ex => {
            // Remove empty form tips
            const formTips = ex.formTips.filter((tip) => tip.trim() !== '');
            // Create a clean exercise object without the hasDuration flag
            const { hasDuration, ...cleanEx } = ex;
            return {
                ...cleanEx,
                formTips,
            };
        });
        // Create the final workout object
        const newWorkout = {
            id: `workout-${uuidv4().substring(0, 8)}`,
            title: formData.title,
            description: formData.description,
            duration: formData.duration,
            difficulty: formData.difficulty,
            category: formData.category,
            exercises: formattedExercises,
            targetMuscles,
            sportsFocus: formData.sportsFocus || undefined,
            aiGenerated: false,
        };
        // Add the workout to the store
        addWorkout(newWorkout);
        onClose();
    };
    const commonMuscles = [
        'chest', 'back', 'shoulders', 'biceps', 'triceps',
        'quadriceps', 'hamstrings', 'glutes', 'calves', 'core', 'full body'
    ];
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsx("div", { className: "bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto", children: _jsx("form", { onSubmit: handleSubmit, children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-900", children: "Create New Workout" }), _jsx("button", { type: "button", onClick: onClose, className: "text-gray-400 hover:text-gray-500", children: _jsx(X, { className: "h-6 w-6" }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700 mb-1", children: "Workout Title" }), _jsx("input", { type: "text", id: "title", name: "title", value: formData.title, onChange: handleInputChange, placeholder: "e.g., Upper Body Strength, HIIT Cardio", className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm", required: true })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }), _jsx("textarea", { id: "description", name: "description", value: formData.description, onChange: handleInputChange, placeholder: "Brief description of the workout", rows: 2, className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "duration", className: "block text-sm font-medium text-gray-700 mb-1", children: "Duration (minutes)" }), _jsx("input", { type: "number", id: "duration", name: "duration", min: "5", max: "180", value: formData.duration, onChange: handleInputChange, className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "difficulty", className: "block text-sm font-medium text-gray-700 mb-1", children: "Difficulty" }), _jsxs("select", { id: "difficulty", name: "difficulty", value: formData.difficulty, onChange: handleInputChange, className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm", children: [_jsx("option", { value: "beginner", children: "Beginner" }), _jsx("option", { value: "intermediate", children: "Intermediate" }), _jsx("option", { value: "advanced", children: "Advanced" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "category", className: "block text-sm font-medium text-gray-700 mb-1", children: "Category" }), _jsxs("select", { id: "category", name: "category", value: formData.category, onChange: handleInputChange, className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm", children: [_jsx("option", { value: "strength", children: "Strength" }), _jsx("option", { value: "cardio", children: "Cardio" }), _jsx("option", { value: "hiit", children: "HIIT" }), _jsx("option", { value: "recovery", children: "Recovery" }), _jsx("option", { value: "sport-specific", children: "Sport Specific" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "sportsFocus", className: "block text-sm font-medium text-gray-700 mb-1", children: "Sport Focus (Optional)" }), _jsx("input", { type: "text", id: "sportsFocus", name: "sportsFocus", value: formData.sportsFocus, onChange: handleInputChange, placeholder: "e.g., Basketball, Running, etc.", className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Target Muscles" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: commonMuscles.map(muscle => (_jsx("button", { type: "button", onClick: () => handleMuscleToggle(muscle), className: `px-2.5 py-1 rounded-full text-xs font-medium ${targetMuscles.includes(muscle)
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'}`, children: muscle }, muscle))) }), _jsxs("div", { className: "mt-2 flex", children: [_jsx("input", { type: "text", value: customMuscle, onChange: (e) => setCustomMuscle(e.target.value), placeholder: "Add custom muscle group", className: "block w-full px-3 py-2 border border-gray-300 rounded-md rounded-r-none shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" }), _jsx("button", { type: "button", onClick: handleAddCustomMuscle, className: "inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100", children: _jsx(Plus, { className: "h-4 w-4" }) })] })] })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Exercises" }), _jsxs("button", { type: "button", onClick: addExercise, className: "inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50", children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), "Add Exercise"] })] }), _jsx("div", { className: "space-y-6", children: exercises.map((exercise, index) => (_jsxs("div", { className: "border border-gray-200 rounded-lg p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("h4", { className: "text-md font-medium text-gray-900", children: ["Exercise ", index + 1] }), exercises.length > 1 && (_jsx("button", { type: "button", onClick: () => removeExercise(index), className: "text-red-600 hover:text-red-700", children: _jsx(Trash2, { className: "h-5 w-5" }) }))] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { htmlFor: `exercise-name-${index}`, className: "block text-sm font-medium text-gray-700 mb-1", children: "Exercise Name" }), _jsx("input", { type: "text", id: `exercise-name-${index}`, value: exercise.name, onChange: (e) => handleExerciseChange(index, 'name', e.target.value), placeholder: "e.g., Bench Press, Squats", className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm", required: true })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { htmlFor: `exercise-desc-${index}`, className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }), _jsx("input", { type: "text", id: `exercise-desc-${index}`, value: exercise.description, onChange: (e) => handleExerciseChange(index, 'description', e.target.value), placeholder: "Brief description", className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" })] }), _jsxs("div", { className: "md:col-span-2 flex items-center mb-2", children: [_jsx("span", { className: "text-sm text-gray-700 mr-3", children: "Exercise Type:" }), _jsxs("div", { className: "flex rounded-md", children: [_jsx("button", { type: "button", onClick: () => !exercise.hasDuration && toggleExerciseType(index), className: `px-3 py-1.5 rounded-l-md text-sm ${!exercise.hasDuration
                                                                            ? 'bg-yellow-100 text-yellow-800 font-medium'
                                                                            : 'bg-gray-100 text-gray-600'}`, children: "Sets & Reps" }), _jsx("button", { type: "button", onClick: () => exercise.hasDuration && toggleExerciseType(index), className: `px-3 py-1.5 rounded-r-md text-sm ${exercise.hasDuration
                                                                            ? 'bg-yellow-100 text-yellow-800 font-medium'
                                                                            : 'bg-gray-100 text-gray-600'}`, children: "Duration" })] })] }), exercise.hasDuration ? (_jsxs("div", { children: [_jsx("label", { htmlFor: `exercise-duration-${index}`, className: "block text-sm font-medium text-gray-700 mb-1", children: "Duration (seconds)" }), _jsx("input", { type: "number", id: `exercise-duration-${index}`, value: exercise.duration || 60, onChange: (e) => handleExerciseChange(index, 'duration', parseInt(e.target.value)), min: "5", className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm", required: true })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("label", { htmlFor: `exercise-sets-${index}`, className: "block text-sm font-medium text-gray-700 mb-1", children: "Sets" }), _jsx("input", { type: "number", id: `exercise-sets-${index}`, value: exercise.sets || 3, onChange: (e) => handleExerciseChange(index, 'sets', parseInt(e.target.value)), min: "1", className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: `exercise-reps-${index}`, className: "block text-sm font-medium text-gray-700 mb-1", children: "Reps" }), _jsx("input", { type: "number", id: `exercise-reps-${index}`, value: exercise.reps || 10, onChange: (e) => handleExerciseChange(index, 'reps', parseInt(e.target.value)), min: "1", className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm", required: true })] })] })), _jsxs("div", { children: [_jsx("label", { htmlFor: `exercise-rest-${index}`, className: "block text-sm font-medium text-gray-700 mb-1", children: "Rest Time (seconds)" }), _jsx("input", { type: "number", id: `exercise-rest-${index}`, value: exercise.restTime, onChange: (e) => handleExerciseChange(index, 'restTime', parseInt(e.target.value)), min: "0", className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Form Tips" }), exercise.formTips.map((tip, tipIndex) => (_jsxs("div", { className: "flex mb-2", children: [_jsx("input", { type: "text", value: tip, onChange: (e) => handleFormTipChange(index, tipIndex, e.target.value), placeholder: `Form tip ${tipIndex + 1}`, className: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm rounded-r-none focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm" }), _jsx("button", { type: "button", onClick: () => {
                                                                            if (exercise.formTips.length > 1) {
                                                                                removeFormTip(index, tipIndex);
                                                                            }
                                                                            else {
                                                                                handleFormTipChange(index, tipIndex, '');
                                                                            }
                                                                        }, className: "inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-red-600 hover:text-red-700", children: _jsx(X, { className: "h-4 w-4" }) })] }, tipIndex))), _jsxs("button", { type: "button", onClick: () => addFormTip(index), className: "inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50", children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), "Add Tip"] })] })] })] }, exercise.id))) })] }), _jsxs("div", { className: "flex justify-end", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mr-3", children: "Cancel" }), _jsxs("button", { type: "submit", className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500", children: [_jsx(Save, { className: "mr-2 h-5 w-5" }), "Create Workout"] })] })] }) }) }) }));
};
export default WorkoutCreator;
