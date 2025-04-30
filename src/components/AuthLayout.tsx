import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import { useAppStore } from '../store';

const AuthLayout: React.FC = () => {
  const [expanded, setExpanded] = useState(true); 
  // Ideally, this state should be lifted up from Sidebar or shared via context

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className={`flex-1 overflow-auto ${expanded ? 'ml-64' : 'ml-20'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;