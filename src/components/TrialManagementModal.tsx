import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { X, Calendar } from 'lucide-react';

interface TrialManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
  onSave: (userId: string, trialEndDate: string) => Promise<void>;
}

const TrialManagementModal: React.FC<TrialManagementModalProps> = ({ 
  isOpen, 
  onClose, 
  user, 
  onSave 
}) => {
  const [loading, setLoading] = useState(false);
  const [trialEndDate, setTrialEndDate] = useState<Date>(() => {
    // Initialize with user's current trial end date or 14 days from now
    return user?.trialEndDate 
      ? new Date(user.trialEndDate)
      : addDays(new Date(), 14);
  });
  
  if (!isOpen || !user) return null;
  
  const handleQuickSelect = (days: number) => {
    setTrialEndDate(addDays(new Date(), days));
  };
  
  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(user.id, trialEndDate.toISOString());
      onClose();
    } catch (error) {
      console.error('Error updating trial:', error);
      alert('Failed to update trial period. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Manage Trial Period</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="px-4 py-5">
          <div className="mb-5">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">User:</span> {user?.name} ({user?.email})
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium text-gray-700">Current status:</span> {
                user?.hasActiveSubscription 
                  ? 'Active subscription'
                  : user?.trialEndDate && new Date(user.trialEndDate) > new Date()
                    ? `Trial ending on ${format(new Date(user.trialEndDate), 'MMM d, yyyy')}`
                    : 'Trial expired'
              }
            </p>
          </div>
          
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Set Trial End Date
            </label>
            <div className="flex items-center">
              <Calendar size={20} className="text-gray-400 mr-2" />
              <input
                type="date"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={format(trialEndDate, 'yyyy-MM-dd')}
                onChange={(e) => setTrialEndDate(new Date(e.target.value))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-5">
            <button
              type="button"
              onClick={() => handleQuickSelect(7)}
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              7 Days
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect(14)}
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              14 Days
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect(30)}
              className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              30 Days
            </button>
          </div>
          
          {user?.hasActiveSubscription && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-5">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    This user has an active subscription. Setting a trial end date will not affect their subscription status.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialManagementModal;