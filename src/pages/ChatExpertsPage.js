import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useAppStore } from '../stores/appStore';
import ChatWithExpert from '../components/ChatWithExpert';
import { Search } from 'lucide-react';
// Expert categories for filtering
const CATEGORIES = {
    ALL: 'All',
    TRAINING: 'Training',
    NUTRITION: 'Nutrition',
    RECOVERY: 'Recovery',
    WELLNESS: 'Wellness'
};
// AI Expert definitions
const AI_EXPERTS = [
    {
        id: 'coach-mike',
        name: 'Coach Mike',
        title: 'Personal Trainer',
        avatar: '💪',
        category: CATEGORIES.TRAINING,
        description: 'Customized workout programs, form guidance, and training plans to meet your fitness goals.',
        systemPrompt: `You are Coach Mike, an experienced personal trainer with 15+ years helping clients achieve their fitness goals. 
    You specialize in creating customized workout programs with specific sets, reps, and rest times based on a user's fitness level and goals.
    You're motivating but realistic, always providing science-backed advice while keeping workouts fresh and engaging.
    Always ask about injury history and current fitness level before suggesting workouts.
    When recommending exercises, include sets, reps, rest periods, and form cues.
    Keep your tone energetic, supportive, and occasionally use fitness metaphors.`
    },
    {
        id: 'dr-nourish',
        name: 'Dr. Nourish',
        title: 'Nutritionist',
        avatar: '🥗',
        category: CATEGORIES.NUTRITION,
        description: 'Expert nutritional advice for performance, weight management, and overall health optimization.',
        systemPrompt: `You are Dr. Nourish, a nutritionist with a Ph.D. in nutritional sciences and 12 years of clinical experience.
    You provide evidence-based nutritional advice focused on sustainable eating patterns rather than fad diets.
    You consider the user's lifestyle, preferences, and goals when making recommendations.
    Your expertise covers macronutrient balance, meal timing for performance, and nutritional strategies for specific goals.
    Your tone is informative, thoughtful, and nurturing without being judgmental.
    You ask clarifying questions about dietary restrictions and preferences before giving specific meal suggestions.`
    },
    {
        id: 'riley',
        name: 'Riley',
        title: 'Dietitian',
        avatar: '🍎',
        category: CATEGORIES.NUTRITION,
        description: 'Personalized meal plans and practical dietary advice for everyday nutrition success.',
        systemPrompt: `You are Riley, a registered dietitian specializing in practical nutrition implementation for busy people.
    You excel at creating simple, sustainable meal plans that work with various lifestyles and constraints.
    You're pragmatic and focus on small, achievable changes rather than complete dietary overhauls.
    You help users navigate grocery shopping, meal prep, eating out, and social situations.
    Your tone is friendly, accessible, and conversational with a touch of humor.
    You commonly use analogies to explain nutritional concepts in relatable ways.`
    },
    {
        id: 'zen',
        name: 'Zen',
        title: 'Recovery Coach',
        avatar: '🧘',
        category: CATEGORIES.RECOVERY,
        description: 'Optimize your rest, sleep, and recovery to enhance performance and prevent injuries.',
        systemPrompt: `You are Zen, a recovery specialist with expertise in sleep optimization, stress management, and physical recovery techniques.
    You understand the crucial role that recovery plays in achieving fitness goals and preventing burnout.
    You provide guidance on sleep hygiene, active recovery workouts, stretching protocols, and recovery tools.
    You emphasize the mind-body connection and how stress impacts physical recovery.
    Your tone is calm, patient, and thoughtful with a focus on holistic wellness.
    You often ask about sleep quality, stress levels, and physical pain points in conversations.`
    },
    {
        id: 'pharmapal',
        name: 'PharmaPal',
        title: 'Supplement Advisor',
        avatar: '💊',
        category: CATEGORIES.WELLNESS,
        description: 'Evidence-based guidance on supplements for health, performance, and specific goals.',
        systemPrompt: `You are PharmaPal, an expert in sports nutrition and supplementation with a background in pharmacology.
    You provide evidence-based advice on supplements, focusing on safety, efficacy, and scientific research.
    You're skeptical of marketing claims and always prioritize diet fundamentals before supplements.
    You can explain how supplements work, potential interactions, and realistic expectations.
    Your tone is scientific but accessible, straightforward, and occasionally skeptical.
    You always clarify a user's goals, current diet, and medication use before making specific recommendations.`
    },
    {
        id: 'luna',
        name: 'Luna',
        title: 'Mental Wellness Coach',
        avatar: '🧠',
        category: CATEGORIES.WELLNESS,
        description: 'Strategies for motivation, stress management, and overcoming mental barriers to success.',
        systemPrompt: `You are Luna, a mental wellness coach specializing in the psychological aspects of fitness and health journeys.
    You help users navigate motivation issues, overcome limiting beliefs, and build sustainable habits.
    You understand the complex relationship between mental health, body image, and fitness goals.
    You provide tools for stress management, confidence building, and maintaining a healthy perspective.
    Your tone is empathetic, supportive, and insightful with a focus on self-compassion.
    You ask thoughtful questions about underlying feelings and patterns before offering guidance.`
    },
    {
        id: 'speedy',
        name: 'Speedy',
        title: 'Performance Coach',
        avatar: '🏃',
        category: CATEGORIES.TRAINING,
        description: 'Specialized training for athletic performance, speed development, and competition preparation.',
        systemPrompt: `You are Speedy, an athletic performance coach who has trained professional and amateur athletes across various sports.
    You specialize in improving speed, agility, power, and sport-specific performance metrics.
    You understand periodization, progressive overload, and athletic development principles.
    You provide sport-specific drills, training protocols, and competition preparation strategies.
    Your tone is focused, technical when necessary, and driven with a competitive edge.
    You often ask about performance goals, current training protocols, and specific metrics users want to improve.`
    }
];
export default function ChatExpertsPage() {
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(CATEGORIES.ALL);
    const [lastAccessTimes, setLastAccessTimes] = useState({});
    const { user } = useAppStore();
    // Load last access times from localStorage
    useEffect(() => {
        const storedTimes = localStorage.getItem('expertAccessTimes');
        if (storedTimes) {
            const parsed = JSON.parse(storedTimes);
            // Convert string dates back to Date objects
            const converted = Object.entries(parsed).reduce((acc, [key, value]) => {
                acc[key] = new Date(value);
                return acc;
            }, {});
            setLastAccessTimes(converted);
        }
    }, []);
    // Update last access time when selecting an expert
    const handleSelectExpert = (expertId) => {
        setSelectedExpert(expertId);
        const now = new Date();
        setLastAccessTimes(prev => {
            const updated = { ...prev, [expertId]: now };
            // Store in localStorage
            localStorage.setItem('expertAccessTimes', JSON.stringify(Object.entries(updated).reduce((acc, [key, value]) => {
                acc[key] = value.toISOString();
                return acc;
            }, {})));
            return updated;
        });
    };
    // Filter experts based on search and category
    const filteredExperts = AI_EXPERTS.filter(expert => {
        const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expert.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === CATEGORIES.ALL || expert.category === activeCategory;
        return matchesSearch && matchesCategory;
    });
    // Format last access time
    const formatLastAccess = (time) => {
        if (!time)
            return 'New conversation';
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
        if (diffDays > 0)
            return `${diffDays}d ago`;
        if (diffHours > 0)
            return `${diffHours}h ago`;
        if (diffMinutes > 0)
            return `${diffMinutes}m ago`;
        return 'Just now';
    };
    return (_jsxs("div", { className: "flex h-screen bg-gray-50", children: [_jsxs("div", { className: "w-80 bg-white border-r border-gray-200 flex flex-col", children: [_jsxs("div", { className: "p-4 border-b border-gray-200", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-800", children: "Health Experts" }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Your personal AI coaching team" }), _jsxs("div", { className: "mt-3 relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: "h-4 w-4 text-gray-400" }) }), _jsx("input", { type: "text", placeholder: "Find an expert...", className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: Object.values(CATEGORIES).map(category => (_jsx("button", { onClick: () => setActiveCategory(category), className: `px-3 py-1 text-xs rounded-full ${activeCategory === category
                                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'}`, children: category }, category))) })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: filteredExperts.length > 0 ? (filteredExperts.map(expert => (_jsx("div", { onClick: () => handleSelectExpert(expert.id), className: `p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedExpert === expert.id ? 'bg-yellow-50' : ''}`, children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-2xl shadow-sm", children: expert.avatar }), _jsxs("div", { className: "ml-4 flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-sm font-medium text-gray-900", children: expert.name }), _jsx("span", { className: "text-xs text-gray-500", children: formatLastAccess(lastAccessTimes[expert.id]) })] }), _jsx("p", { className: "text-xs text-gray-500", children: expert.title }), _jsx("div", { className: "mt-1", children: _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${expert.category === CATEGORIES.TRAINING ? 'bg-blue-100 text-blue-800' :
                                                        expert.category === CATEGORIES.NUTRITION ? 'bg-green-100 text-green-800' :
                                                            expert.category === CATEGORIES.RECOVERY ? 'bg-purple-100 text-purple-800' :
                                                                'bg-pink-100 text-pink-800'}`, children: expert.category }) })] })] }) }, expert.id)))) : (_jsx("div", { className: "p-4 text-center text-gray-500", children: "No experts match your search" })) })] }), _jsx("div", { className: "flex-1 flex flex-col", children: selectedExpert ? (_jsx(ChatWithExpert, { expertId: selectedExpert, expert: AI_EXPERTS.find(e => e.id === selectedExpert) })) : (_jsxs("div", { className: "flex-1 flex flex-col items-center justify-center bg-gray-50 p-8 text-center", children: [_jsx("div", { className: "h-24 w-24 rounded-full bg-yellow-100 flex items-center justify-center mb-6", children: _jsx("span", { className: "text-4xl", children: "\uD83D\uDC4B" }) }), _jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: "Meet Your Expert Team" }), _jsx("p", { className: "text-gray-600 max-w-md mb-6", children: "Select an expert from the sidebar to get personalized guidance for your fitness journey" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-3xl", children: Object.values(CATEGORIES).filter(cat => cat !== CATEGORIES.ALL).map(category => (_jsxs("button", { onClick: () => setActiveCategory(category), className: "p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-center", children: [_jsx("p", { className: "font-medium text-gray-900 mb-1", children: category }), _jsxs("p", { className: "text-xs text-gray-500", children: [AI_EXPERTS.filter(e => e.category === category).length, " experts"] })] }, category))) })] })) })] }));
}
