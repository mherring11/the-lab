import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { XCircleIcon, PlusCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import HIITTimer from '../components/HIITTimer';
function WorkoutLogger() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
    const [notes, setNotes] = useState('');
    const [exercises, setExercises] = useState([{
            exercise_name: '',
            sets: '',
            reps: '',
            weight: ''
        }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [recentWorkouts, setRecentWorkouts] = useState([]);
    // New features
    const [timerActive, setTimerActive] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(60);
    const [timerInitialValue, setTimerInitialValue] = useState(60);
    const [activeTimer, setActiveTimer] = useState('rest');
    // Popular exercises for suggestions
    const exerciseSuggestions = {
        "Chest": ["Bench Press", "Incline Bench Press", "Chest Fly", "Push-Ups", "Dumbbell Press"],
        "Back": ["Pull-Ups", "Lat Pulldown", "Barbell Row", "Deadlift", "Cable Row"],
        "Legs": ["Squat", "Leg Press", "Leg Extension", "Leg Curl", "Calf Raise"],
        "Shoulders": ["Overhead Press", "Lateral Raise", "Front Raise", "Face Pull", "Shrug"],
        "Arms": ["Bicep Curl", "Tricep Extension", "Hammer Curl", "Skull Crusher", "Dips"],
        "Core": ["Plank", "Crunch", "Leg Raise", "Russian Twist", "Ab Wheel"]
    };
    // Workout templates
    const workoutTemplates = [
        {
            name: "Push Day",
            exercises: [
                { exercise_name: "Bench Press", sets: 4, reps: 8, weight: 135 },
                { exercise_name: "Overhead Press", sets: 4, reps: 10, weight: 95 },
                { exercise_name: "Incline Bench Press", sets: 3, reps: 12, weight: 115 },
                { exercise_name: "Lateral Raise", sets: 3, reps: 15, weight: 15 },
                { exercise_name: "Tricep Extension", sets: 3, reps: 12, weight: 30 }
            ]
        },
        {
            name: "Pull Day",
            exercises: [
                { exercise_name: "Deadlift", sets: 4, reps: 6, weight: 225 },
                { exercise_name: "Pull-Ups", sets: 4, reps: 8, weight: 0 },
                { exercise_name: "Barbell Row", sets: 3, reps: 10, weight: 135 },
                { exercise_name: "Face Pull", sets: 3, reps: 15, weight: 50 },
                { exercise_name: "Bicep Curl", sets: 3, reps: 12, weight: 25 }
            ]
        },
        {
            name: "Leg Day",
            exercises: [
                { exercise_name: "Squat", sets: 4, reps: 8, weight: 185 },
                { exercise_name: "Leg Press", sets: 3, reps: 12, weight: 315 },
                { exercise_name: "Romanian Deadlift", sets: 3, reps: 10, weight: 155 },
                { exercise_name: "Leg Extension", sets: 3, reps: 12, weight: 90 },
                { exercise_name: "Calf Raise", sets: 4, reps: 15, weight: 135 }
            ]
        }
    ];
    // Fetch recent workouts on component mount
    useEffect(() => {
        fetchRecentWorkouts();
    }, []);
    // Timer effect
    useEffect(() => {
        let interval;
        if (timerActive && timerSeconds > 0) {
            interval = setInterval(() => {
                setTimerSeconds(seconds => seconds - 1);
            }, 1000);
        }
        else if (timerActive && timerSeconds === 0) {
            setTimerActive(false);
            // Play notification sound or vibrate
            if ('vibrate' in navigator) {
                navigator.vibrate([200, 100, 200]);
            }
        }
        return () => clearInterval(interval);
    }, [timerActive, timerSeconds]);
    const fetchRecentWorkouts = async () => {
        try {
            const { data, error } = await supabase
                .from('workouts')
                .select('*')
                .order('workout_date', { ascending: false })
                .limit(3);
            if (error)
                throw error;
            setRecentWorkouts(data || []);
        }
        catch (error) {
            console.error('Error fetching recent workouts:', error);
        }
    };
    const startTimer = () => {
        setTimerSeconds(timerInitialValue);
        setTimerActive(true);
    };
    const stopTimer = () => {
        setTimerActive(false);
    };
    const resetTimer = () => {
        setTimerActive(false);
        setTimerSeconds(timerInitialValue);
    };
    const addExercise = () => {
        setExercises([...exercises, { exercise_name: '', sets: '', reps: '', weight: '' }]);
    };
    const removeExercise = (index) => {
        const newExercises = [...exercises];
        newExercises.splice(index, 1);
        setExercises(newExercises);
    };
    const updateExercise = (index, field, value) => {
        const newExercises = [...exercises];
        newExercises[index] = {
            ...newExercises[index],
            [field]: value
        };
        setExercises(newExercises);
    };
    const applyTemplate = (template) => {
        setName(template.name);
        setExercises(template.exercises);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Insert workout
            const { data: workout, error: workoutError } = await supabase
                .from('workouts')
                .insert([
                { name, workout_date: workoutDate, notes }
            ])
                .select();
            if (workoutError)
                throw workoutError;
            // Insert exercises
            const exercisesWithWorkoutId = exercises
                .filter(ex => ex.exercise_name.trim())
                .map(ex => ({
                ...ex,
                workout_id: workout[0].id
            }));
            if (exercisesWithWorkoutId.length > 0) {
                const { error: exercisesError } = await supabase
                    .from('exercise_entries')
                    .insert(exercisesWithWorkoutId);
                if (exercisesError)
                    throw exercisesError;
            }
            setSuccess(true);
            fetchRecentWorkouts(); // Refresh recent workouts
            setTimeout(() => {
                setSuccess(false);
                navigate('/dashboard');
            }, 1500);
        }
        catch (error) {
            setError(error.message || 'An error occurred while saving the workout');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "py-8 px-4 md:px-8 max-w-6xl mx-auto", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [_jsx("div", { className: "md:w-2/3", children: _jsxs("div", { className: "bg-white shadow-md rounded-lg p-6 mb-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-6 text-gray-800 border-b pb-2", children: "Log Your Workout" }), error && (_jsx("div", { className: "mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700", children: _jsx("p", { children: error }) })), success && (_jsxs("div", { className: "mb-4 bg-green-50 border-l-4 border-green-500 p-4 text-green-700 flex items-center", children: [_jsx(CheckCircleIcon, { className: "h-5 w-5 mr-2" }), _jsx("p", { children: "Workout saved successfully!" })] })), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-1", children: "Workout Name" }), _jsx("input", { id: "name", type: "text", value: name, onChange: (e) => setName(e.target.value), placeholder: "Push Day, Leg Day, etc.", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "workout-date", className: "block text-sm font-medium text-gray-700 mb-1", children: "Date" }), _jsx("input", { id: "workout-date", type: "date", value: workoutDate, onChange: (e) => setWorkoutDate(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", required: true })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { htmlFor: "notes", className: "block text-sm font-medium text-gray-700 mb-1", children: "Notes" }), _jsx("textarea", { id: "notes", value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "How did it go? Any PRs? How was your energy level?", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20" })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-800", children: "Exercises" }), _jsxs("button", { type: "button", onClick: addExercise, className: "inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors", children: [_jsx(PlusCircleIcon, { className: "h-4 w-4 mr-1" }), "Add Exercise"] })] }), exercises.map((exercise, index) => (_jsxs("div", { className: "bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { className: "w-full", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Exercise Name" }), _jsx("input", { type: "text", value: exercise.exercise_name, onChange: (e) => updateExercise(index, 'exercise_name', e.target.value), placeholder: "Bench Press, Squat, etc.", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", list: `exercises-${index}`, required: true }), _jsx("datalist", { id: `exercises-${index}`, children: Object.values(exerciseSuggestions).flat().map((ex, i) => (_jsx("option", { value: ex }, i))) })] }), exercises.length > 1 && (_jsx("button", { type: "button", onClick: () => removeExercise(index), className: "ml-2 text-red-500 hover:text-red-700 transition-colors", children: _jsx(XCircleIcon, { className: "h-5 w-5" }) }))] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Sets" }), _jsx("input", { type: "number", value: exercise.sets, onChange: (e) => updateExercise(index, 'sets', e.target.value), placeholder: "3", min: "1", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Reps" }), _jsx("input", { type: "number", value: exercise.reps, onChange: (e) => updateExercise(index, 'reps', e.target.value), placeholder: "10", min: "1", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Weight (lbs)" }), _jsx("input", { type: "number", value: exercise.weight, onChange: (e) => updateExercise(index, 'weight', e.target.value), placeholder: "135", min: "0", step: "2.5", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] })] }, index)))] }), _jsx("div", { className: "mt-6", children: _jsx("button", { type: "submit", disabled: loading, className: "w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors", children: loading ? 'Saving...' : 'Save Workout' }) })] })] }) }), _jsxs("div", { className: "md:w-1/3", children: [_jsxs("div", { className: "bg-white shadow-md rounded-lg overflow-hidden mb-6", children: [_jsx("div", { className: "border-b border-gray-200", children: _jsxs("div", { className: "flex", children: [_jsx("button", { onClick: () => setActiveTimer('rest'), className: `px-4 py-3 font-medium text-sm flex-1 ${activeTimer === 'rest'
                                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                                    : 'text-gray-500 hover:text-gray-700'}`, children: "Rest Timer" }), _jsx("button", { onClick: () => setActiveTimer('hiit'), className: `px-4 py-3 font-medium text-sm flex-1 ${activeTimer === 'hiit'
                                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                                    : 'text-gray-500 hover:text-gray-700'}`, children: "HIIT Timer" })] }) }), activeTimer === 'rest' ? (
                                /* Your existing Rest Timer */
                                _jsxs("div", { className: "p-6", children: [_jsxs("h2", { className: "text-lg font-semibold text-gray-800 mb-4 flex items-center", children: [_jsx(ClockIcon, { className: "h-5 w-5 mr-2 text-blue-500" }), "Rest Timer"] }), _jsxs("div", { className: "text-center mb-4", children: [_jsxs("div", { className: "text-4xl font-bold mb-3", children: [Math.floor(timerSeconds / 60), ":", (timerSeconds % 60).toString().padStart(2, '0')] }), _jsxs("div", { className: "flex justify-center gap-2 mb-4", children: [!timerActive ? (_jsx("button", { onClick: startTimer, className: "px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors", children: "Start" })) : (_jsx("button", { onClick: stopTimer, className: "px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors", children: "Pause" })), _jsx("button", { onClick: resetTimer, className: "px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors", children: "Reset" })] }), _jsx("div", { className: "flex justify-center gap-2", children: [30, 60, 90, 120].map(seconds => (_jsxs("button", { onClick: () => {
                                                            setTimerInitialValue(seconds);
                                                            setTimerSeconds(seconds);
                                                        }, className: `px-3 py-1 text-sm rounded-md transition-colors ${timerInitialValue === seconds
                                                            ? 'bg-blue-100 text-blue-800 font-medium'
                                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`, children: [seconds, "s"] }, seconds))) })] })] })) : (
                                /* New HIIT Timer */
                                _jsx(HIITTimer, {}))] }), _jsxs("div", { className: "bg-white shadow-md rounded-lg p-6 mb-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Workout Templates" }), _jsx("div", { className: "space-y-2", children: workoutTemplates.map((template, index) => (_jsxs("button", { onClick: () => applyTemplate(template), className: "w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors", children: [_jsx("div", { className: "font-medium text-gray-800", children: template.name }), _jsxs("div", { className: "text-sm text-gray-500", children: [template.exercises.length, " exercises"] })] }, index))) })] }), _jsxs("div", { className: "bg-white shadow-md rounded-lg p-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Recent Workouts" }), recentWorkouts.length > 0 ? (_jsx("div", { className: "space-y-4", children: recentWorkouts.map(workout => (_jsxs("div", { className: "border-b pb-3 last:border-b-0 last:pb-0", children: [_jsx("div", { className: "font-medium", children: workout.name }), _jsx("div", { className: "text-sm text-gray-500", children: new Date(workout.workout_date).toLocaleDateString() })] }, workout.id))) })) : (_jsx("p", { className: "text-gray-500", children: "No recent workouts found" }))] })] })] }) }));
}
import withSubscriptionGuard from '../components/SubscriptionGuard';
export default withSubscriptionGuard(WorkoutLogger);
