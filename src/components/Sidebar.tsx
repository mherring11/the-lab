import React from 'react'; // Remove useState since we don't need it anymore
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store';
import Logo from './Logo';
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  ChatBubbleLeftEllipsisIcon,
  CogIcon,
  BoltIcon,
  FireIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  // @ts-ignore - Fix type issues
  const user = useAppStore(state => state.user);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'Workouts', path: '/workouts', icon: FireIcon },
    { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
    { name: 'Training Log', path: '/workout-logger', icon: ClipboardDocumentListIcon },
    { name: 'Performance', path: '/performance-metrics', icon: BoltIcon },
    { name: 'Community', path: '/community', icon: UserGroupIcon },
    { name: 'Challenges', path: '/challenges', icon: CalendarIcon },
    { name: 'Chat', path: '/chat', icon: ChatBubbleLeftEllipsisIcon },
  ];

  return (
    <div className="bg-white text-gray-800 h-screen fixed left-0 top-0 overflow-y-auto shadow-lg w-64">
      <div className="flex flex-col h-full">
        {/* Logo - Now clickable and navigates to home */}
        <div className="p-4 flex items-center">
          <Link to="/home" className="flex items-center">
            <Logo asLink={true} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-grow">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 hover:bg-gray-100 rounded-md transition-colors ${
                    isActive(item.path) ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Admin Section */}
        {user?.role === 'admin' && (
          <div className="mt-6 mb-2 px-4">
            <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Administration</p>
            <ul className="space-y-1 px-2">
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center px-4 py-3 hover:bg-gray-100 rounded-md transition-colors ${
                    isActive('/admin') ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                >
                  <CogIcon className="h-5 w-5" />
                  <span className="ml-3">Admin Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className={`flex items-center px-4 py-3 hover:bg-gray-100 rounded-md transition-colors ${
                    isActive('/admin/users') ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                >
                  <UserGroupIcon className="h-5 w-5" />
                  <span className="ml-3">Manage Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/analytics"
                  className={`flex items-center px-4 py-3 hover:bg-gray-100 rounded-md transition-colors ${
                    isActive('/admin/analytics') ? 'bg-blue-100 text-blue-700' : ''
                  }`}
                >
                  <ChartBarIcon className="h-5 w-5" />
                  <span className="ml-3">Platform Analytics</span>
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* User Profile Section */}
        <div className="mt-auto border-t border-gray-200 p-4">
          <div className="flex flex-col space-y-3">
            <Link to="/settings" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="h-8 w-8 rounded-full" />
                ) : (
                  <span className="text-sm font-medium text-blue-700">{user?.name?.charAt(0) || 'U'}</span>
                )}
              </div>
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium text-gray-800">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.email || ''}</p>
              </div>
              <CogIcon className="h-4 w-4 text-gray-400" />
            </Link>
            
            {/* Logout Button */}
            <button 
              onClick={() => useAppStore.getState().logout()}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;