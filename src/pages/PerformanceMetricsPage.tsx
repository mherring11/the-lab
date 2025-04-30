import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Award, ChevronDown, ChevronUp, Edit2, 
  Check, X, Search, Filter, Calendar, Download, BarChart2 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  previousValue: number;
  goal?: number;
  category: 'strength' | 'speed' | 'endurance' | 'power' | 'mobility';
  date: string;
}

const PerformanceMetricsPage: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('strength');
  const [editingMetric, setEditingMetric] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'list' | 'chart'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Full performance metrics data
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([
    // Same as in your PerformanceMetricsCard component
    // Strength Metrics
    { id: 'bench', name: 'Bench Press', value: 225, unit: 'lbs', previousValue: 215, goal: 250, category: 'strength', date: '2025-03-20' },
    { id: 'squat', name: 'Back Squat', value: 315, unit: 'lbs', previousValue: 295, goal: 350, category: 'strength', date: '2025-03-15' },
    { id: 'deadlift', name: 'Deadlift', value: 385, unit: 'lbs', previousValue: 365, goal: 400, category: 'strength', date: '2025-03-18' },
    { id: 'pullup', name: 'Pull-ups', value: 14, unit: 'reps', previousValue: 12, goal: 20, category: 'strength', date: '2025-03-22' },
    
    // Speed Metrics
    { id: 'sprint40', name: '40-yard Sprint', value: 4.8, unit: 'sec', previousValue: 5.0, goal: 4.5, category: 'speed', date: '2025-03-14' },
    { id: 'agility', name: 'Agility Test', value: 11.2, unit: 'sec', previousValue: 11.5, goal: 10.5, category: 'speed', date: '2025-03-21' },
    { id: 'reactionTime', name: 'Reaction Time', value: 0.28, unit: 'sec', previousValue: 0.32, goal: 0.25, category: 'speed', date: '2025-03-19' },
    
    // Other categories...
  ]);
  
  const categories = [
    { id: 'strength', name: 'Strength', color: 'bg-red-500', lightColor: 'bg-red-100', textColor: 'text-red-700' },
    { id: 'speed', name: 'Speed & Agility', color: 'bg-blue-500', lightColor: 'bg-blue-100', textColor: 'text-blue-700' },
    { id: 'endurance', name: 'Endurance', color: 'bg-green-500', lightColor: 'bg-green-100', textColor: 'text-green-700' },
    { id: 'power', name: 'Power', color: 'bg-purple-500', lightColor: 'bg-purple-100', textColor: 'text-purple-700' },
    { id: 'mobility', name: 'Mobility', color: 'bg-yellow-500', lightColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
  ];
  
  // Functions for handling metrics (same as in your component)
  
  const filteredMetrics = metrics.filter(metric => {
    const matchesSearch = searchQuery ? 
      metric.name.toLowerCase().includes(searchQuery.toLowerCase()) : 
      true;
    
    const matchesCategory = selectedCategory ? 
      metric.category === selectedCategory : 
      true;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Performance Metrics</h1>
        <p className="text-gray-500 mt-2">Track, measure, and analyze your fitness progress</p>
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {categories.map((category) => {
          const metricsInCategory = metrics.filter(m => m.category === category.id);
          const avgCompletion = metricsInCategory.reduce((sum, m) => {
            if (!m.goal) return sum;
            return sum + (m.value / m.goal) * 100;
          }, 0) / (metricsInCategory.filter(m => m.goal).length || 1);
          
          return (
            <div 
              key={category.id} 
              className={`p-4 rounded-lg border shadow-sm ${
                selectedCategory === category.id ? category.lightColor : 'bg-white'
              }`}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
              role="button"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-medium ${category.textColor}`}>{category.name}</h3>
                <div className={`h-8 w-8 ${category.color} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-xs font-medium">{metricsInCategory.length}</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color}`}
                    style={{ width: `${Math.round(avgCompletion)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">Avg. Progress</span>
                  <span className="font-medium">{Math.round(avgCompletion)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            placeholder="Search metrics"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setViewMode('list')}
            className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              viewMode === 'list' 
                ? 'bg-yellow-50 text-yellow-700 border border-yellow-300' 
                : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter className="mr-2 h-5 w-5" />
            List View
          </button>
          
          <button 
            onClick={() => setViewMode('chart')}
            className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              viewMode === 'chart' 
                ? 'bg-yellow-50 text-yellow-700 border border-yellow-300' 
                : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <BarChart2 className="mr-2 h-5 w-5" />
            Chart View
          </button>
          
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Download className="mr-2 h-5 w-5" />
            Export
          </button>
        </div>
      </div>
      
      {/* Main content - List or Chart view */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        {viewMode === 'list' ? (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Previous
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Goal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMetrics.map((metric) => {
                  const category = categories.find(c => c.id === metric.category)!;
                  const progress = metric.goal ? Math.round((metric.value / metric.goal) * 100) : null;
                  
                  return (
                    <tr key={metric.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{metric.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${category.lightColor} ${category.textColor}`}>
                          {category.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">{metric.value} {metric.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{metric.previousValue} {metric.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{metric.goal || '—'} {metric.goal ? metric.unit : ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {progress !== null ? (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${category.color}`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(metric.date).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Progress Over Time</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'Jan', strength: 45, speed: 55, endurance: 40, power: 50 },
                      { month: 'Feb', strength: 52, speed: 58, endurance: 45, power: 55 },
                      { month: 'Mar', strength: 58, speed: 62, endurance: 53, power: 60 },
                      { month: 'Apr', strength: 65, speed: 65, endurance: 60, power: 68 },
                      { month: 'May', strength: 72, speed: 68, endurance: 75, power: 81 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" tick={{ fill: '#6b7280' }} />
                      <YAxis tick={{ fill: '#6b7280' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="strength" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="speed" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="endurance" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="power" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Profile</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={[
                      { attribute: 'Strength', value: 72, fullMark: 100 },
                      { attribute: 'Speed', value: 68, fullMark: 100 },
                      { attribute: 'Endurance', value: 65, fullMark: 100 },
                      { attribute: 'Power', value: 78, fullMark: 100 },
                      { attribute: 'Mobility', value: 65, fullMark: 100 },
                    ]}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="attribute" tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                      <Radar name="Current" dataKey="value" stroke="#f97316" fill="#fdba74" fillOpacity={0.6} />
                      <Tooltip />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import withSubscriptionGuard from '../components/SubscriptionGuard';
export default withSubscriptionGuard(PerformanceMetricsPage);