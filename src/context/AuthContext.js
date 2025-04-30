import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router-dom';
// Create context with default undefined value
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // Helper function to convert Supabase user to your app's User type
    const convertUser = (supabaseUser) => {
        if (!supabaseUser)
            return null;
        // Create a user object matching your User interface
        return {
            id: supabaseUser.id,
            email: supabaseUser.email || '', // Provide fallbacks for required fields
            // Add other fields with default values as needed
            name: '',
            role: 'user',
            hasActiveSubscription: false,
            // Add other default values as needed
        };
    };
    useEffect(() => {
        // Check active sessions and sets the user
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            // Convert the Supabase user to your app's User type
            setUser(convertUser(session?.user ?? null));
            setLoading(false);
        };
        getSession();
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            // Convert the Supabase user to your app's User type
            setUser(convertUser(session?.user ?? null));
        });
        return () => subscription.unsubscribe();
    }, []);
    const handleLogin = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error)
                throw error;
            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();
            useAppStore.setState({ user: profileData });
            if (profileData.role === 'owner' || profileData.role === 'admin') {
                navigate('/admin');
            }
            else {
                navigate('/dashboard');
            }
        }
        catch (error) {
            console.error('Error during login:', error);
        }
    };
    const updateUser = async (userData) => {
        if (!user)
            return;
        try {
            // Update the user in your database
            const { error } = await supabase
                .from('users')
                .update(userData)
                .eq('id', user.id);
            if (error)
                throw error;
            // Fix the type safety issue with setUser
            setUser((prevUser) => {
                if (!prevUser)
                    return null;
                return { ...prevUser, ...userData };
            });
            // Import the store's User type to cast correctly
            // Update app store using type from your types file
            if (user) {
                const updatedUser = { ...user, ...userData };
                // Make sure all required fields are present before updating the store
                useAppStore.getState().setUser({
                    id: updatedUser.id || String(Date.now()),
                    name: updatedUser.name || 'User', // Ensure required fields have values
                    email: updatedUser.email || '',
                    role: updatedUser.role || 'user',
                    trialEndDate: updatedUser.trialEndDate || null,
                    hasActiveSubscription: updatedUser.hasActiveSubscription || false
                });
            }
        }
        catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };
    const value = {
        signUp: (data) => supabase.auth.signUp(data),
        signIn: (data) => supabase.auth.signInWithPassword(data),
        signOut: () => supabase.auth.signOut(),
        handleLogin,
        updateUser,
        user,
        loading,
    };
    return (_jsx(AuthContext.Provider, { value: value, children: !loading && children }));
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
