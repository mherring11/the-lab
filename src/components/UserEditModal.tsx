import React, { useState, useEffect } from 'react';
import { X, Calendar, Mail, User, Shield } from 'lucide-react';
import { format } from 'date-fns';

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
  onSave: (userData: any) => Promise<void>;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    role: 'user',
    trialEndDate: null as string | null, // Add explicit type
    hasActiveSubscription: false,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        id: user.id || '',
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'user',
        trialEndDate: user.trialEndDate || null,
        hasActiveSubscription: user.hasActiveSubscription || false,
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSave(userData);
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Failed to save user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            {user?.id ? 'Edit User' : 'Add New User'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <div className="flex items-center">
                <User size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="flex items-center">
                <Shield size={20} className="text-gray-400 mr-2" />
                <select
                  name="role"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={userData.role}
                  onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="owner">Owner</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trial End Date
              </label>
              <div className="flex items-center">
                <Calendar size={20} className="text-gray-400 mr-2" />
                <input
                  type="date"
                  name="trialEndDate"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={userData.trialEndDate ? format(new Date(userData.trialEndDate), 'yyyy-MM-dd') : ''}
                  onChange={(e) => setUserData({
                    ...userData,
                    trialEndDate: e.target.value ? new Date(e.target.value).toISOString() : null as null, // Cast to null
                  })}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Leave empty for no trial period
              </p>
            </div>
            
            <div className="flex items-center">
              <input
                id="has-subscription"
                name="hasActiveSubscription"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={userData.hasActiveSubscription}
                onChange={(e) => setUserData({ ...userData, hasActiveSubscription: e.target.checked })}
              />
              <label htmlFor="has-subscription" className="ml-2 block text-sm text-gray-900">
                Has Active Subscription
              </label>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;