import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { User, Lock, Bell, Activity, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppStore } from '../store';
const SettingsPage = () => {
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleCheckboxChange = (category, name) => {
        setFormData({
            ...formData,
            [category]: {
                ...formData[category],
                [name]: !formData[category][name]
            }
        });
    };
    const handleGoalToggle = (goal) => {
        const updatedGoals = formData.goals.includes(goal)
            ? formData.goals.filter(g => g !== goal)
            : [...formData.goals, goal];
        setFormData({
            ...formData,
            goals: updatedGoals
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            setUser({
                ...user,
                name: formData.name,
                email: formData.email,
                fitnessLevel: formData.fitnessLevel,
                goals: formData.goals,
                sportsFocus: formData.sportsFocus
            });
        }
        alert('Settings saved successfully!');
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsx("div", { className: "md:flex md:items-center md:justify-between mb-6", children: _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Settings" }), _jsx("p", { className: "text-gray-500", children: "Manage your account preferences" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden", children: _jsxs("div", { className: "md:flex", children: [_jsx("div", { className: "md:w-64 bg-gray-50 p-4 border-r border-gray-200", children: _jsxs("nav", { className: "space-y-1", children: [_jsxs("button", { onClick: () => setActiveTab('profile'), className: `flex items-center px-3 py-2 w-full text-left rounded-md ${activeTab === 'profile'
                                            ? 'bg-yellow-50 text-yellow-700'
                                            : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(User, { className: "mr-3 h-5 w-5" }), _jsx("span", { className: "text-sm font-medium", children: "Profile" })] }), _jsxs("button", { onClick: () => setActiveTab('notifications'), className: `flex items-center px-3 py-2 w-full text-left rounded-md ${activeTab === 'notifications'
                                            ? 'bg-yellow-50 text-yellow-700'
                                            : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(Bell, { className: "mr-3 h-5 w-5" }), _jsx("span", { className: "text-sm font-medium", children: "Notifications" })] }), _jsxs("button", { onClick: () => setActiveTab('privacy'), className: `flex items-center px-3 py-2 w-full text-left rounded-md ${activeTab === 'privacy'
                                            ? 'bg-yellow-50 text-yellow-700'
                                            : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(Lock, { className: "mr-3 h-5 w-5" }), _jsx("span", { className: "text-sm font-medium", children: "Privacy" })] }), _jsxs("button", { onClick: () => setActiveTab('fitness'), className: `flex items-center px-3 py-2 w-full text-left rounded-md ${activeTab === 'fitness'
                                            ? 'bg-yellow-50 text-yellow-700'
                                            : 'text-gray-700 hover:bg-gray-100'}`, children: [_jsx(Activity, { className: "mr-3 h-5 w-5" }), _jsx("span", { className: "text-sm font-medium", children: "Fitness Preferences" })] })] }) }), _jsx("div", { className: "flex-1 p-6", children: _jsxs("form", { onSubmit: handleSubmit, children: [activeTab === 'profile' && (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Profile Information" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 mb-1", children: "Full Name" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleInputChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: "Email Address" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleInputChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }), _jsx("button", { type: "button", className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50", children: "Change Password" })] }), _jsxs("div", { className: "pt-5", children: [_jsx("h3", { className: "text-sm font-medium text-red-700 mb-3", children: "Danger Zone" }), _jsxs("div", { className: "space-y-3", children: [_jsx("button", { type: "button", onClick: () => signOut(), className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50", children: "Log out" }), _jsx("div", { children: _jsx("button", { type: "button", className: "px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50", children: "Delete Account" }) })] })] })] })] })), activeTab === 'notifications' && (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Notification Preferences" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-700", children: "Workout Reminders" }), _jsx("p", { className: "text-xs text-gray-500", children: "Receive reminders for scheduled workouts" })] }), _jsx("div", { className: "ml-4 flex-shrink-0", children: _jsx("input", { type: "checkbox", id: "workoutReminders", checked: formData.notifications.workoutReminders, onChange: () => handleCheckboxChange('notifications', 'workoutReminders'), className: "h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-700", children: "New Challenges" }), _jsx("p", { className: "text-xs text-gray-500", children: "Get notified when new challenges are available" })] }), _jsx("div", { className: "ml-4 flex-shrink-0", children: _jsx("input", { type: "checkbox", id: "newChallenges", checked: formData.notifications.newChallenges, onChange: () => handleCheckboxChange('notifications', 'newChallenges'), className: "h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-700", children: "Community Updates" }), _jsx("p", { className: "text-xs text-gray-500", children: "Receive updates from community groups" })] }), _jsx("div", { className: "ml-4 flex-shrink-0", children: _jsx("input", { type: "checkbox", id: "communityUpdates", checked: formData.notifications.communityUpdates, onChange: () => handleCheckboxChange('notifications', 'communityUpdates'), className: "h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-700", children: "Coach Messages" }), _jsx("p", { className: "text-xs text-gray-500", children: "Get notified when coaches send you messages" })] }), _jsx("div", { className: "ml-4 flex-shrink-0", children: _jsx("input", { type: "checkbox", id: "coachMessages", checked: formData.notifications.coachMessages, onChange: () => handleCheckboxChange('notifications', 'coachMessages'), className: "h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" }) })] })] })] })), activeTab === 'privacy' && (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Privacy Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-700", children: "Show Workout History" }), _jsx("p", { className: "text-xs text-gray-500", children: "Allow other members to see your workout history" })] }), _jsx("div", { className: "ml-4 flex-shrink-0", children: _jsx("input", { type: "checkbox", id: "showWorkoutHistory", checked: formData.privacy.showWorkoutHistory, onChange: () => handleCheckboxChange('privacy', 'showWorkoutHistory'), className: "h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-700", children: "Show Performance Stats" }), _jsx("p", { className: "text-xs text-gray-500", children: "Display your performance metrics on leaderboards" })] }), _jsx("div", { className: "ml-4 flex-shrink-0", children: _jsx("input", { type: "checkbox", id: "showPerformanceStats", checked: formData.privacy.showPerformanceStats, onChange: () => handleCheckboxChange('privacy', 'showPerformanceStats'), className: "h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-700", children: "Allow Tagging" }), _jsx("p", { className: "text-xs text-gray-500", children: "Allow other members to tag you in posts" })] }), _jsx("div", { className: "ml-4 flex-shrink-0", children: _jsx("input", { type: "checkbox", id: "allowTagging", checked: formData.privacy.allowTagging, onChange: () => handleCheckboxChange('privacy', 'allowTagging'), className: "h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded" }) })] })] })] })), activeTab === 'fitness' && (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Fitness Preferences" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "fitnessLevel", className: "block text-sm font-medium text-gray-700 mb-1", children: "Fitness Level" }), _jsxs("select", { id: "fitnessLevel", name: "fitnessLevel", value: formData.fitnessLevel, onChange: handleInputChange, className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500", children: [_jsx("option", { value: "beginner", children: "Beginner" }), _jsx("option", { value: "intermediate", children: "Intermediate" }), _jsx("option", { value: "advanced", children: "Advanced" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Fitness Goals" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: ['Strength', 'Endurance', 'Weight Loss', 'Muscle Gain', 'Flexibility', 'Speed', 'Agility', 'Sport Performance'].map((goal) => (_jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", id: `goal-${goal}`, checked: formData.goals.includes(goal), onChange: () => handleGoalToggle(goal), className: "h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded mr-2" }), _jsx("label", { htmlFor: `goal-${goal}`, className: "text-sm text-gray-700", children: goal })] }, goal))) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "sportsFocus", className: "block text-sm font-medium text-gray-700 mb-1", children: "Sports Focus (Optional)" }), _jsx("input", { type: "text", id: "sportsFocus", name: "sportsFocus", value: formData.sportsFocus, onChange: handleInputChange, placeholder: "e.g., Basketball, Running, Soccer", className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" })] })] })] })), _jsx("div", { className: "mt-6 flex justify-end", children: _jsxs("button", { type: "submit", className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500", children: [_jsx(Save, { className: "mr-2 h-5 w-5" }), "Save Changes"] }) })] }) })] }) })] }));
};
export default SettingsPage;
