import React, { useState } from 'react';
import { X, Brain, Loader, Save, RefreshCw } from 'lucide-react';
import { useAppStore } from '../store';
import { v4 as uuidv4 } from 'uuid'; // You might need to install this: npm install uuid @types/uuid

interface AIWorkoutGeneratorProps {
  onClose: () => void;
}

const AIWorkoutGenerator: React.FC<AIWorkoutGeneratorProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    goal: 'strength',
    difficulty: 'intermediate',
    duration: 30,
    focus: '',
    equipment: '',
    injuries: '',
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorkout, setGeneratedWorkout] = useState<any | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  
  const addWorkout = useAppStore((state) => state.addWorkout);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock workout based on form data
      const workout = generateMockWorkout();
      setGeneratedWorkout(workout);
    } catch (error) {
      console.error('Error generating workout:', error);
      setGenerationError('Failed to generate workout. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockWorkout = () => {
    // Create appropriate exercises based on the goal/focus
    let exercises = [];
    let targetMuscles = [];
    
    switch (formData.goal) {
      case 'strength':
        targetMuscles = ['chest', 'back', 'shoulders', 'legs', 'core'].filter(() => Math.random() > 0.3);
        
        if (formData.focus.toLowerCase().includes('upper')) {
          targetMuscles = ['chest', 'back', 'shoulders', 'arms'];
          exercises = [
            {
              id: `ex-${uuidv4().substring(0, 8)}`,
              name: 'Bench Press',
              description: 'Compound movement for chest development',
              sets: 4,
              reps: 8,
              restTime: 90,
              formTips: ['Keep feet flat on floor', 'Retract shoulder blades', 'Control the descent']
            },
            {
              id: `ex-${uuidv4().substring(0, 8)}`,
              name: 'Pull-ups',
              description: 'Upper back and biceps development',
              sets: 3,
              reps: 8,
              restTime: 60,
              formTips: ['Full range of motion', 'Control the descent', 'Keep core engaged']
            },
            {
              id: `ex-${uuidv4().substring(0, 8)}`,
              name: 'Shoulder Press',
              description: 'Vertical pressing for shoulder strength',
              sets: 3,
              reps: 10,
              restTime: 60,
              formTips: ['Avoid arching back', 'Press directly overhead', 'Engage core']
            }
          ];
        } else if (formData.focus.toLowerCase().includes('lower')) {
          targetMuscles = ['quadriceps', 'hamstrings', 'glutes', 'calves'];
          exercises = [
            {
              id: `ex-${uuidv4().substring(0, 8)}`,
              name: 'Squats',
              description: 'Compound lower body movement',
              sets: 4,
              reps: 8,
              restTime: 120,
              formTips: ['Keep chest up', 'Knees tracking over toes', 'Break at hips and knees simultaneously']
            },
            {
              id: `ex-${uuidv4().substring(0, 8)}`,
              name: 'Romanian Deadlifts',
              description: 'Posterior chain development',
              sets: 3,
              reps: 10,
              restTime: 90,
              formTips: ['Soft bend in knees', 'Hip hinge movement', 'Keep back flat']
            },
            {
              id: `ex-${uuidv4().substring(0, 8)}`,
              name: 'Lunges',
              description: 'Unilateral leg development',
              sets: 3,
              reps: 12,
              restTime: 60,
              formTips: ['Keep torso upright', '90 degree angles at both knees', 'Control the movement']
            }
          ];
        } else {
          // General strength workout
          exercises = [
            {
              id: `ex-${uuidv4().substring(0, 8)}`,
              name: 'Barbell Squats',
              description: 'Compound lower body exercise',
              sets: 4,
              reps: 6,
              restTime: 120,
              formTips: ['Keep chest up', 'Drive through heels', 'Brace core throughout']
            },
            {
              id: `ex-${uuidv4().substring(0, 8)}`,
              name: 'Bench Press',
              description: 'Horizontal pressing for chest, shoulders, triceps',
              sets: 4,
              reps: 8,
              restTime: 90,
              formTips: ['Retract shoulder blades', 'Feet flat on floor', 'Lower to mid-chest']
            },
            {
              id: `ex-${uuidv4().substring(0, 8)}`,
              name: 'Bent Over Rows',
              description: 'Horizontal pulling for back development',
              sets: 3,
              reps: 10,
              restTime: 60,
              formTips: ['Hinge at hips', 'Keep back flat', 'Pull to lower ribs']
            },
            {
              id: `ex-${uuidv4().substring(0, 8)}`,
              name: 'Overhead Press',
              description: 'Vertical pressing for shoulders',
              sets: 3,
              reps: 8,
              restTime: 60,
              formTips: ['Keep core tight', 'Full range of motion', 'Press straight overhead']
            }
          ];
        }
        break;
        
      case 'cardio':
        targetMuscles = ['heart', 'lungs', 'legs'];
        exercises = [
          {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: 'Warm-up Jog',
            description: 'Light jogging to raise heart rate',
            duration: 300, // 5 minutes
            formTips: ['Keep it easy pace', 'Focus on breathing', 'Relax shoulders']
          },
          {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: 'Interval Sprints',
            description: 'High intensity sprints with recovery periods',
            sets: 6,
            duration: 30, // 30 seconds
            restTime: 90,
            formTips: ['Maximum effort', 'Pump arms', 'Full recovery between sets']
          },
          {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: 'Tempo Run',
            description: 'Sustained moderate-high intensity running',
            duration: 600, // 10 minutes
            formTips: ['Slightly faster than comfortable pace', 'Control breathing', 'Maintain form']
          },
          {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: 'Cool Down',
            description: 'Gradual reduction in intensity',
            duration: 300, // 5 minutes
            formTips: ['Gradually slow pace', 'Deep breathing', 'Shake out muscles']
          }
        ];
        break;
        
      case 'hiit':
        targetMuscles = ['full body', 'core', 'legs'];
        exercises = [
          {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: 'Jumping Jacks',
            description: 'Full body warm-up',
            duration: 60,
            formTips: ['Full range of motion', 'Land softly', 'Keep core engaged']
          },
          {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: 'Burpees',
            description: 'Full body conditioning',
            sets: 3,
            reps: 10,
            restTime: 30,
            formTips: ['Controlled movements', 'Jump at the top', 'Chest to ground at bottom']
          },
          {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: 'Mountain Climbers',
            description: 'Core and cardio',
            duration: 45,
            restTime: 15,
            sets: 3,
            formTips: ['Keep hips low', 'Drive knees to chest', 'Maintain plank position']
          },
          {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: 'Squat Jumps',
            description: 'Lower body power',
            sets: 3,
            reps: 12,
            restTime: 30,
            formTips: ['Explode upward', 'Soft landing', 'Full depth squat']
          }
        ];
        break;
        
      default:
        // default to a general fitness workout
        targetMuscles = ['full body'];
        exercises = [
          {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: 'Push-Ups',
            description: 'Upper body strength',
            sets: 3,
            reps: 12,
            restTime: 45,
            formTips: ['Keep body straight', 'Elbows at 45°', 'Full range of motion']
          },
          {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: 'Air Squats',
            description: 'Lower body strength',
            sets: 3,
            reps: 15,
            restTime: 45,
            formTips: ['Knees track over toes', 'Weight in heels', 'Chest up']
          },
          {
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: 'Plank',
            description: 'Core stability',
            sets: 3,
            duration: 45,
            restTime: 30,
            formTips: ['Straight line from head to heels', 'Engage core', 'Breathe consistently']
          }
        ];
    }
    
    // Add some specificity based on the 'focus' field
    if (formData.focus && formData.focus.trim() !== '') {
      const focusLower = formData.focus.toLowerCase();
      
      // Add a sport-specific exercise if relevant
      if (focusLower.includes('basketball') || focusLower.includes('football') || focusLower.includes('soccer') || focusLower.includes('tennis')) {
        const sport = focusLower.includes('basketball') ? 'Basketball' : 
                     focusLower.includes('football') ? 'Football' :
                     focusLower.includes('soccer') ? 'Soccer' : 'Tennis';
                     
        exercises.push({
          id: `ex-${uuidv4().substring(0, 8)}`,
          name: `${sport} Agility Drills`,
          description: `Sport-specific movements for ${sport}`,
          duration: 300,
          formTips: ['Focus on footwork', 'Quick directional changes', 'Stay on balls of feet']
        });
        
        if (!targetMuscles.includes('agility')) {
          targetMuscles.push('agility');
        }
      }
    }
    
    // Consider equipment limitations
    if (formData.equipment && formData.equipment.toLowerCase().includes('no equipment')) {
      // Replace any equipment-based exercises with bodyweight alternatives
      exercises = exercises.map(ex => {
        if (ex.name.includes('Barbell') || ex.name.includes('Dumbbell') || ex.name.includes('Machine')) {
          return {
            ...ex,
            id: `ex-${uuidv4().substring(0, 8)}`,
            name: ex.name.replace('Barbell ', '').replace('Dumbbell ', '') + ' (Bodyweight)',
            description: 'Bodyweight alternative - ' + ex.description
          };
        }
        return ex;
      });
    }
    
    // Consider injuries
    if (formData.injuries) {
      const injuriesLower = formData.injuries.toLowerCase();
      
      // Add a note about modifications for injuries
      exercises = exercises.map(ex => {
        if (
          (injuriesLower.includes('knee') && (ex.name.includes('Squat') || ex.name.includes('Lunge'))) ||
          (injuriesLower.includes('shoulder') && (ex.name.includes('Press') || ex.name.includes('Push'))) ||
          (injuriesLower.includes('back') && (ex.name.includes('Deadlift') || ex.name.includes('Row')))
        ) {
          return {
            ...ex,
            description: ex.description + ' (Modified for ' + formData.injuries + ')',
            formTips: [...ex.formTips, 'Modify range of motion as needed', 'Reduce weight/intensity']
          };
        }
        return ex;
      });
    }
    
    // Create the workout
    return {
      id: `workout-${uuidv4().substring(0, 8)}`,
      title: `AI ${formData.goal.charAt(0).toUpperCase() + formData.goal.slice(1)} Workout`,
      description: `${formData.difficulty.charAt(0).toUpperCase() + formData.difficulty.slice(1)} ${formData.goal} workout${formData.focus ? ` focused on ${formData.focus}` : ''}${formData.equipment ? ` using ${formData.equipment}` : ''}`,
      duration: formData.duration,
      difficulty: formData.difficulty,
      category: formData.goal,
      exercises,
      targetMuscles,
      sportsFocus: formData.focus.includes('basketball') ? 'Basketball' : 
                  formData.focus.includes('football') ? 'Football' :
                  formData.focus.includes('soccer') ? 'Soccer' :
                  formData.focus.includes('tennis') ? 'Tennis' : undefined,
      aiGenerated: true
    };
  };

  const saveWorkout = () => {
    if (generatedWorkout) {
      addWorkout(generatedWorkout);
      onClose();
    }
  };

  const regenerateWorkout = () => {
    setGeneratedWorkout(null);
    handleGenerate(new Event('submit') as any);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="bg-yellow-50 p-2 rounded-full mr-3">
                <Brain className="h-6 w-6 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">AI Workout Generator</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {generationError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {generationError}
            </div>
          )}
          
          {!generatedWorkout ? (
            <form onSubmit={handleGenerate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
                    Workout Type
                  </label>
                  <select
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    required
                  >
                    <option value="strength">Strength Training</option>
                    <option value="cardio">Cardio</option>
                    <option value="hiit">HIIT</option>
                    <option value="recovery">Recovery/Mobility</option>
                    <option value="sport-specific">Sport Specific</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    required
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    min="10"
                    max="120"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="focus" className="block text-sm font-medium text-gray-700 mb-1">
                    Focus Areas (optional)
                  </label>
                  <input
                    type="text"
                    id="focus"
                    name="focus"
                    value={formData.focus}
                    onChange={handleInputChange}
                    placeholder="e.g., Upper body, basketball, core"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="equipment" className="block text-sm font-medium text-gray-700 mb-1">
                    Available Equipment (optional)
                  </label>
                  <input
                    type="text"
                    id="equipment"
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleInputChange}
                    placeholder="e.g., Dumbbells, kettlebells, no equipment"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="injuries" className="block text-sm font-medium text-gray-700 mb-1">
                    Injuries or Limitations (optional)
                  </label>
                  <input
                    type="text"
                    id="injuries"
                    name="injuries"
                    value={formData.injuries}
                    onChange={handleInputChange}
                    placeholder="e.g., Bad knees, shoulder pain"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  {isGenerating ? (
                    <>
                      <Loader className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-5 w-5" />
                      Generate Workout
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">AI Generated Workout</h3>
                <p className="text-yellow-700">
                  This workout was created based on your preferences. You can save it to your library or generate a new one.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{generatedWorkout.title}</h3>
                <p className="text-gray-600">{generatedWorkout.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {generatedWorkout.duration} min
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                    {generatedWorkout.difficulty}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                    {generatedWorkout.category}
                  </span>
                  {generatedWorkout.sportsFocus && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {generatedWorkout.sportsFocus}
                    </span>
                  )}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    AI Generated
                  </span>
                </div>
              </div>
              
              {/* Target Muscles */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-2">Target Muscles:</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedWorkout.targetMuscles.map((muscle: string, i: number) => (
                    <span 
                      key={i}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Exercises */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-2">Exercises:</h4>
                <div className="space-y-3">
                  {generatedWorkout.exercises.map((exercise: any, index: number) => (
                    <div key={exercise.id} className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-gray-900">{index + 1}. {exercise.name}</h5>
                          <p className="text-sm text-gray-500">{exercise.description}</p>
                        </div>
                        <div className="text-right text-sm">
                          {exercise.sets && exercise.reps && (
                            <p className="text-gray-700">{exercise.sets} × {exercise.reps}</p>
                          )}
                          {exercise.duration && (
                            <p className="text-gray-700">{Math.floor(exercise.duration / 60)}:{(exercise.duration % 60).toString().padStart(2, '0')}</p>
                          )}
                          {exercise.restTime && (
                            <p className="text-gray-500">Rest: {exercise.restTime}s</p>
                          )}
                        </div>
                      </div>
                      
                      {exercise.formTips && exercise.formTips.length > 0 && (
                        <div className="mt-2">
                          <h6 className="text-xs font-medium text-gray-700">Form Tips:</h6>
                          <ul className="list-disc list-inside text-xs text-gray-600">
                            {exercise.formTips.map((tip: string, i: number) => (
                              <li key={i}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={regenerateWorkout}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader className="animate-spin mr-2 h-5 w-5" />
                  ) : (
                    <RefreshCw className="mr-2 h-5 w-5" />
                  )}
                  Regenerate
                </button>
                
                <div>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveWorkout}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <Save className="mr-2 h-5 w-5" />
                    Save Workout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIWorkoutGenerator;