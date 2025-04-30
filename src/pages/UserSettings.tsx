import React, { useState } from 'react';
import { useAppStore } from '../store';
import { Tab } from '@headlessui/react';
import { 
  UserIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  CogIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Fix the classNames function type
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

// Define a custom User interface that includes all the properties we need
interface ExtendedUser {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string | null;
  bio?: string;
  role?: string;
  // Add any other properties your user might have
  [key: string]: any; // Allow any other properties
}

const UserSettings = () => {
  // Get the user from store with proper type casting
  const userFromStore = useAppStore(state => state.user) as ExtendedUser;
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  // Profile state with default values
  const [name, setName] = useState(userFromStore?.name || '');
  const [bio, setBio] = useState(userFromStore?.bio || '');
  const [avatar, setAvatar] = useState<string | null>(userFromStore?.avatar || null);
  
  // Mock save function
  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  // Mock upload function
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const tabs = [
    { name: 'Profile', icon: UserIcon },
    { name: 'Account', icon: CogIcon },
    { name: 'Notifications', icon: BellIcon },
    { name: 'Privacy', icon: ShieldCheckIcon },
    { name: 'Goals', icon: ChartBarIcon },
  ];

  return (
    <div className="ml-64 p-6 bg-gray-50 min-h-screen">
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded shadow-lg flex items-center z-50 animate-fade-in-down">
          <CheckCircleIcon className="h-5 w-5 mr-2" />
          <span>Settings saved successfully!</span>
        </div>
      )}
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">User Settings</h1>
        <p className="text-gray-600 mb-8">Manage your account settings and preferences</p>
        
        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <Tab.Group onChange={setActiveTab}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-64 bg-gray-50 p-0">
                <Tab.List className="flex flex-col">
                  {tabs.map((tab, index) => (
                    <Tab
                      key={tab.name}
                      className={({ selected }) =>
                        classNames(
                          'w-full py-4 px-6 text-left focus:outline-none transition-colors',
                          selected
                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                            : 'text-gray-600 hover:bg-gray-100'
                        )
                      }
                    >
                      <div className="flex items-center">
                        <tab.icon className="h-5 w-5 mr-3" />
                        <span>{tab.name}</span>
                      </div>
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              
              <div className="flex-1 p-6 md:p-8">
                <Tab.Panels>
                  {/* Profile Tab */}
                  <Tab.Panel>
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-xl font-semibold mb-6 text-gray-800">Profile Information</h2>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          {/* Avatar Section */}
                          <div className="flex flex-col items-center space-y-4">
                            <div className="relative group">
                              {avatar ? (
                                <img 
                                  src={avatar} 
                                  alt={name} 
                                  className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md" 
                                />
                              ) : (
                                <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600 border-4 border-white shadow-md">
                                  {name.charAt(0) || 'U'}
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpTrayIcon className="h-10 w-10 text-white" />
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
                              />
                            </div>
                            <p className="text-sm text-gray-500">Click to upload new photo</p>
                          </div>
                          
                          {/* Profile Fields */}
                          <div className="flex-1 space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all px-4 py-3"
                                placeholder="Your name"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <input
                                type="email"
                                defaultValue={userFromStore?.email}
                                disabled
                                className="w-full rounded-lg border-gray-200 bg-gray-50 text-gray-500 px-4 py-3"
                              />
                              <p className="mt-1 text-xs text-gray-500">Contact support to change your email</p>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                              <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                                placeholder="Tell us about yourself"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100">
                        <button 
                          onClick={handleSave}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring focus:ring-blue-200"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </Tab.Panel>
                  
                  {/* Account Tab */}
                  <Tab.Panel>
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-xl font-semibold mb-6 text-gray-800">Account Security</h2>
                        
                        <div className="space-y-6">
                          <div className="p-6 border border-gray-200 rounded-lg bg-white">
                            <h3 className="font-medium text-gray-800 mb-4">Password</h3>
                            <p className="text-gray-600 mb-4">Last changed on {new Date().toLocaleDateString()}</p>
                            <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:ring focus:ring-blue-200">
                              Change Password
                            </button>
                          </div>
                          
                          <div className="p-6 border border-gray-200 rounded-lg bg-white">
                            <h3 className="font-medium text-gray-800 mb-4">Two-Factor Authentication</h3>
                            <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                            <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:ring focus:ring-blue-200">
                              Enable 2FA
                            </button>
                          </div>
                          
                          <div className="p-6 border border-gray-200 rounded-lg bg-white">
                            <h3 className="font-medium text-gray-800 mb-4">Connected Accounts</h3>
                            <p className="text-gray-600 mb-4">Connect your account with other services</p>
                            <div className="flex flex-wrap gap-3">
                              <button className="px-5 py-2 bg-[#4267B2] text-white rounded-md hover:bg-opacity-90">
                                Connect Facebook
                              </button>
                              <button className="px-5 py-2 bg-[#1DA1F2] text-white rounded-md hover:bg-opacity-90">
                                Connect Twitter
                              </button>
                              <button className="px-5 py-2 bg-[#DB4437] text-white rounded-md hover:bg-opacity-90">
                                Connect Google
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100">
                        <button 
                          onClick={handleSave}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring focus:ring-blue-200"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </Tab.Panel>
                  
                  {/* Notifications Tab */}
                  <Tab.Panel>
                    <div className="space-y-8">
                      <h2 className="text-xl font-semibold mb-6 text-gray-800">Notification Preferences</h2>
                      
                      <div className="space-y-6">
                        <div className="flex items-center justify-between py-4 border-b border-gray-100">
                          <div>
                            <h3 className="font-medium text-gray-800">Workout Reminders</h3>
                            <p className="text-sm text-gray-500">Receive reminders for your scheduled workouts</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-100">
                          <div>
                            <h3 className="font-medium text-gray-800">Goal Updates</h3>
                            <p className="text-sm text-gray-500">Get notifications about your fitness goals progress</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-100">
                          <div>
                            <h3 className="font-medium text-gray-800">Community Activity</h3>
                            <p className="text-sm text-gray-500">Get notifications about likes, comments, and follows</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-100">
                          <div>
                            <h3 className="font-medium text-gray-800">New Features</h3>
                            <p className="text-sm text-gray-500">Be the first to know about new platform features</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100">
                        <button 
                          onClick={handleSave}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring focus:ring-blue-200"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </Tab.Panel>
                  
                  {/* Privacy Tab */}
                  <Tab.Panel>
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">Privacy Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                          <h3 className="font-medium text-gray-800">Profile Visibility</h3>
                          <p className="text-sm text-gray-500">Control who can see your profile information</p>
                        </div>
                        <select className="bg-white border border-gray-300 text-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Public</option>
                          <option>Friends Only</option>
                          <option>Private</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                          <h3 className="font-medium text-gray-800">Activity Visibility</h3>
                          <p className="text-sm text-gray-500">Control who can see your workout activities</p>
                        </div>
                        <select className="bg-white border border-gray-300 text-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>Public</option>
                          <option>Friends Only</option>
                          <option>Private</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                          <h3 className="font-medium text-gray-800">Data Sharing</h3>
                          <p className="text-sm text-gray-500">Allow us to use your data to improve the service</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-gray-100 mt-8">
                      <button 
                        onClick={handleSave}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring focus:ring-blue-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </Tab.Panel>
                  
                  {/* Goals Tab */}
                  <Tab.Panel>
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">Fitness Goals</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 border border-gray-200 rounded-lg bg-white">
                        <h3 className="font-medium text-gray-800 mb-4">Fitness Level</h3>
                        <div className="space-y-2">
                          {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                            <label key={level} className="flex items-center">
                              <input
                                type="radio"
                                name="fitnessLevel"
                                value={level}
                                defaultChecked={level === 'Intermediate'}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="ml-2 text-gray-700">{level}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-6 border border-gray-200 rounded-lg bg-white">
                        <h3 className="font-medium text-gray-800 mb-4">Weekly Target</h3>
                        <div className="space-y-2">
                          <label className="block text-sm text-gray-700 mb-1">Workouts per week</label>
                          <select className="w-full bg-white border border-gray-300 text-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                              <option key={num} value={num}>{num} {num === 1 ? 'workout' : 'workouts'}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="p-6 border border-gray-200 rounded-lg bg-white">
                        <h3 className="font-medium text-gray-800 mb-4">Primary Goal</h3>
                        <div className="space-y-2">
                          {['Lose Weight', 'Build Muscle', 'Improve Endurance', 'General Fitness'].map((goal) => (
                            <label key={goal} className="flex items-center">
                              <input
                                type="radio"
                                name="primaryGoal"
                                value={goal}
                                defaultChecked={goal === 'Build Muscle'}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="ml-2 text-gray-700">{goal}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-6 border border-gray-200 rounded-lg bg-white">
                        <h3 className="font-medium text-gray-800 mb-4">Sports Focus</h3>
                        <select className="w-full bg-white border border-gray-300 text-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">No specific sport</option>
                          <option>Basketball</option>
                          <option>Running</option>
                          <option>Soccer</option>
                          <option>Tennis</option>
                          <option>Swimming</option>
                          <option>Cycling</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-gray-100 mt-8">
                      <button 
                        onClick={handleSave}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring focus:ring-blue-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </div>
            </div>
          </Tab.Group>
          
          {/* Danger Zone */}
          <div className="border-t border-gray-200 mt-8 p-6">
            <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-5 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50">
                Delete Account
              </button>
              <button className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;