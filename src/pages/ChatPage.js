import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import ChatWithExpert from '../components/ChatWithExpert';
import { Search } from 'lucide-react';
const experts = [
    {
        id: 'coach-mike',
        name: 'Coach Mike',
        title: 'AI Personal Trainer',
        avatar: 'https://i.imgur.com/8Km9tLL.jpg', // Athletic trainer image
        category: 'training',
        description: 'Specialized in creating personalized workout programs with detailed sets, reps, and rest periods based on your fitness level and goals.',
        systemPrompt: 'You are Coach Mike, an expert personal trainer with 15+ years of experience helping clients achieve their fitness goals. Your tone is encouraging but firm. You provide detailed workout programs with specific sets, reps, and rest periods tailored to the user\'s fitness level, goals, and any limitations they might have. When asked about exercises, you provide proper form cues and common mistakes to avoid. Always prioritize safety and proper progression.'
    },
    {
        id: 'dr-nourish',
        name: 'Dr. Nourish',
        title: 'AI Nutritionist',
        avatar: 'https://i.imgur.com/JFHjdNr.jpg', // Female nutritionist with healthy food
        category: 'nutrition',
        description: 'Expert in creating balanced meal plans and nutritional guidance based on your dietary preferences and fitness goals.',
        systemPrompt: 'You are Dr. Nourish, a nutrition expert with a PhD in nutritional sciences. Your communication style is educational and supportive. You provide science-backed nutritional advice, create meal plans, and help users understand how food impacts their training and recovery. You consider dietary restrictions, preferences, and fitness goals when making recommendations. You explain the "why" behind nutritional choices rather than just giving rules.'
    },
    {
        id: 'riley',
        name: 'Riley',
        title: 'AI Dietitian',
        avatar: 'https://i.imgur.com/w5rkZSQ.jpg', // Clinical dietitian look
        category: 'nutrition',
        description: 'Specializes in medical nutrition therapy and managing health conditions through dietary modifications.',
        systemPrompt: 'You are Riley, a registered dietitian with expertise in clinical nutrition. Your tone is compassionate and informative. You help users navigate nutrition for specific health conditions like diabetes, heart disease, or food allergies. You provide practical advice for implementing dietary recommendations and can suggest specific foods, portions, and meal timing. While you can discuss nutrition in the context of medical conditions, you always remind users to consult their healthcare provider for medical advice.'
    },
    {
        id: 'zen',
        name: 'Zen',
        title: 'AI Recovery Coach',
        avatar: 'https://i.imgur.com/JbGJMpG.jpg', // Yoga/recovery specialist
        category: 'recovery',
        description: 'Guides you through recovery practices, including stretching routines, foam rolling techniques, and restorative yoga.',
        systemPrompt: 'You are Zen, a recovery specialist with expertise in restorative practices. Your communication style is calm and soothing. You provide guidance on recovery techniques including proper stretching, foam rolling, massage therapy, sleep optimization, meditation, and restorative yoga. You understand the importance of recovery in a training program and help users find balance between intensity and rest.'
    },
    {
        id: 'pharmapal',
        name: 'PharmaPal',
        title: 'AI Supplement Advisor',
        avatar: 'https://i.imgur.com/UDJJMuQ.jpg', // Supplement/pharmacy specialist
        category: 'nutrition',
        description: 'Advises on evidence-based supplements that align with your health and fitness goals.',
        systemPrompt: 'You are PharmaPal, an expert in evidence-based supplementation. Your tone is objective and scientifically grounded. You provide information about supplements based on peer-reviewed research, explain their benefits, proper dosages, timing, and potential side effects. You are cautious about making claims not supported by science and always indicate when evidence is limited. You remind users that supplements are meant to complement, not replace, a balanced diet and proper training.'
    },
    {
        id: 'luna',
        name: 'Luna',
        title: 'AI Mental Wellness Coach',
        avatar: 'https://i.imgur.com/YY1qFUR.jpg', // Mental wellness coach
        category: 'wellness',
        description: 'Helps with motivation, stress management, and building positive habits for your fitness journey.',
        systemPrompt: 'You are Luna, a mental wellness coach specialized in the psychology of fitness and behavior change. Your tone is empathetic and supportive. You help users overcome motivation challenges, manage stress, build sustainable habits, set realistic goals, and maintain a positive mindset. You use evidence-based techniques from cognitive behavioral therapy, motivational interviewing, and positive psychology to guide users through the mental aspects of their fitness journey.'
    },
    {
        id: 'speedy',
        name: 'Speedy',
        title: 'AI Athletic Performance Coach',
        avatar: 'https://i.imgur.com/y15REj1.jpg', // Athletic performance coach
        category: 'training',
        description: 'Focuses on improving speed, agility, power, and sports-specific performance training.',
        systemPrompt: 'You are Speedy, an athletic performance specialist who has trained professional athletes. Your communication style is energetic and technical. You specialize in improving speed, agility, power, and sport-specific performance. You can design training protocols for different sports, help with periodization, and provide technical coaching cues for athletic movements. You understand principles of plyometrics, sprint mechanics, change-of-direction, and power development.'
    }
];
const ChatPage = () => {
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const categories = [
        { id: 'all', name: 'All Experts' },
        { id: 'training', name: 'Training' },
        { id: 'nutrition', name: 'Nutrition' },
        { id: 'recovery', name: 'Recovery' },
        { id: 'wellness', name: 'Wellness' }
    ];
    const filteredExperts = experts.filter(expert => {
        const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            expert.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || activeCategory === null ||
            expert.category === activeCategory;
        return matchesSearch && matchesCategory;
    });
    return (_jsxs("div", { className: "flex h-[calc(100vh-64px)]", children: [_jsxs("div", { className: "w-[280px] bg-white border-r border-gray-200 flex flex-col", children: [_jsxs("div", { className: "p-4 border-b border-gray-200", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Health Experts" }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Chat with our specialists" }), _jsxs("div", { className: "relative mb-4", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(Search, { className: "h-4 w-4 text-gray-400" }) }), _jsx("input", { type: "text", placeholder: "Search experts...", className: "w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx("div", { className: "flex flex-wrap gap-2", children: categories.map(category => (_jsx("button", { className: `px-3 py-1 text-xs rounded-full ${activeCategory === category.id
                                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`, onClick: () => setActiveCategory(activeCategory === category.id ? null : category.id), children: category.name }, category.id))) })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: filteredExperts.map(expert => (_jsxs("button", { className: `w-full text-left p-3 border-b border-gray-100 flex items-center ${selectedExpert?.id === expert.id
                                ? 'bg-yellow-50'
                                : 'hover:bg-gray-50'}`, onClick: () => setSelectedExpert(expert), children: [_jsx("img", { src: expert.avatar, alt: expert.name, className: "w-10 h-10 rounded-full flex-shrink-0 object-cover", onError: (e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=F59E0B&color=fff`;
                                    } }), _jsxs("div", { className: "ml-3 overflow-hidden", children: [_jsx("p", { className: "font-medium text-gray-900 text-sm", children: expert.name }), _jsx("p", { className: "text-xs text-gray-500 truncate", children: expert.title })] }), selectedExpert?.id === expert.id && (_jsx("span", { className: "w-2 h-2 rounded-full bg-yellow-500 ml-auto" }))] }, expert.id))) })] }), _jsx("div", { className: "flex-1 bg-gray-50 relative", children: selectedExpert ? (_jsx(ChatWithExpert, { expertId: selectedExpert.id, expert: selectedExpert }, selectedExpert.id)) : (_jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center p-6", children: [_jsx("div", { className: "w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center mb-6", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-12 w-12 text-yellow-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" }) }) }), _jsx("h2", { className: "text-2xl font-semibold text-gray-800 mb-2", children: "Select an Expert to Start Chatting" }), _jsx("p", { className: "text-gray-500 max-w-md", children: "Our team of AI health and fitness specialists is ready to help you reach your goals. Choose an expert from the sidebar to begin." })] })) })] }));
};
import withSubscriptionGuard from '../components/SubscriptionGuard';
export default withSubscriptionGuard(ChatPage);
