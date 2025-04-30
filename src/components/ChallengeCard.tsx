import React from 'react';
import { Calendar, User } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  participants: string[];
  type: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onClick: () => void;
}

export default function ChallengeCard({ challenge, onClick }: ChallengeCardProps) {
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTypeColors = () => {
    switch (challenge.type) {
      case 'sprint':
        return 'bg-blue-50 text-blue-700';
      case 'strength':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-purple-50 text-purple-700';
    }
  };

  return (
    <div 
      className="border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColors()}`}>
            {challenge.type}
          </span>
        </div>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{challenge.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-1" />
            {challenge.participants.length}
          </div>
        </div>
      </div>
    </div>
  );
}