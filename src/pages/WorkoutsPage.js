import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// @ts-nocheck
// Add this at the top of the file to temporarily ignore all TypeScript errors in this file
import { useState, useEffect } from 'react';
import { Plus, Filter, Search, Brain, Camera, Dumbbell, Trash2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppStore } from '../store';
import WorkoutCard, { convertWorkout } from '../components/WorkoutCard';
import AIWorkoutGenerator from '../components/AIWorkoutGenerator';
import WorkoutCreator from '../components/WorkoutCreator';
import withSubscriptionGuard from '../components/SubscriptionGuard';
const WorkoutsPage = () => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showAIGenerator, setShowAIGenerator] = useState(false);
    const [showFormAnalysis, setShowFormAnalysis] = useState(false);
    const [showWorkoutCreator, setShowWorkoutCreator] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [workoutDetails, setWorkoutDetails] = useState(null);
    // Get workouts from the store
    const storeWorkouts = useAppStore((state) => state.workouts);
    const deleteWorkout = useAppStore((state) => state.deleteWorkout);
    // Combine mock workouts with store workouts initially
    // Later you can remove mockWorkouts completely
    const [allWorkouts, setAllWorkouts] = useState([]);
    // Initialize with mock data + store data
    useEffect(() => {
        // Convert store workouts to component workouts
        const convertedWorkouts = storeWorkouts.map(workout => convertWorkout(workout));
        setAllWorkouts([...mockWorkouts, ...convertedWorkouts]);
    }, [storeWorkouts]);
    // Mock workouts data (you can keep this for initial data, then remove later)
    const mockWorkouts = [
        {
            id: 'workout-1',
            title: 'Full Body HIIT',
            description: 'High-intensity interval training targeting all major muscle groups',
            duration: 45,
            difficulty: 'intermediate',
            category: 'hiit',
            exercises: [
                {
                    id: 'ex1',
                    name: 'Jumping Jacks',
                    description: 'Full body exercise to get your heart rate up',
                    duration: 60,
                    formTips: ['Keep your core engaged', 'Land softly on your feet']
                },
                {
                    id: 'ex2',
                    name: 'Push-ups',
                    description: 'Upper body strength exercise',
                    sets: 3,
                    reps: 12,
                    restTime: 30,
                    formTips: ['Keep your body in a straight line', 'Lower your chest to the ground']
                },
                {
                    id: 'ex3',
                    name: 'Squats',
                    description: 'Lower body strength exercise',
                    sets: 3,
                    reps: 15,
                    restTime: 30,
                    formTips: ['Keep your knees aligned with your toes', 'Lower until thighs are parallel to the ground']
                }
            ],
            targetMuscles: ['core', 'legs', 'chest', 'back'],
            aiGenerated: false
        },
        {
            id: 'workout-2',
            title: 'Speed & Agility',
            description: 'Improve your sprint mechanics and change of direction',
            duration: 30,
            difficulty: 'advanced',
            category: 'sport-specific',
            exercises: [
                {
                    id: 'ex1',
                    name: 'Ladder Drills',
                    description: 'Improve foot speed and coordination',
                    duration: 180,
                    formTips: ['Quick feet', 'Look ahead, not down']
                },
                {
                    id: 'ex2',
                    name: 'Cone Shuttles',
                    description: 'Improve change of direction',
                    sets: 4,
                    reps: 5,
                    restTime: 60,
                    formTips: ['Low center of gravity when changing direction', 'Powerful first step']
                }
            ],
            targetMuscles: ['legs', 'core'],
            sportsFocus: 'Basketball',
            aiGenerated: true
        },
        {
            id: 'workout-3',
            title: 'Upper Body Strength',
            description: 'Build strength in your chest, back, shoulders, and arms',
            duration: 50,
            difficulty: 'intermediate',
            category: 'strength',
            exercises: [
                {
                    id: 'ex1',
                    name: 'Bench Press',
                    description: 'Compound chest exercise',
                    sets: 4,
                    reps: 8,
                    restTime: 90,
                    formTips: ['Keep feet flat on the floor', 'Lower bar to mid-chest']
                },
                {
                    id: 'ex2',
                    name: 'Bent-Over Rows',
                    description: 'Back strengthening exercise',
                    sets: 4,
                    reps: 10,
                    restTime: 90,
                    formTips: ['Maintain neutral spine', 'Pull elbows back']
                }
            ],
            targetMuscles: ['chest', 'back', 'shoulders', 'arms'],
            aiGenerated: false
        }
    ];
    // Filter workouts based on search and category
    const filteredWorkouts = allWorkouts.filter(workout => {
        const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            workout.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || workout.category === filterCategory;
        return matchesSearch && matchesCategory;
    });
    // Function to handle workout deletion
    const handleDeleteWorkout = (id) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            // Check if it's a mock workout or a store workout
            const isMockWorkout = mockWorkouts.some(w => w.id === id);
            if (isMockWorkout) {
                // For mock data, just filter it out of the allWorkouts array
                setAllWorkouts(allWorkouts.filter(w => w.id !== id));
            }
            else {
                // For store data, use the store's delete function
                deleteWorkout(id);
            }
            // Close the detail view if open
            if (selectedWorkout === id) {
                setSelectedWorkout(null);
                setWorkoutDetails(null);
            }
        }
    };
    const selectedWorkoutDetails = selectedWorkout
        ? allWorkouts.find(w => w.id === selectedWorkout)
        : null;
    // Function to view AI-generated workout details
    const viewWorkoutDetails = async (workout) => {
        if (workout.aiGenerated) {
            setWorkoutDetails("Loading workout details...");
            try {
                // In a real implementation, you might fetch the full details from an API
                // For now, we'll just display the existing details in a more readable format
                const details = `
# ${workout.title}

${workout.description}

**Duration:** ${workout.duration} minutes
**Difficulty:** ${workout.difficulty}
**Target Muscles:** ${workout.targetMuscles.join(', ')}

## Exercises

${workout.exercises.map((ex, i) => `
### ${i + 1}. ${ex.name}
${ex.description}

${ex.sets && ex.reps ? `**Sets:** ${ex.sets} | **Reps:** ${ex.reps}` :
                    ex.duration ? `**Duration:** ${Math.floor(ex.duration / 60)}:${(ex.duration % 60).toString().padStart(2, '0')}` : ''}
${ex.restTime ? `**Rest:** ${ex.restTime} seconds` : ''}

**Form Tips:**
${ex.formTips.map(tip => `- ${tip}`).join('\n')}
`).join('\n')}
        `;
                setWorkoutDetails(details);
            }
            catch (error) {
                console.error('Error fetching workout details:', error);
                setWorkoutDetails("Error loading workout details. Please try again.");
            }
        }
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("div", { className: "md:flex md:items-center md:justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Your Workouts" }), _jsx("p", { className: "text-gray-500", children: "Browse and create personalized training sessions" })] }), _jsxs("div", { className: "mt-4 md:mt-0 flex space-x-3", children: [_jsxs("button", { onClick: () => setShowFormAnalysis(true), className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500", children: [_jsx(Camera, { className: "mr-2 h-5 w-5" }), "Form Analysis"] }), _jsxs("button", { onClick: () => setShowAIGenerator(true), className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500", children: [_jsx(Brain, { className: "mr-2 h-5 w-5" }), "AI Generate"] }), _jsxs("button", { onClick: () => setShowWorkoutCreator(true), className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500", children: [_jsx(Plus, { className: "mr-2 h-5 w-5 text-gray-400" }), "Create Workout"] })] })] }), _jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6", children: _jsxs("div", { className: "md:flex md:items-center md:justify-between", children: [_jsxs("div", { className: "relative flex-1 max-w-lg", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm", placeholder: "Search workouts..." })] }), _jsxs("div", { className: "mt-4 md:mt-0 flex items-center", children: [_jsx(Filter, { className: "h-5 w-5 text-gray-400 mr-2" }), _jsxs("select", { value: filterCategory, onChange: (e) => setFilterCategory(e.target.value), className: "block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md", children: [_jsx("option", { value: "all", children: "All Categories" }), _jsx("option", { value: "strength", children: "Strength" }), _jsx("option", { value: "cardio", children: "Cardio" }), _jsx("option", { value: "hiit", children: "HIIT" }), _jsx("option", { value: "recovery", children: "Recovery" }), _jsx("option", { value: "sport-specific", children: "Sport Specific" })] })] })] }) }), filteredWorkouts.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredWorkouts.map((workout) => (_jsx(WorkoutCard, { workout: workout, onClick: () => {
                        setSelectedWorkout(workout.id);
                        if (workout.aiGenerated) {
                            viewWorkoutDetails(workout);
                        }
                    } }, workout.id))) })) : (_jsxs("div", { className: "bg-white shadow rounded-lg p-8 text-center", children: [_jsx("div", { className: "mx-auto w-16 h-16 bg-yellow-50 flex items-center justify-center rounded-full mb-4", children: _jsx(Dumbbell, { className: "h-8 w-8 text-yellow-500" }) }), _jsx("h2", { className: "text-lg font-medium mb-2", children: "No workouts found" }), _jsx("p", { className: "text-gray-500 mb-6", children: "Try adjusting your filters or create a new workout." }), _jsxs("div", { className: "flex justify-center space-x-4", children: [_jsxs("button", { onClick: () => setShowAIGenerator(true), className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600", children: [_jsx(Brain, { className: "mr-2 h-5 w-5" }), "Generate with AI"] }), _jsxs("button", { onClick: () => setShowWorkoutCreator(true), className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50", children: [_jsx(Plus, { className: "mr-2 h-5 w-5 text-gray-400" }), "Create Manually"] })] })] })), selectedWorkoutDetails && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", children: _jsx("div", { className: "bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-yellow-50 p-2 rounded-full mr-3", children: _jsx(Dumbbell, { className: "h-6 w-6 text-yellow-500" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold text-gray-900", children: selectedWorkoutDetails.title }), _jsx("p", { className: "text-gray-500", children: selectedWorkoutDetails.description })] })] }), _jsx("button", { onClick: () => {
                                            setSelectedWorkout(null);
                                            setWorkoutDetails(null);
                                        }, className: "text-gray-400 hover:text-gray-500", children: _jsx(X, { className: "h-6 w-6" }) })] }), _jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [_jsxs("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: [selectedWorkoutDetails.duration, " min"] }), _jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize", children: selectedWorkoutDetails.difficulty }), _jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize", children: selectedWorkoutDetails.category }), selectedWorkoutDetails.sportsFocus && (_jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", children: selectedWorkoutDetails.sportsFocus })), selectedWorkoutDetails.aiGenerated && (_jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800", children: "AI Generated" }))] }), selectedWorkoutDetails.aiGenerated && workoutDetails ? (_jsx("div", { className: "mb-6 bg-gray-50 p-4 rounded-lg", children: _jsx("pre", { className: "whitespace-pre-line text-sm text-gray-700", children: workoutDetails }) })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Target Muscles" }), _jsx("div", { className: "flex flex-wrap gap-2", children: selectedWorkoutDetails.targetMuscles.map((muscle, index) => (_jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize", children: muscle }, index))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Exercises" }), _jsx("div", { className: "space-y-4", children: selectedWorkoutDetails.exercises.map((exercise, index) => (_jsxs("div", { className: "bg-gray-50 p-4 rounded-lg", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs("h4", { className: "text-md font-medium text-gray-900", children: [index + 1, ". ", exercise.name] }), _jsx("p", { className: "text-sm text-gray-500", children: exercise.description })] }), _jsxs("div", { className: "text-right text-sm", children: [exercise.sets && exercise.reps && (_jsxs("p", { className: "text-gray-700", children: [exercise.sets, " sets \u00D7 ", exercise.reps, " reps"] })), exercise.duration && (_jsxs("p", { className: "text-gray-700", children: [Math.floor(exercise.duration / 60), ":", (exercise.duration % 60).toString().padStart(2, '0')] })), exercise.restTime && (_jsxs("p", { className: "text-gray-500", children: ["Rest: ", exercise.restTime, "s"] }))] })] }), exercise.formTips && exercise.formTips.length > 0 && (_jsxs("div", { className: "mt-2", children: [_jsx("h5", { className: "text-xs font-medium text-gray-700", children: "Form Tips:" }), _jsx("ul", { className: "text-xs text-gray-600 list-disc list-inside", children: exercise.formTips.map((tip, tipIndex) => (_jsx("li", { children: tip }, tipIndex))) })] }))] }, exercise.id))) })] })] })), _jsxs("div", { className: "mt-6 flex justify-between", children: [_jsxs("button", { onClick: () => handleDeleteWorkout(selectedWorkoutDetails.id), className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50", children: [_jsx(Trash2, { className: "mr-2 h-5 w-5" }), "Delete Workout"] }), _jsx("button", { onClick: () => {
                                            setSelectedWorkout(null);
                                            setWorkoutDetails(null);
                                        }, className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600", children: "Close" })] })] }) }) })), showAIGenerator && (_jsx(AIWorkoutGenerator, { onClose: () => setShowAIGenerator(false) })), showFormAnalysis && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg p-6 max-w-lg w-full", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Form Analysis" }), _jsx("p", { className: "mb-4", children: "This feature will be implemented in the next step." }), _jsx("button", { onClick: () => setShowFormAnalysis(false), className: "px-4 py-2 bg-yellow-500 text-white rounded-md", children: "Close" })] }) })), showWorkoutCreator && (_jsx(WorkoutCreator, { onClose: () => setShowWorkoutCreator(false) }))] }));
};
// Export the protected version of the component
export default withSubscriptionGuard(WorkoutsPage);
