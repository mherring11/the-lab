import React from 'react';
import { Clock, BarChart, Award, ArrowRight } from 'lucide-react';
import { Workout } from '../types/store.types';

// Helper function to convert store workout to component workout
export const convertWorkout = (workout: Workout): Workout => {
  return {
    ...workout,
    title: workout.title || workout.name, // Use name as fallback for title
    duration: workout.duration || 30,     // Default duration
    difficulty: workout.difficulty || 'intermediate',
    category: workout.category || 'general',
    targetMuscles: workout.targetMuscles || []
  };
}

interface Exercise {
  id: string;
  name: string;
  description: string;
  sets?: number;
  reps?: number;
  duration?: number;
  restTime?: number;
  formTips: string[];
}

interface WorkoutCardProps {
  workout: Workout;
  onClick: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onClick }) => {
  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
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
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strength':
        return <BarChart className="h-4 w-4 mr-1" />;
      case 'cardio':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'hiit':
        return <Award className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg text-gray-900">{workout.title}</h3>
          {workout.aiGenerated === true && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
              AI
            </span>
          )}
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{workout.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{workout.duration} min</span>
          </div>
          
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getDifficultyColor(workout.difficulty)}`}>
            {workout.difficulty}
          </span>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-700">
              {getCategoryIcon(workout.category)}
              <span className="capitalize">{workout.category.replace('-', ' ')}</span>
            </div>
            
            <span className="text-yellow-600 text-sm font-medium flex items-center">
              View Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;