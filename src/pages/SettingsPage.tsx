import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, Activity, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppStore } from '../store';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user: authUser, signOut } = useAuth();
  const user = useAppStore(state => state.user);
  const setUser = useAppStore(state => state.setUser);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    fitnessLevel: user?.fitnessLevel || 'intermediate',
    goals: user?.goals || [],
    sportsFocus: user?.sportsFocus || '',
    notifications: {
      workoutReminders: true,
      newChallenges: true,
      communityUpdates: false,
      coachMessages: true
    },
    privacy: {
      showWorkoutHistory: true,
      showPerformanceStats: true,
      allowTagging: false
    }
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        fitnessLevel: user.fitnessLevel || prev.fitnessLevel,
        goals: user.goals || prev.goals,
        sportsFocus: user.sportsFocus || prev.sportsFocus,
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (category: 'notifications' | 'privacy', name: string) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [name]: !formData[category][name as keyof typeof formData[typeof category]]
      }
    });
  };

  const handleGoalToggle = (goal: string) => {
    const updatedGoals = formData.goals.includes(goal)
      ? formData.goals.filter(g => g !== goal)
      : [...formData.goals, goal];

    setFormData({
      ...formData,
      goals: updatedGoals
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        fitnessLevel: formData.fitnessLevel as 'beginner' | 'intermediate' | 'advanced',
        goals: formData.goals,
        sportsFocus: formData.sportsFocus
      });
    }

    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your account preferences</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-64 bg-gray-50 p-4 border-r border-gray-200">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                <span className="text-sm font-medium">Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                  activeTab === 'notifications'
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bell className="mr-3 h-5 w-5" />
                <span className="text-sm font-medium">Notifications</span>
              </button>

              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                  activeTab === 'privacy'
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Lock className="mr-3 h-5 w-5" />
                <span className="text-sm font-medium">Privacy</span>
              </button>

              <button
                onClick={() => setActiveTab('fitness')}
                className={`flex items-center px-3 py-2 w-full text-left rounded-md ${
                  activeTab === 'fitness'
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Activity className="mr-3 h-5 w-5" />
                <span className="text-sm font-medium">Fitness Preferences</span>
              </button>
            </nav>
          </div>

          <div className="flex-1 p-6">
            <form onSubmit={handleSubmit}>
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Change Password
                      </button>
                    </div>

                    <div className="pt-5">
                      <h3 className="text-sm font-medium text-red-700 mb-3">Danger Zone</h3>
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => signOut()}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Log out
                        </button>
                        <div>
                          <button
                            type="button"
                            className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50"
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Workout Reminders</h3>
                        <p className="text-xs text-gray-500">Receive reminders for scheduled workouts</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <input
                          type="checkbox"
                          id="workoutReminders"
                          checked={formData.notifications.workoutReminders}
                          onChange={() => handleCheckboxChange('notifications', 'workoutReminders')}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">New Challenges</h3>
                        <p className="text-xs text-gray-500">Get notified when new challenges are available</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <input
                          type="checkbox"
                          id="newChallenges"
                          checked={formData.notifications.newChallenges}
                          onChange={() => handleCheckboxChange('notifications', 'newChallenges')}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Community Updates</h3>
                        <p className="text-xs text-gray-500">Receive updates from community groups</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <input
                          type="checkbox"
                          id="communityUpdates"
                          checked={formData.notifications.communityUpdates}
                          onChange={() => handleCheckboxChange('notifications', 'communityUpdates')}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Coach Messages</h3>
                        <p className="text-xs text-gray-500">Get notified when coaches send you messages</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <input
                          type="checkbox"
                          id="coachMessages"
                          checked={formData.notifications.coachMessages}
                          onChange={() => handleCheckboxChange('notifications', 'coachMessages')}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Show Workout History</h3>
                        <p className="text-xs text-gray-500">Allow other members to see your workout history</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <input
                          type="checkbox"
                          id="showWorkoutHistory"
                          checked={formData.privacy.showWorkoutHistory}
                          onChange={() => handleCheckboxChange('privacy', 'showWorkoutHistory')}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Show Performance Stats</h3>
                        <p className="text-xs text-gray-500">Display your performance metrics on leaderboards</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <input
                          type="checkbox"
                          id="showPerformanceStats"
                          checked={formData.privacy.showPerformanceStats}
                          onChange={() => handleCheckboxChange('privacy', 'showPerformanceStats')}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700">Allow Tagging</h3>
                        <p className="text-xs text-gray-500">Allow other members to tag you in posts</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <input
                          type="checkbox"
                          id="allowTagging"
                          checked={formData.privacy.allowTagging}
                          onChange={() => handleCheckboxChange('privacy', 'allowTagging')}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'fitness' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Fitness Preferences</h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-700 mb-1">
                        Fitness Level
                      </label>
                      <select
                        id="fitnessLevel"
                        name="fitnessLevel"
                        value={formData.fitnessLevel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fitness Goals
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Strength', 'Endurance', 'Weight Loss', 'Muscle Gain', 'Flexibility', 'Speed', 'Agility', 'Sport Performance'].map((goal) => (
                          <div key={goal} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`goal-${goal}`}
                              checked={formData.goals.includes(goal)}
                              onChange={() => handleGoalToggle(goal)}
                              className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded mr-2"
                            />
                            <label htmlFor={`goal-${goal}`} className="text-sm text-gray-700">
                              {goal}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="sportsFocus" className="block text-sm font-medium text-gray-700 mb-1">
                        Sports Focus (Optional)
                      </label>
                      <input
                        type="text"
                        id="sportsFocus"
                        name="sportsFocus"
                        value={formData.sportsFocus}
                        onChange={handleInputChange}
                        placeholder="e.g., Basketball, Running, Soccer"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <Save className="mr-2 h-5 w-5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;