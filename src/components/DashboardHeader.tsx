// Add this component to your dashboard header or create it if it doesn't exist

import React from 'react';
import { CalendarClock } from 'lucide-react';
import { useAppStore } from '../store';
import { differenceInDays } from 'date-fns';

const TrialStatusIndicator: React.FC = () => {
  const user = useAppStore(state => state.user);
  
  // Skip for admin/owner or if user has subscription
  if (!user || user.role === 'admin' || user.role === 'owner' || user.hasActiveSubscription) {
    return null;
  }
  
  // Calculate trial status
  const trialEndDate = user.trialEndDate ? new Date(user.trialEndDate) : null;
  const isTrialActive = trialEndDate && trialEndDate > new Date();
  const daysLeft = trialEndDate ? Math.max(0, differenceInDays(trialEndDate, new Date())) : 0;
  
  if (!isTrialActive) return null;
  
  return (
    <div className="flex items-center mr-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
      <CalendarClock className="w-4 h-4 mr-1" />
      <span>Trial: <b>{daysLeft}</b> days left</span>
    </div>
  );
};

export default TrialStatusIndicator;