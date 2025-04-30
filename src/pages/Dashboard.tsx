import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, 
  Calendar, 
  Trophy, 
  Activity, 
  TrendingUp, 
  Clock, 
  Plus,
  Brain,
  Camera,
  Heart,
  MessageCircle,
  Users,
  Settings // Add this for the admin button
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppStore } from '../store';
import ProgressChart from '../components/ProgressChart';
import WorkoutCard from '../components/WorkoutCard';
import ChallengeCard from '../components/ChallengeCard';
import AIWorkoutGenerator from '../components/AIWorkoutGenerator';
import FormAnalysis from '../components/FormAnalysis';
import PerformanceMetricsCard from '../components/PerformanceMetricsCard';
import { CogIcon } from '@heroicons/react/24/outline';

// Define types for our mock data
interface UserStats {
  workoutsCompleted: number;
  streakDays: number;
  totalMinutes: number;
  strengthScore: number;
  enduranceScore: number;
  agilityScore: number;
  sprintSpeed: number;
  verticalJump: number;
}

interface Workout {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  exercises: any[];
  targetMuscles: string[];
  sportsFocus?: string;
  aiGenerated?: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  participants: string[];
  leaderboard: any[];
  type: string;
}

export default function Dashboard() {
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [showFormAnalysis, setShowFormAnalysis] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  
  // Use your existing auth context
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("Current user:", useAppStore.getState().user);
  }, []);
  
  useEffect(() => {
    // Check local storage on every page load
    const isAdmin = localStorage.getItem("is_admin_user") === "true";
    const user = useAppStore.getState().user;
    
    // If this is your user ID and admin flag is set, update role
    if (isAdmin && user && user.id === "631b65cb-ad15-481e-a0b0-280b367967e0" && user.role !== "owner") {
      console.log("Restoring admin privileges from localStorage");
      const adminUser = { ...user, role: "owner" };
      useAppStore.setState({ user: adminUser });
    }
  }, []);
  
  // Mock workout data
  const displayWorkouts: Workout[] = [
    {
      id: 'workout-1',
      title: 'Full Body HIIT',
      description: 'High-intensity interval training targeting all major muscle groups',
      duration: 45,
      difficulty: 'intermediate',
      category: 'hiit',
      exercises: [],
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
      exercises: [],
      targetMuscles: ['legs', 'core'],
      sportsFocus: 'Basketball',
      aiGenerated: true
    }
  ];
  
  // Mock challenge data
  const displayChallenges: Challenge[] = [
    {
      id: 'challenge-1',
      title: '7-Day Sprint Challenge',
      description: 'Improve your 40-yard dash time over one week',
      startDate: new Date('2025-05-01'),
      endDate: new Date('2025-05-07'),
      participants: ['user-1', 'user-2', 'user-3'],
      leaderboard: [],
      type: 'sprint'
    },
    {
      id: 'challenge-2',
      title: 'Summer Strength Series',
      description: 'Build strength and power with progressive overload',
      startDate: new Date('2025-06-01'),
      endDate: new Date('2025-06-30'),
      participants: ['user-1', 'user-4', 'user-5', 'user-6'],
      leaderboard: [],
      type: 'strength'
    }
  ];
  
  // Mock user stats
  const userStats: UserStats = {
    workoutsCompleted: 42,
    streakDays: 5,
    totalMinutes: 1260,
    strengthScore: 72,
    enduranceScore: 68,
    agilityScore: 75,
    sprintSpeed: 7.2,
    verticalJump: 24
  };
  
  const performanceData = [
    { 
      label: 'Strength', 
      value: userStats.strengthScore, 
      max: 100, 
      color: 'bg-red-500' 
    },
    { 
      label: 'Endurance', 
      value: userStats.enduranceScore, 
      max: 100, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Agility', 
      value: userStats.agilityScore, 
      max: 100, 
      color: 'bg-green-500' 
    }
  ];
  
  // Extract username from email if available
  const username = user?.email ? user.email.split('@')[0] : 'Athlete';

  const makeAdmin = async () => {
    // First, update in state for immediate effect
    const currentUser = useAppStore.getState().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, role: 'owner' };
      useAppStore.setState({ user: updatedUser });
      console.log("Updated user in state:", updatedUser);
    }
    
    // Then, update in Supabase for persistence (if you're using Supabase)
    try {
      const { supabase } = await import('../services/supabase');
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'owner' })
        .eq('id', currentUser?.id);
        
      if (error) {
        console.error('Error updating role in database:', error);
      } else {
        console.log('Successfully updated role in database');
        // Refresh the page to see changes
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (err) {
      console.error('Failed to update role:', err);
    }
  };

  const makeAdminPermanently = () => {
    // Set permanent admin flag in localStorage
    localStorage.setItem("is_admin_user", "true");
    
    // Update app state immediately
    const currentUser = useAppStore.getState().user;
    if (currentUser) {
      const adminUser = { ...currentUser, role: 'owner' };
      useAppStore.setState({ user: adminUser });
    }
    
    alert("You are now permanently an admin! The admin panel will show in your sidebar.");
    window.location.reload();
  };
  
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, {username}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            {/* Admin access button - only visible for admins/owners */}
            {(user?.role === 'admin' || user?.role === 'owner') && (
              <Link
                to="/admin"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Settings className="mr-2 h-5 w-5" />
                Admin Panel
              </Link>
            )}
            
            <button
              onClick={() => setShowFormAnalysis(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            >
              <Camera className="mr-2 h-5 w-5" />
              Form Analysis
            </button>
            
            <button
              onClick={() => setShowAIGenerator(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
            >
              <Brain className="mr-2 h-5 w-5" />
              Generate Workout
            </button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-primary-50 p-3 rounded-full">
                <Dumbbell className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Workouts Completed</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {userStats.workoutsCompleted}
                </h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Current Streak</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {userStats.streakDays} days
                </h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-50 p-3 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Training Time</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {userStats.totalMinutes} min
                </h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-amber-50 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Challenges Joined</p>
                <h3 className="text-xl font-semibold text-gray-900">{displayChallenges.length}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Metrics Card - 1/3 width */}
          <div>
            <PerformanceMetricsCard />
          </div>
          
          {/* Recent Workouts - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Workouts</h2>
                <Link 
                  to="/workouts" 
                  className="text-sm font-medium text-yellow-500 hover:text-yellow-600"
                >
                  View all
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayWorkouts.slice(0, 2).map((workout) => (
                  <WorkoutCard 
                    key={workout.id} 
                    workout={workout} 
                    onClick={() => setSelectedWorkout(workout.id)} 
                  />
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAIGenerator(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <Plus className="mr-2 h-5 w-5 text-gray-400" />
                  Create New Workout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Put Active Challenges and Community Activity in a grid container */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Challenges - now takes half the width on large screens */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Active Challenges</h2>
              <Link 
                to="/challenges" 
                className="text-sm font-medium text-yellow-500 hover:text-yellow-600"
              >
                View all
              </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {displayChallenges.map((challenge) => (
                <ChallengeCard 
                  key={challenge.id} 
                  challenge={challenge} 
                  onClick={() => setSelectedChallenge(challenge.id)} 
                />
              ))}
            </div>
          </div>
          
          {/* Community Activity - now next to Active Challenges */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Community Activity</h2>
              <Link 
                to="/community" 
                className="text-sm font-medium text-yellow-500 hover:text-yellow-600"
              >
                View all
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
              {/* Preview of recent community posts */}
              <div className="divide-y divide-gray-200">
                {/* First post preview */}
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Sarah" 
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Sarah Johnson</h3>
                      <p className="text-xs text-gray-500">5 minutes ago</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    Just crushed my 5K PR! 22:45, down from 24:10 last month. The interval training is really paying off! 🏃‍♀️💨 #NewPR #Running
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Heart className="h-4 w-4 mr-1 text-red-500" />
                    <span className="mr-3">12</span>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>4 comments</span>
                  </div>
                </div>

                {/* Second post preview */}
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Coach Mike" 
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Coach Mike</h3>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    Reminder: Tomorrow's bootcamp will focus on explosive power. Get ready for box jumps, medicine ball throws, and kettlebell swings! Bring your A-game! 💪
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Heart className="h-4 w-4 mr-1" />
                    <span className="mr-3">8</span>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>2 comments</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 text-center">
                <Link 
                  to="/community"
                  className="inline-flex items-center text-sm text-yellow-600 hover:text-yellow-700"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Join the conversation
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {showAIGenerator && (
          <AIWorkoutGenerator onClose={() => setShowAIGenerator(false)} />
        )}
        
        {showFormAnalysis && (
          <FormAnalysis onClose={() => setShowFormAnalysis(false)} />
        )}
      </div>
    </div>
  );
}