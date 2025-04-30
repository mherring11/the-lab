import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void; // Add this line to define the type
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  // Add the logout function here
  logout: () => {
    // Clear user data
    set({ user: null });
    
    // Clear any tokens from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    // Redirect to login page
    window.location.href = '/login';
  },
}));