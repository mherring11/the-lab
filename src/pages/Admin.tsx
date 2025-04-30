import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserEditModal from '../components/UserEditModal';
import TrialManagementModal from '../components/TrialManagementModal';
import { format, addDays, subDays } from 'date-fns';
import { 
  Users, 
  CreditCard, 
  Settings, 
  PieChart, 
  Search, 
  FilePlus, 
  FileText, 
  Bell, 
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  MessageSquare,
  Mail,
  LifeBuoy,
  Shield,
  AlertTriangle,
  Clock
} from 'lucide-react';
import Logo from '../components/Logo';

// Mock data generator for demo purposes
const generateMockData = () => {
  const users = [
    { 
      id: 'user-1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'user',
      trialEndDate: addDays(new Date(), 7).toISOString(),
      hasActiveSubscription: false,
      joinDate: subDays(new Date(), 10).toISOString(),
      lastActive: subDays(new Date(), 1).toISOString(),
      avatar: null
    },
    { 
      id: 'user-2', 
      name: 'Coach Mike', 
      email: 'mike@example.com', 
      role: 'admin',
      trialEndDate: null,
      hasActiveSubscription: true,
      joinDate: subDays(new Date(), 60).toISOString(),
      lastActive: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    { 
      id: 'user-3', 
      name: 'Sarah Johnson', 
      email: 'sarah@example.com', 
      role: 'user',
      trialEndDate: subDays(new Date(), 5).toISOString(),
      hasActiveSubscription: false,
      joinDate: subDays(new Date(), 20).toISOString(),
      lastActive: subDays(new Date(), 3).toISOString(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    { 
      id: 'user-4', 
      name: 'Alex Thompson', 
      email: 'alex@example.com', 
      role: 'user',
      trialEndDate: addDays(new Date(), 3).toISOString(),
      hasActiveSubscription: false,
      joinDate: subDays(new Date(), 11).toISOString(),
      lastActive: subDays(new Date(), 0).toISOString(),
      avatar: null
    },
    { 
      id: 'user-5', 
      name: 'Lisa Miller', 
      email: 'lisa@example.com', 
      role: 'user',
      trialEndDate: null,
      hasActiveSubscription: true,
      joinDate: subDays(new Date(), 45).toISOString(),
      lastActive: subDays(new Date(), 1).toISOString(),
      avatar: null
    },
  ];

  const recentSubscriptions = [
    {
      id: 'sub-1',
      userId: 'user-2',
      userName: 'Coach Mike',
      planName: 'Pro Plan',
      amount: 29.99,
      date: subDays(new Date(), 2).toISOString(),
      status: 'active'
    },
    {
      id: 'sub-2',
      userId: 'user-5',
      userName: 'Lisa Miller',
      planName: 'Basic Plan',
      amount: 9.99,
      date: subDays(new Date(), 5).toISOString(),
      status: 'active'
    }
  ];

  const recentActivities = [
    { 
      id: 'act-1', 
      userId: 'user-1', 
      userName: 'John Doe', 
      action: 'signed up', 
      date: subDays(new Date(), 10).toISOString() 
    },
    { 
      id: 'act-2', 
      userId: 'user-3', 
      userName: 'Sarah Johnson', 
      action: 'completed trial', 
      date: subDays(new Date(), 5).toISOString() 
    },
    { 
      id: 'act-3', 
      userId: 'user-2', 
      userName: 'Coach Mike', 
      action: 'renewed subscription', 
      date: subDays(new Date(), 2).toISOString() 
    },
    { 
      id: 'act-4', 
      userId: 'user-4', 
      userName: 'Alex Thompson', 
      action: 'updated profile', 
      date: subDays(new Date(), 1).toISOString() 
    },
    { 
      id: 'act-5', 
      userId: 'user-5', 
      userName: 'Lisa Miller', 
      action: 'purchased subscription', 
      date: subDays(new Date(), 5).toISOString() 
    }
  ];

  return { users, recentSubscriptions, recentActivities };
};

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [users, setUsers] = useState<any[]>([]);
  const [recentSubscriptions, setRecentSubscriptions] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  
  // Analytics metrics
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeTrials: 0,
    expiredTrials: 0,
    paidSubscriptions: 0,
    revenue: 0,
    conversionRate: 0
  });
  
  useEffect(() => {
    // Set active section based on URL hash
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
    }
  }, [location]);
  
  useEffect(() => {
    // Fetch mock data
    fetchData();
  }, []);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      // For demo purposes - replace with your actual API calls
      setTimeout(() => {
        const mockData = generateMockData();
        setUsers(mockData.users);
        setRecentSubscriptions(mockData.recentSubscriptions);
        setRecentActivities(mockData.recentActivities);
        
        // Calculate metrics
        const activeTrials = mockData.users.filter(
          u => !u.hasActiveSubscription && u.trialEndDate && new Date(u.trialEndDate) > new Date()
        ).length;
        
        const expiredTrials = mockData.users.filter(
          u => !u.hasActiveSubscription && (!u.trialEndDate || new Date(u.trialEndDate) <= new Date())
        ).length;
        
        const paidSubscriptions = mockData.users.filter(u => u.hasActiveSubscription).length;
        
        const revenue = mockData.recentSubscriptions.reduce((sum, sub) => sum + sub.amount, 0);
        
        const conversionRate = mockData.users.length > 0 
          ? (paidSubscriptions / mockData.users.length * 100).toFixed(1) 
          : 0;
        
        setMetrics({
          totalUsers: mockData.users.length,
          activeTrials,
          expiredTrials,
          paidSubscriptions,
          revenue,
          conversionRate: parseFloat(conversionRate as string)
        });
        
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  
  const handleManageTrial = (user: any) => {
    setSelectedUser(user);
    setIsTrialModalOpen(true);
  };
  
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };
  
  const handleSaveTrialChanges = async (userId: string, trialEndDate: string): Promise<void> => {
    try {
      console.log(`Setting trial end date for ${userId} to ${trialEndDate}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? {...user, trialEndDate} : user
      ));
      
      // Refresh metrics
      updateMetricsAfterChange();
    } catch (error) {
      console.error('Error updating trial:', error);
      throw error;
    }
  };
  
  const handleSaveUser = async (userData: any): Promise<void> => {
    try {
      console.log('Saving user:', userData);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if it's a new user or update
      if (users.some(user => user.id === userData.id)) {
        // Update existing user
        setUsers(users.map(user => 
          user.id === userData.id ? userData : user
        ));
      } else {
        // Add new user with demo ID
        const newUser = {
          ...userData,
          id: `user-${users.length + 1}`,
          joinDate: new Date().toISOString(),
          lastActive: new Date().toISOString()
        };
        setUsers([...users, newUser]);
      }
      
      // Refresh metrics
      updateMetricsAfterChange();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const updateMetricsAfterChange = () => {
    const activeTrials = users.filter(
      u => !u.hasActiveSubscription && u.trialEndDate && new Date(u.trialEndDate) > new Date()
    ).length;
    
    const expiredTrials = users.filter(
      u => !u.hasActiveSubscription && (!u.trialEndDate || new Date(u.trialEndDate) <= new Date())
    ).length;
    
    const paidSubscriptions = users.filter(u => u.hasActiveSubscription).length;
    
    const conversionRate = users.length > 0 
      ? (paidSubscriptions / users.length * 100).toFixed(1) 
      : 0;
    
    setMetrics(prev => ({
      ...prev,
      totalUsers: users.length,
      activeTrials,
      expiredTrials,
      paidSubscriptions,
      conversionRate: parseFloat(conversionRate as string)
    }));
  };

  // Filter users based on search term and filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (userFilter) {
      case 'activeTrials':
        return !user.hasActiveSubscription && 
          user.trialEndDate && 
          new Date(user.trialEndDate) > new Date();
      case 'expiredTrials':
        return !user.hasActiveSubscription && 
          (!user.trialEndDate || new Date(user.trialEndDate) <= new Date());
      case 'subscribers':
        return user.hasActiveSubscription;
      case 'admins':
        return user.role === 'admin' || user.role === 'owner';
      default:
        return true; // 'all' filter
    }
  });

  // Helper function to display trial status
  const getUserTrialStatus = (user: any) => {
    if (user.hasActiveSubscription) {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Subscribed
        </span>
      );
    }
    
    const trialEndDate = user.trialEndDate ? new Date(user.trialEndDate) : null;
    const isTrialActive = trialEndDate && trialEndDate > new Date();
    
    if (isTrialActive) {
      const daysLeft = Math.ceil((trialEndDate!.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          Trial: {daysLeft} days left
        </span>
      );
    }
    
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
        Trial Expired
      </span>
    );
  };

  // Navigation handler
  const handleNavigation = (section: string) => {
    setActiveSection(section);
    navigate(`#${section}`);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 flex items-center cursor-pointer" onClick={() => window.location.href = '/dashboard'}>
          <Logo asLink={false} />
        </div>
        <nav className="mt-6">
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main
          </div>
          <a 
            onClick={() => handleNavigation('dashboard')}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer ${activeSection === 'dashboard' ? 'bg-yellow-50 text-yellow-700 border-r-4 border-yellow-700' : ''}`}
          >
            <PieChart className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </a>
          <a 
            onClick={() => handleNavigation('users')}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer ${activeSection === 'users' ? 'bg-yellow-50 text-yellow-700 border-r-4 border-yellow-700' : ''}`}
          >
            <Users className="h-5 w-5 mr-3" />
            <span>Users</span>
          </a>
          <a 
            onClick={() => handleNavigation('subscriptions')}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer ${activeSection === 'subscriptions' ? 'bg-yellow-50 text-yellow-700 border-r-4 border-yellow-700' : ''}`}
          >
            <CreditCard className="h-5 w-5 mr-3" />
            <span>Subscriptions</span>
          </a>

          <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Content
          </div>
          <a 
            onClick={() => handleNavigation('content')}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer ${activeSection === 'content' ? 'bg-yellow-50 text-yellow-700 border-r-4 border-yellow-700' : ''}`}
          >
            <FileText className="h-5 w-5 mr-3" />
            <span>Content Library</span>
          </a>
          <a 
            onClick={() => handleNavigation('create-content')}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer ${activeSection === 'create-content' ? 'bg-yellow-50 text-yellow-700 border-r-4 border-yellow-700' : ''}`}
          >
            <FilePlus className="h-5 w-5 mr-3" />
            <span>Create Content</span>
          </a>

          <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            System
          </div>
          <a 
            onClick={() => handleNavigation('analytics')}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer ${activeSection === 'analytics' ? 'bg-yellow-50 text-yellow-700 border-r-4 border-yellow-700' : ''}`}
          >
            <PieChart className="h-5 w-5 mr-3" />
            <span>Analytics</span>
          </a>
          <a 
            onClick={() => handleNavigation('notifications')}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer ${activeSection === 'notifications' ? 'bg-yellow-50 text-yellow-700 border-r-4 border-yellow-700' : ''}`}
          >
            <Bell className="h-5 w-5 mr-3" />
            <span>Notifications</span>
          </a>
          <a 
            onClick={() => handleNavigation('settings')}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer ${activeSection === 'settings' ? 'bg-yellow-50 text-yellow-700 border-r-4 border-yellow-700' : ''}`}
          >
            <Settings className="h-5 w-5 mr-3" />
            <span>Settings</span>
          </a>
        </nav>
        
        {/* Admin Help Section */}
        <div className="absolute bottom-0 left-0 w-64 bg-gray-50 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                ?
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin Help</p>
                <p className="text-xs text-gray-500">View documentation</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-6 py-3">
            <div></div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </div>
              <div className="relative">
                <MessageSquare className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </div>
              <button className="flex items-center text-sm focus:outline-none">
                <img 
                  className="h-8 w-8 rounded-full border-2 border-gray-200" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Admin User" 
                />
                <span className="ml-2 hidden md:block">Admin User</span>
                <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-6">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    Last 30 Days
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => fetchData()}
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Total Users */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Users</p>
                      <p className="text-3xl font-bold text-gray-800">{metrics.totalUsers}</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-full">
                      <Users className="h-6 w-6 text-yellow-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-green-600 font-medium flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      12%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                
                {/* Active Trials */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Trials</p>
                      <p className="text-3xl font-bold text-gray-800">{metrics.activeTrials}</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-full">
                      <Calendar className="h-6 w-6 text-yellow-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-green-600 font-medium flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      5%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                
                {/* Paid Subscriptions */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Paid Subscriptions</p>
                      <p className="text-3xl font-bold text-gray-800">{metrics.paidSubscriptions}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-full">
                      <CreditCard className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-green-600 font-medium flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      8%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                
                {/* Conversion Rate */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                      <p className="text-3xl font-bold text-gray-800">{metrics.conversionRate}%</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-full">
                      <PieChart className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-red-600 font-medium flex items-center">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      2%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity and Subscriptions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                    <button className="text-sm text-yellow-600 hover:text-yellow-800">View all</button>
                  </div>
                  <div className="space-y-4">
                    {recentActivities.slice(0, 4).map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          {activity.userName.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.userName} <span className="font-normal text-gray-500">{activity.action}</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(new Date(activity.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recent Subscriptions */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Subscriptions</h3>
                    <button className="text-sm text-yellow-600 hover:text-yellow-800">View all</button>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentSubscriptions.map((subscription) => (
                        <tr key={subscription.id}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                            {subscription.userName}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {subscription.planName}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            ${subscription.amount}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(subscription.date), 'MMM d, yyyy')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* System Status */}
              <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">System Status</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm font-medium text-gray-700">API Status</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">All systems operational</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm font-medium text-gray-700">Database Status</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">100% uptime</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                      <p className="text-sm font-medium text-gray-700">Email Service</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Minor delays (2-3 min)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Users Section */}
          {activeSection === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    setIsEditModalOpen(true);
                  }}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 flex items-center"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Add New User
                </button>
              </div>
              
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 mr-4">
                    <Calendar className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Trials</p>
                    <p className="text-xl font-bold text-gray-800">{metrics.activeTrials}</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
                  <div className="p-3 rounded-full bg-red-100 mr-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Expired Trials</p>
                    <p className="text-xl font-bold text-gray-800">{metrics.expiredTrials}</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Subscribers</p>
                    <p className="text-xl font-bold text-gray-800">{metrics.paidSubscriptions}</p>
                  </div>
                </div>
              </div>
              
              {/* Search and Filter Tools */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center flex-grow max-w-md">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`px-3 py-1.5 rounded-full text-sm ${userFilter === 'all' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setUserFilter('all')}
                    >
                      All Users
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-full text-sm ${userFilter === 'activeTrials' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setUserFilter('activeTrials')}
                    >
                      Active Trials
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-full text-sm ${userFilter === 'expiredTrials' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setUserFilter('expiredTrials')}
                    >
                      Expired Trials
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-full text-sm ${userFilter === 'subscribers' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setUserFilter('subscribers')}
                    >
                      Subscribers
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-full text-sm ${userFilter === 'admins' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setUserFilter('admins')}
                    >
                      Admins
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Users Table */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
                  <p className="mt-4 text-gray-500">Loading users...</p>
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-base font-semibold text-gray-700">
                      Users ({filteredUsers.length})
                    </h3>
                    <div className="flex items-center gap-2">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Filter className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Download className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                            No users found matching your criteria
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map(user => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {user.avatar ? (
                                  <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-xs text-gray-500">Last active: {format(new Date(user.lastActive), 'MMM d, yyyy')}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                ${user.role === 'admin' || user.role === 'owner' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getUserTrialStatus(user)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {format(new Date(user.joinDate), 'MMM d, yyyy')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-3">
                                <button 
                                  onClick={() => handleEditUser(user)}
                                  className="text-yellow-600 hover:text-yellow-800"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleManageTrial(user)}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  Trial
                                </button>
                                <button className="text-red-600 hover:text-red-900">Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                  <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                        <span className="font-medium">{filteredUsers.length}</span> results
                      </div>
                      <div className="flex-1 flex justify-end">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Previous</span>
                            {/* Chevron left icon */}
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </a>
                          <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                            1
                          </a>
                          <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Next</span>
                            {/* Chevron right icon */}
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </a>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Subscriptions Section */}
          {activeSection === 'subscriptions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Subscription Management</h2>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                  Add New Plan
                </button>
              </div>
              
              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Basic Plan */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Basic Plan</h3>
                      <p className="text-xl font-bold mt-2">$9.99<span className="text-sm font-normal text-gray-500">/month</span></p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Features:</p>
                    <ul className="mt-2 space-y-1">
                      <li className="text-sm flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Basic access to all features
                      </li>
                      <li className="text-sm flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        5 projects
                      </li>
                      <li className="text-sm flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Limited storage
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5 flex justify-end space-x-2">
                    <button className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50">Edit</button>
                    <button className="px-3 py-1.5 text-sm border border-red-300 rounded text-red-700 hover:bg-red-50">Disable</button>
                  </div>
                </div>
                
                {/* Pro Plan */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
                  <div className="absolute right-0 top-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    Popular
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Pro Plan</h3>
                      <p className="text-xl font-bold mt-2">$29.99<span className="text-sm font-normal text-gray-500">/month</span></p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Features:</p>
                    <ul className="mt-2 space-y-1">
                      <li className="text-sm flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Full access to all features
                      </li>
                      <li className="text-sm flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Unlimited projects
                      </li>
                      <li className="text-sm flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Premium support
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5 flex justify-end space-x-2">
                    <button className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50">Edit</button>
                    <button className="px-3 py-1.5 text-sm border border-red-300 rounded text-red-700 hover:bg-red-50">Disable</button>
                  </div>
                </div>
                
                {/* Enterprise Plan */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Enterprise Plan</h3>
                      <p className="text-xl font-bold mt-2">$99.99<span className="text-sm font-normal text-gray-500">/month</span></p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Features:</p>
                    <ul className="mt-2 space-y-1">
                      <li className="text-sm flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Everything in Pro
                      </li>
                      <li className="text-sm flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Dedicated account manager
                      </li>
                      <li className="text-sm flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        SLA & priority support
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5 flex justify-end space-x-2">
                    <button className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50">Edit</button>
                    <button className="px-3 py-1.5 text-sm border border-red-300 rounded text-red-700 hover:bg-red-50">Disable</button>
                  </div>
                </div>
              </div>
              
              {/* Recent Subscriptions */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Subscriptions</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentSubscriptions.map((subscription) => (
                      <tr key={subscription.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {subscription.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {subscription.planName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${subscription.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(subscription.date), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {subscription.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-yellow-600 hover:text-yellow-800">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Content Section */}
          {activeSection === 'content' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Content Library</h2>
                <button 
                  onClick={() => handleNavigation('create-content')}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 flex items-center"
                >
                  <FilePlus className="h-4 w-4 mr-2" />
                  Create Content
                </button>
              </div>
              
              {/* Content filters */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center flex-grow max-w-md">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5"
                        placeholder="Search content..."
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 rounded-full text-sm bg-yellow-100 text-yellow-800">
                      All Content
                    </button>
                    <button className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">
                      Articles
                    </button>
                    <button className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">
                      Videos
                    </button>
                    <button className="px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">
                      Courses
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Content grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Article 1 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Content Preview" 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Getting Started Guide</h3>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Published
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">A complete beginner's guide to using our platform effectively.</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Last updated: Apr 1, 2025
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-sm text-yellow-600 hover:text-yellow-800">Edit</button>
                        <button className="text-sm text-gray-600 hover:text-gray-800">Preview</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Video 1 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Content Preview" 
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-full bg-white bg-opacity-75 flex items-center justify-center">
                        <div className="h-0 w-0 border-y-8 border-y-transparent border-l-12 border-l-yellow-600 ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Platform Tutorial</h3>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Published
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Video walkthrough of the main platform features.</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Last updated: Mar 25, 2025
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-sm text-yellow-600 hover:text-yellow-800">Edit</button>
                        <button className="text-sm text-gray-600 hover:text-gray-800">Preview</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Course 1 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Content Preview" 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">Advanced Features Course</h3>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        Draft
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Deep dive into advanced platform capabilities.</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Last updated: Mar 20, 2025
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-sm text-yellow-600 hover:text-yellow-800">Edit</button>
                        <button className="text-sm text-gray-600 hover:text-gray-800">Preview</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Create Content Section */}
          {activeSection === 'create-content' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create Content</h2>
                <p className="text-gray-600 mt-1">Add new content to your platform</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="mb-6">
                  <label htmlFor="content-type" className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                  <select
                    id="content-type"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
                  >
                    <option>Article</option>
                    <option>Video</option>
                    <option>Course</option>
                    <option>Lesson</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter content title"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description"
                    rows={4}
                    className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter content description"
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="editor" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <div className="border border-gray-300 rounded-md p-2">
                    <div className="flex border-b border-gray-300 pb-2 mb-2">
                      <button className="p-1 rounded hover:bg-gray-100 mr-1">
                        <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.23 1h-6.46L.92 6.85v6.3l5.85 5.85h6.46l5.85-5.85v-6.3L13.23 1zm.77 10.15H6V8.85h8v2.3z"></path>
                        </svg>
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100 mr-1">
                        <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 5.5a.5.5 0 01.5.5v4h4a.5.5 0 010 1h-4v4a.5.5 0 01-1 0v-4h-4a.5.5 0 010-1h4V6a.5.5 0 01.5-.5z"></path>
                        </svg>
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100 mr-1">
                        <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 3.5a.5.5 0 00-.5.5v4h-4a.5.5 0 000 1h4v4a.5.5 0 001 0v-4h4a.5.5 0 000-1h-4V4a.5.5 0 00-.5-.5z"></path>
                        </svg>
                      </button>
                      <span className="border-l border-gray-300 mx-2"></span>
                      <button className="p-1 rounded hover:bg-gray-100 mr-1">
                        <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 5.5A1.5 1.5 0 016.5 4h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 015 8.5v-3zM6.5 5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3z"></path>
                        </svg>
                      </button>
                    </div>
                    <textarea
                      id="editor"
                      rows={10}
                      className="block w-full focus:ring-0 focus:outline-none sm:text-sm border-0"
                      placeholder="Write your content here..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === 'analytics' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    Last 30 Days
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                  </button>
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    <span className="ml-2">Export</span>
                  </button>
                </div>
              </div>
              
              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Users</p>
                      <p className="text-3xl font-bold text-gray-800">1,249</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-full">
                      <Users className="h-6 w-6 text-yellow-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-green-600 font-medium flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      12%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">New Signups</p>
                      <p className="text-3xl font-bold text-gray-800">324</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-full">
                      <Users className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-green-600 font-medium flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      18%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Revenue</p>
                      <p className="text-3xl font-bold text-gray-800">$9,874</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-full">
                      <CreditCard className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-green-600 font-medium flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      7%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Avg. Session</p>
                      <p className="text-3xl font-bold text-gray-800">8:14</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-full">
                      <Clock className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-red-600 font-medium flex items-center">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      3%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs last month</span>
                  </div>
                </div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">User Growth</h3>
                    <select className="text-sm border-gray-300 rounded-md">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end">
                    {/* Placeholder for chart - in a real app, you'd use a library like Chart.js or Recharts */}
                    <div className="w-full">
                      <div className="flex items-end justify-between h-full">
                        <div className="w-1/12 h-20 bg-yellow-500 rounded-t"></div>
                        <div className="w-1/12 h-24 bg-yellow-500 rounded-t"></div>
                        <div className="w-1/12 h-16 bg-yellow-500 rounded-t"></div>
                        <div className="w-1/12 h-32 bg-yellow-500 rounded-t"></div>
                        <div className="w-1/12 h-40 bg-yellow-500 rounded-t"></div>
                        <div className="w-1/12 h-36 bg-yellow-500 rounded-t"></div>
                        <div className="w-1/12 h-48 bg-yellow-500 rounded-t"></div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                        <div>Sun</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Revenue</h3>
                    <select className="text-sm border-gray-300 rounded-md">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-center justify-center">
                    {/* Placeholder for pie chart */}
                    <div className="relative h-40 w-40">
                      <div className="absolute inset-0 rounded-full bg-yellow-500 opacity-20"></div>
                      <div className="absolute inset-[10%] rounded-full bg-green-500 opacity-20"></div>
                      <div className="absolute inset-[20%] rounded-full bg-yellow-500 opacity-20"></div>
                      <div className="absolute inset-[30%] rounded-full bg-red-500 opacity-20"></div>
                      <div className="absolute inset-[40%] rounded-full bg-purple-500 opacity-20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-semibold">$9,874</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* User Retention */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">User Retention</h3>
                  <button className="text-sm text-yellow-600 hover:text-yellow-800">View Details</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cohort</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week 1</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week 2</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week 3</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week 4</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">March 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">124</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                            </div>
                            <span className="ml-2">92%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                            </div>
                            <span className="ml-2">78%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '64%'}}></div>
                            </div>
                            <span className="ml-2">64%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '52%'}}></div>
                            </div>
                            <span className="ml-2">52%</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">February 2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">98</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '89%'}}></div>
                            </div>
                            <span className="ml-2">89%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '72%'}}></div>
                            </div>
                            <span className="ml-2">72%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '56%'}}></div>
                            </div>
                            <span className="ml-2">56%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '48%'}}></div>
                            </div>
                            <span className="ml-2">48%</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                    Mark all as read
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                    Settings
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold text-gray-700">
                      Today
                    </h3>
                    <button className="text-xs text-yellow-600 hover:text-yellow-800">
                      Clear All
                    </button>
                  </div>
                </div>
                <ul className="divide-y divide-gray-200">
                  <li className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          System Alert
                        </p>
                        <p className="text-sm text-gray-500">
                          There was a failed login attempt from a new location.
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          10 minutes ago
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          New User Registration
                        </p>
                        <p className="text-sm text-gray-500">
                          Alex Thompson has just created an account.
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-yellow-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          New Subscription
                        </p>
                        <p className="text-sm text-gray-500">
                          Sarah Johnson upgraded to the Pro Plan.
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          3 hours ago
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold text-gray-700">
                      Yesterday
                    </h3>
                    <button className="text-xs text-yellow-600 hover:text-yellow-800">
                      Clear All
                    </button>
                  </div>
                </div>
                <ul className="divide-y divide-gray-200">
                  <li className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-yellow-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          Subscription Ending
                        </p>
                        <p className="text-sm text-gray-500">
                          Lisa Miller's subscription is ending in 3 days.
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Yesterday at 4:30 PM
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">
                          Content Update
                        </p>
                        <p className="text-sm text-gray-500">
                          Coach Mike published a new article "Getting Started Guide".
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Yesterday at 2:15 PM
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
                <p className="text-gray-600 mt-1">Manage your application settings</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">General Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Site Name</p>
                      <p className="text-sm text-gray-500">The name of your application</p>
                    </div>
                    <div className="w-1/3">
                      <input 
                        type="text" 
                        className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue="The Lab"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Default Language</p>
                      <p className="text-sm text-gray-500">Default language for new users</p>
                    </div>
                    <div className="w-1/3">
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Timezone</p>
                      <p className="text-sm text-gray-500">Your application's timezone</p>
                    </div>
                    <div className="w-1/3">
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md">
                        <option>UTC</option>
                        <option>America/New_York</option>
                        <option>America/Chicago</option>
                        <option>America/Los_Angeles</option>
                        <option>Europe/London</option>
                        <option>Asia/Tokyo</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Enable Maintenance Mode</p>
                      <p className="text-sm text-gray-500">Put the application into maintenance mode</p>
                    </div>
                    <div>
                      <label className="switch">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Email Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">From Address</p>
                      <p className="text-sm text-gray-500">The email address that emails are sent from</p>
                    </div>
                    <div className="w-1/3">
                      <input 
                        type="email" 
                        className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue="no-reply@thelab.com"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">From Name</p>
                      <p className="text-sm text-gray-500">The name that emails are sent from</p>
                    </div>
                    <div className="w-1/3">
                      <input 
                        type="text" 
                        className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue="The Lab Team"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Send Welcome Email</p>
                      <p className="text-sm text-gray-500">Send a welcome email to new users</p>
                    </div>
                    <div>
                      <label className="switch">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Security Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Require two-factor authentication for all users</p>
                    </div>
                    <div>
                      <label className="switch">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Password Reset Timeout</p>
                      <p className="text-sm text-gray-500">Time before password reset links expire</p>
                    </div>
                    <div className="w-1/3">
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md">
                        <option>1 hour</option>
                        <option>6 hours</option>
                        <option selected>24 hours</option>
                        <option>48 hours</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Session Timeout</p>
                      <p className="text-sm text-gray-500">Time before user sessions expire</p>
                    </div>
                    <div className="w-1/3">
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md">
                        <option>1 hour</option>
                        <option selected>6 hours</option>
                        <option>12 hours</option>
                        <option>24 hours</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700 flex items-center">
                        <Shield className="h-4 w-4 text-red-500 mr-1" />
                        Force Password Reset
                      </p>
                      <p className="text-sm text-gray-500">Force all users to reset their passwords</p>
                    </div>
                    <div>
                      <button className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50">
                        Force Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button className="mr-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* User editing modal */}
      <UserEditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
      />
      
      {/* Trial management modal */}
      <TrialManagementModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveTrialChanges}
      />
    </div>
  );
};

export default Admin;