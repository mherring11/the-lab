import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProgressChart from '../components/ProgressChart';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Award, Calendar, Clock, Activity,
  ArrowUp, ArrowDown, Target, Zap, Heart, BarChart2, User
} from 'lucide-react';

function AnalyticsPage() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('month');
  const [chartType, setChartType] = useState('performance');
  
  // Mock data for demo
  const performanceData = [
    { label: 'Strength', value: 72, max: 100, color: 'bg-red-500' },
    { label: 'Endurance', value: 68, max: 100, color: 'bg-blue-500' },
    { label: 'Agility', value: 75, max: 100, color: 'bg-green-500' },
    { label: 'Speed', value: 81, max: 100, color: 'bg-purple-500' },
    { label: 'Flexibility', value: 65, max: 100, color: 'bg-yellow-500' },
    { label: 'Power', value: 78, max: 100, color: 'bg-pink-500' },
  ];
  
  // Progress over time data
  const progressData = [
    { month: 'Jan', strength: 45, endurance: 55, agility: 40, speed: 50 },
    { month: 'Feb', strength: 52, endurance: 58, agility: 45, speed: 55 },
    { month: 'Mar', strength: 58, endurance: 62, agility: 53, speed: 60 },
    { month: 'Apr', strength: 65, endurance: 65, agility: 60, speed: 68 },
    { month: 'May', strength: 72, endurance: 68, agility: 75, speed: 81 },
  ];
  
  // Workout composition data
  const workoutComposition = [
    { name: 'Strength', value: 35, color: '#ef4444' },
    { name: 'Cardio', value: 25, color: '#3b82f6' },
    { name: 'Flexibility', value: 15, color: '#22c55e' },
    { name: 'HIIT', value: 20, color: '#a855f7' },
    { name: 'Recovery', value: 5, color: '#eab308' },
  ];
  
  // Recent workouts data
  const recentWorkouts = [
    { name: 'Full Body Strength', date: 'May 15, 2025', duration: '45 min', intensity: 'High', calories: 450 },
    { name: 'HIIT Circuit', date: 'May 13, 2025', duration: '30 min', intensity: 'Very High', calories: 380 },
    { name: 'Recovery Yoga', date: 'May 11, 2025', duration: '60 min', intensity: 'Low', calories: 200 },
    { name: 'Sprint Training', date: 'May 9, 2025', duration: '40 min', intensity: 'High', calories: 420 },
  ];
  
  // Heart rate zones data
  const heartRateData = [
    { name: 'Zone 1 (50-60%)', value: 15, color: '#22c55e' },
    { name: 'Zone 2 (60-70%)', value: 25, color: '#84cc16' },
    { name: 'Zone 3 (70-80%)', value: 35, color: '#eab308' },
    { name: 'Zone 4 (80-90%)', value: 20, color: '#f97316' },
    { name: 'Zone 5 (90-100%)', value: 5, color: '#ef4444' },
  ];
  
  // Format number with change indicator
  const formatWithChange = (current: number, previous: number) => {
    const change = current - previous;
    const percentChange = ((change / previous) * 100).toFixed(1);
    
    return (
      <div className="flex items-center">
        <span className="text-xl font-semibold mr-2">{current}</span>
        <span className={`text-xs flex items-center ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
          {Math.abs(parseFloat(percentChange))}%
        </span>
      </div>
    );
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header with user stats */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
          <p className="text-gray-500">Track your progress and fitness metrics</p>
        </div>
        <div className="mt-4 md:mt-0 bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border border-yellow-100 flex items-center">
          <div className="bg-yellow-500 rounded-full p-2 mr-3">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Fitness Level</p>
            <div className="flex items-center">
              <span className="text-lg font-bold text-yellow-600">Advanced</span>
              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">Top 15%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Active Days</p>
              {formatWithChange(18, 15)}
            </div>
            <div className="bg-blue-50 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Workout Minutes</p>
              {formatWithChange(840, 720)}
            </div>
            <div className="bg-green-50 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Calories Burned</p>
              {formatWithChange(8400, 7200)}
            </div>
            <div className="bg-orange-50 p-2 rounded-lg">
              <Zap className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Achievements</p>
              {formatWithChange(6, 4)}
            </div>
            <div className="bg-purple-50 p-2 rounded-lg">
              <Award className="h-5 w-5 text-purple-500" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main performance section - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Overview Card */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
                <div className="flex bg-gray-100 rounded-md p-1">
                  <button 
                    className={`px-3 py-1 text-xs rounded-md ${chartType === 'performance' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'}`}
                    onClick={() => setChartType('performance')}
                  >
                    Radar
                  </button>
                  <button 
                    className={`px-3 py-1 text-xs rounded-md ${chartType === 'progress' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600'}`}
                    onClick={() => setChartType('progress')}
                  >
                    Progress
                  </button>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'performance' ? (
                    <RadarChart outerRadius={90} data={performanceData.map(item => ({...item, fullMark: 100}))}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                      <Radar name="Current" dataKey="value" stroke="#f97316" fill="#fdba74" fillOpacity={0.6} />
                      <Tooltip />
                      <Legend />
                    </RadarChart>
                  ) : (
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" tick={{ fill: '#6b7280' }} />
                      <YAxis tick={{ fill: '#6b7280' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="strength" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="endurance" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="agility" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="speed" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Recent Workouts */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-100">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Workouts</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intensity</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentWorkouts.map((workout, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{workout.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{workout.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{workout.duration}</td>
                        <td className="px-4 py-3 text-sm">
                          <span 
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                              workout.intensity === 'High' ? 'bg-orange-100 text-orange-800' :
                              workout.intensity === 'Very High' ? 'bg-red-100 text-red-800' :
                              'bg-green-100 text-green-800'
                            }`}
                          >
                            {workout.intensity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{workout.calories}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm font-medium text-yellow-600 hover:text-yellow-700">
                  View All Workouts
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right sidebar - Takes 1 column */}
        <div className="space-y-6">
          {/* Key Metrics Card */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-100">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-500 rounded-md mr-3">
                      <ArrowUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Vertical Jump</p>
                      <p className="text-lg font-semibold">24"</p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded">+2" in 3mo</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-500 rounded-md mr-3">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sprint Speed</p>
                      <p className="text-lg font-semibold">7.2 m/s</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-200 text-green-800 px-1.5 py-0.5 rounded">+0.3 m/s in 3mo</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-md">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-500 rounded-md mr-3">
                      <Heart className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Recovery Rate</p>
                      <p className="text-lg font-semibold">Good</p>
                    </div>
                  </div>
                  <span className="text-xs bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded">Improved</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Workout Composition */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-100">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Workout Composition</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workoutComposition}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {workoutComposition.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Goals Progress */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Goals Progress</h3>
                <Target className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">Weekly Workouts</span>
                    <span className="text-gray-600">4/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">Monthly Miles</span>
                    <span className="text-gray-600">42/50</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="font-medium text-gray-700">Strength Targets</span>
                    <span className="text-gray-600">3/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;