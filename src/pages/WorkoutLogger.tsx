import { useState, FormEvent, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { XCircleIcon, PlusCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import HIITTimer from '../components/HIITTimer';

interface ExerciseEntry {
  exercise_name: string;
  sets: string | number;
  reps: string | number;
  weight: string | number;
}

interface WorkoutTemplate {
  name: string;
  exercises: ExerciseEntry[];
}

function WorkoutLogger() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [workoutDate, setWorkoutDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState<string>('');
  const [exercises, setExercises] = useState<ExerciseEntry[]>([{ 
    exercise_name: '', 
    sets: '', 
    reps: '', 
    weight: '' 
  }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [recentWorkouts, setRecentWorkouts] = useState<any[]>([]);
  
  // New features
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [timerInitialValue, setTimerInitialValue] = useState<number>(60);
  const [activeTimer, setActiveTimer] = useState<'rest' | 'hiit'>('rest');
  
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
  const workoutTemplates: WorkoutTemplate[] = [
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
    let interval: ReturnType<typeof setInterval>;
    
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (timerActive && timerSeconds === 0) {
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
        
      if (error) throw error;
      setRecentWorkouts(data || []);
    } catch (error) {
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

  const removeExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  const updateExercise = (index: number, field: keyof ExerciseEntry, value: string | number) => {
    const newExercises = [...exercises];
    newExercises[index] = {
      ...newExercises[index],
      [field]: value
    };
    setExercises(newExercises);
  };

  const applyTemplate = (template: WorkoutTemplate) => {
    setName(template.name);
    setExercises(template.exercises);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

      if (workoutError) throw workoutError;

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

        if (exercisesError) throw exercisesError;
      }
      
      setSuccess(true);
      fetchRecentWorkouts(); // Refresh recent workouts
      
      setTimeout(() => {
        setSuccess(false);
        navigate('/dashboard');
      }, 1500);
      
    } catch (error: any) {
      setError(error.message || 'An error occurred while saving the workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Form */}
        <div className="md:w-2/3">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Log Your Workout</h1>
            
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 text-green-700 flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                <p>Workout saved successfully!</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Workout Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Push Day, Leg Day, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="workout-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    id="workout-date"
                    type="date"
                    value={workoutDate}
                    onChange={(e) => setWorkoutDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="How did it go? Any PRs? How was your energy level?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                ></textarea>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Exercises</h2>
                  <button 
                    type="button" 
                    onClick={addExercise}
                    className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <PlusCircleIcon className="h-4 w-4 mr-1" />
                    Add Exercise
                  </button>
                </div>
                
                {exercises.map((exercise, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Exercise Name
                        </label>
                        <input
                          type="text"
                          value={exercise.exercise_name}
                          onChange={(e) => updateExercise(index, 'exercise_name', e.target.value)}
                          placeholder="Bench Press, Squat, etc."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          list={`exercises-${index}`}
                          required
                        />
                        <datalist id={`exercises-${index}`}>
                          {Object.values(exerciseSuggestions).flat().map((ex, i) => (
                            <option key={i} value={ex} />
                          ))}
                        </datalist>
                      </div>
                      
                      {exercises.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeExercise(index)}
                          className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <XCircleIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sets
                        </label>
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                          placeholder="3"
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Reps
                        </label>
                        <input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                          placeholder="10"
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Weight (lbs)
                        </label>
                        <input
                          type="number"
                          value={exercise.weight}
                          onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                          placeholder="135"
                          min="0"
                          step="2.5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {loading ? 'Saving...' : 'Save Workout'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="md:w-1/3">
          {/* Timer Tabs */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button 
                  onClick={() => setActiveTimer('rest')}
                  className={`px-4 py-3 font-medium text-sm flex-1 ${
                    activeTimer === 'rest' 
                      ? 'border-b-2 border-blue-500 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Rest Timer
                </button>
                <button 
                  onClick={() => setActiveTimer('hiit')}
                  className={`px-4 py-3 font-medium text-sm flex-1 ${
                    activeTimer === 'hiit' 
                      ? 'border-b-2 border-blue-500 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  HIIT Timer
                </button>
              </div>
            </div>
            
            {activeTimer === 'rest' ? (
              /* Your existing Rest Timer */
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-blue-500" />
                  Rest Timer
                </h2>
                
                {/* Rest of your existing Rest Timer code */}
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold mb-3">
                    {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                  </div>
                  
                  <div className="flex justify-center gap-2 mb-4">
                    {!timerActive ? (
                      <button 
                        onClick={startTimer}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Start
                      </button>
                    ) : (
                      <button 
                        onClick={stopTimer}
                        className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
                      >
                        Pause
                      </button>
                    )}
                    
                    <button 
                      onClick={resetTimer}
                      className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    {[30, 60, 90, 120].map(seconds => (
                      <button 
                        key={seconds}
                        onClick={() => {
                          setTimerInitialValue(seconds);
                          setTimerSeconds(seconds);
                        }}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                          timerInitialValue === seconds 
                            ? 'bg-blue-100 text-blue-800 font-medium' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {seconds}s
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* New HIIT Timer */
              <HIITTimer />
            )}
          </div>
          
          {/* Templates */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Workout Templates</h2>
            
            <div className="space-y-2">
              {workoutTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => applyTemplate(template)}
                  className="w-full text-left px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-800">{template.name}</div>
                  <div className="text-sm text-gray-500">{template.exercises.length} exercises</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Recent Workouts */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Workouts</h2>
            
            {recentWorkouts.length > 0 ? (
              <div className="space-y-4">
                {recentWorkouts.map(workout => (
                  <div key={workout.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                    <div className="font-medium">{workout.name}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(workout.workout_date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent workouts found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import withSubscriptionGuard from '../components/SubscriptionGuard';
export default withSubscriptionGuard(WorkoutLogger);