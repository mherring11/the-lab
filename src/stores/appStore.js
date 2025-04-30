import { create } from 'zustand';
export const useAppStore = create((set) => ({
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
