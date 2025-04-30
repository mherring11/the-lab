import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, ChevronRight, Award } from 'lucide-react';

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

const PerformanceMetricsCard: React.FC = () => {
  // Sample metrics data (you'll likely get this from your store or API)
  const metrics: PerformanceMetric[] = [
    { id: 'bench', name: 'Bench Press', value: 225, unit: 'lbs', previousValue: 215, goal: 250, category: 'strength', date: '2025-03-20' },
    { id: 'sprint40', name: '40-yard Sprint', value: 4.8, unit: 'sec', previousValue: 5.0, goal: 4.5, category: 'speed', date: '2025-03-14' },
    { id: 'mile', name: 'Mile Run', value: 6.5, unit: 'min', previousValue: 6.8, goal: 6.0, category: 'endurance', date: '2025-03-23' },
    { id: 'vertjump', name: 'Vertical Jump', value: 28.5, unit: 'in', previousValue: 27.0, goal: 32.0, category: 'power', date: '2025-03-17' },
  ];
  
  // Is the change positive or negative? (For some metrics like time, lower is better)
  const isPositiveChange = (metric: PerformanceMetric) => {
    const timeBasedMetrics = ['40-yard Sprint', 'Agility Test', 'Reaction Time', 'Mile Run'];
    const change = metric.value - metric.previousValue;
    
    if (timeBasedMetrics.includes(metric.name)) {
      return change < 0; // For time metrics, lower is better
    } else {
      return change > 0; // For other metrics, higher is better
    }
  };
  
  // Calculate percent change
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };
  
  // Calculate goal progress
  const calculateProgress = (metric: PerformanceMetric) => {
    if (!metric.goal) return 100;
    
    const timeBasedMetrics = ['40-yard Sprint', 'Agility Test', 'Reaction Time', 'Mile Run'];
    
    if (timeBasedMetrics.includes(metric.name)) {
      // For time-based metrics, lower is better
      // For example, if goal is 4.5s and current is 4.8s, progress is less than 100%
      return Math.min(100, Math.max(0, (metric.goal / metric.value) * 100));
    } else {
      // For standard metrics, higher is better
      return Math.min(100, Math.max(0, (metric.value / metric.goal) * 100));
    }
  };
  
  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength':
        return { bg: 'bg-red-500', light: 'bg-red-50', text: 'text-red-700' };
      case 'speed':
        return { bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700' };
      case 'endurance':
        return { bg: 'bg-green-500', light: 'bg-green-50', text: 'text-green-700' };
      case 'power':
        return { bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-700' };
      case 'mobility':
        return { bg: 'bg-yellow-500', light: 'bg-yellow-50', text: 'text-yellow-700' };
      default:
        return { bg: 'bg-gray-500', light: 'bg-gray-50', text: 'text-gray-700' };
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full">
      <div className="p-4">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
          <Link 
            to="/metrics" 
            className="text-sm font-medium text-yellow-500 hover:text-yellow-600 flex items-center"
          >
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric) => {
            const isPositive = isPositiveChange(metric);
            const changePercent = Math.abs(calculateChange(metric.value, metric.previousValue)).toFixed(1);
            const progress = calculateProgress(metric);
            const colors = getCategoryColor(metric.category);
            
            return (
              <div 
                key={metric.id}
                className="relative overflow-hidden rounded-xl border border-gray-100 p-4 bg-gradient-to-br from-white to-gray-50"
              >
                {/* Category indicator */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${colors.bg}`}></div>
                
                {/* Content */}
                <div className="pl-2">
                  {/* Metric name */}
                  <h3 className="text-sm font-medium text-gray-700 mb-2 truncate pr-1">{metric.name}</h3>
                  
                  {/* Value and change */}
                  <div className="flex items-baseline mb-3">
                    <span className="text-2xl font-bold text-gray-900 mr-2">
                      {metric.value} <span className="text-xs font-normal text-gray-500">{metric.unit}</span>
                    </span>
                    <div className={`flex items-center text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? (
                        <TrendingUp size={12} className="mr-0.5" />
                      ) : (
                        <TrendingDown size={12} className="mr-0.5" />
                      )}
                      {changePercent}%
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${colors.bg}`} 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Goal indicator */}
                    <div className="ml-2 flex items-center">
                      {progress >= 100 ? (
                        <Award size={14} className="text-yellow-500 mr-1" />
                      ) : null}
                      <span className={`text-xs font-medium ${progress >= 100 ? 'text-yellow-600' : 'text-gray-500'}`}>
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetricsCard;