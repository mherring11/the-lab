import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile, Info, X, Image, FileText } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
const ChatWithExpert = ({ expertId, expert }) => {
    // State for messages, input value, etc.
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    // Group messages by date
    const groupedMessages = {};
    messages.forEach(message => {
        const date = new Date(message.timestamp).toLocaleDateString();
        if (!groupedMessages[date]) {
            groupedMessages[date] = [];
        }
        groupedMessages[date].push(message);
    });
    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);
    // Generate welcome message when expert changes
    useEffect(() => {
        // Clear previous messages when switching experts
        setMessages([]);
        setIsTyping(true);
        // Simulate AI typing the welcome message
        setTimeout(() => {
            const welcomeMessages = {
                'coach-mike': "Hi there! I'm Coach Mike. Ready to create a personalized workout program that aligns with your goals? Let me know your fitness level, available equipment, and what you're looking to achieve!",
                'dr-nourish': "Welcome! I'm Dr. Nourish. Tell me about your nutritional goals and dietary preferences, and I'll help you create a balanced meal plan to support your fitness journey.",
                'riley': "Hello! I'm Riley. I specialize in nutrition for specific health conditions. What dietary challenges are you facing that I can help you with?",
                'zen': "Welcome to your recovery journey. I'm Zen. How can I help you optimize your rest and recovery to complement your training?",
                'pharmapal': "Hi there! I'm PharmaPal. I can provide evidence-based information about supplements. What specific goals are you looking to support with supplementation?",
                'luna': "Hello! I'm Luna, your mental wellness coach. What aspects of your fitness mindset would you like to work on today?",
                'speedy': "Ready to boost your athletic performance? I'm Speedy. Tell me about your sport and goals, and we'll develop a plan to enhance your speed, power, and agility."
            };
            const welcomeMessage = {
                id: `welcome-${Date.now()}`,
                content: welcomeMessages[expertId] || `Hello! I'm ${expert.name}. How can I assist you with your ${expert.category} goals today?`,
                sender: 'expert',
                timestamp: new Date()
            };
            setMessages([welcomeMessage]);
            setIsTyping(false);
        }, 1500);
    }, [expertId, expert]);
    // Handle sending messages
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() && attachments.length === 0)
            return;
        // Create user message
        const userMessage = {
            id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            content: newMessage,
            sender: 'user',
            timestamp: new Date()
        };
        // Handle attachments if any
        if (attachments.length > 0) {
            userMessage.attachments = attachments.map(file => ({
                url: URL.createObjectURL(file),
                type: file.type,
                name: file.name
            }));
        }
        // Add message to state
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
        setAttachments([]);
        setShowEmojiPicker(false);
        // Simulate AI typing
        setIsTyping(true);
        // Generate a response based on the expert's personality
        setTimeout(() => {
            const expertMessage = {
                id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                content: generateAIResponse(newMessage, expert),
                sender: 'expert',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, expertMessage]);
            setIsTyping(false);
        }, 2000 + Math.random() * 2000); // Random delay between 2-4 seconds
    };
    // Generate an AI response
    const generateAIResponse = (message, expert) => {
        // This is a placeholder. In a real app, you'd call your AI service here.
        const genericResponses = [
            "That's a great question. Based on your goals, I'd suggest...",
            "I understand what you're looking for. Here's my recommendation...",
            "Let me help you with that. From my expertise in {{category}}...",
            "Thanks for sharing that information. Here's what I think would work best for you...",
            "I appreciate your question. Drawing from my background in {{category}}..."
        ];
        // Select a random response and customize it
        let response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
        response = response.replace('{{category}}', expert.category);
        return response + " [This is a simulated response. In the actual app, this would be generated by an AI model using the expert's system prompt]";
    };
    // Handle file uploads
    const handleFileUpload = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setAttachments(prev => [...prev, ...newFiles]);
        }
    };
    // Remove an attachment
    const removeAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };
    // Toggle message bookmark status
    const toggleBookmark = (messageId) => {
        setMessages(prev => prev.map(message => message.id === messageId
            ? { ...message, isBookmarked: !message.isBookmarked }
            : message));
    };
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex items-center p-4 border-b border-gray-200 bg-white", children: [_jsx("img", { src: expert.avatar, alt: expert.name, className: "h-10 w-10 rounded-full object-cover", onError: (e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=F59E0B&color=fff`;
                        } }), _jsxs("div", { className: "ml-3", children: [_jsx("h3", { className: "text-sm font-medium", children: expert.name }), _jsx("p", { className: "text-xs text-gray-500", children: expert.title })] }), _jsx("button", { type: "button", onClick: () => setShowInfo(!showInfo), className: "ml-auto p-1 rounded-full hover:bg-gray-100", children: _jsx(Info, { className: "h-5 w-5 text-gray-400" }) })] }), showInfo && (_jsxs("div", { className: "p-4 bg-gray-50 border-b border-gray-200", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsxs("h4", { className: "font-medium", children: ["About ", expert.name] }), _jsx("button", { onClick: () => setShowInfo(false), className: "p-1 rounded-full hover:bg-gray-200", children: _jsx(X, { className: "h-4 w-4 text-gray-500" }) })] }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: expert.description }), _jsx("div", { className: "flex items-center", children: _jsx("span", { className: "text-xs py-1 px-2 bg-gray-200 text-gray-700 rounded-full", children: expert.category.charAt(0).toUpperCase() + expert.category.slice(1) }) })] })), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-6", children: [Object.entries(groupedMessages).map(([date, dateMessages]) => (_jsxs("div", { children: [_jsxs("div", { className: "relative flex items-center my-4", children: [_jsx("div", { className: "flex-grow border-t border-gray-200" }), _jsx("span", { className: "flex-shrink-0 mx-4 text-xs text-gray-500", children: date }), _jsx("div", { className: "flex-grow border-t border-gray-200" })] }), _jsx("div", { className: "space-y-4", children: dateMessages.map((message) => {
                                    const isUserMessage = message.sender === 'user';
                                    return (_jsxs("div", { className: `flex ${isUserMessage ? 'justify-end' : 'justify-start'}`, children: [!isUserMessage && (_jsx("div", { className: "flex-shrink-0 mr-3", children: _jsx("img", { src: expert.avatar, alt: expert.name, className: "h-8 w-8 rounded-full object-cover", onError: (e) => {
                                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=F59E0B&color=fff`;
                                                    } }) })), _jsxs("div", { className: `flex max-w-[75%] ${isUserMessage ? 'flex-row-reverse' : 'flex-row'}`, children: [_jsxs("div", { className: `px-4 py-2 rounded-2xl mb-1 ${isUserMessage
                                                            ? 'bg-yellow-500 text-white rounded-tr-none'
                                                            : 'bg-gray-100 text-gray-800 rounded-tl-none'}`, children: [_jsx("p", { className: "whitespace-pre-wrap", children: message.content }), message.attachments && message.attachments.length > 0 && (_jsx("div", { className: "mt-2 space-y-2" })), _jsx("div", { className: "flex items-center justify-end mt-1 space-x-2", children: _jsx("span", { className: "text-xs opacity-70", children: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }) })] }), isUserMessage && (_jsx("div", { className: "flex-shrink-0 ml-3", children: _jsx("div", { className: "h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center", children: _jsx("span", { className: "text-xs font-medium text-gray-600", children: "You" }) }) }))] })] }, message.id));
                                }) })] }, date))), isTyping && (_jsxs("div", { className: "flex justify-start", children: [_jsx("div", { className: "flex-shrink-0 mr-3", children: _jsx("img", { src: expert.avatar, alt: expert.name, className: "h-8 w-8 rounded-full object-cover", onError: (e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=F59E0B&color=fff`;
                                    } }) }), _jsx("div", { className: "px-4 py-2 bg-gray-100 text-gray-500 rounded-2xl rounded-bl-sm", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-gray-300 rounded-full animate-bounce", style: { animationDelay: '0ms' } }), _jsx("div", { className: "w-2 h-2 bg-gray-300 rounded-full animate-bounce", style: { animationDelay: '300ms' } }), _jsx("div", { className: "w-2 h-2 bg-gray-300 rounded-full animate-bounce", style: { animationDelay: '600ms' } })] }) })] })), _jsx("div", { ref: messagesEndRef })] }), attachments.length > 0 && (_jsx("div", { className: "px-4 py-2", children: _jsx("div", { className: "flex flex-wrap gap-2", children: attachments.map((file, index) => (_jsxs("div", { className: "flex items-center bg-gray-100 rounded-lg px-3 py-1", children: [file.type.startsWith('image/') ? (_jsx(Image, { className: "h-4 w-4 mr-2 text-gray-500" })) : (_jsx(FileText, { className: "h-4 w-4 mr-2 text-gray-500" })), _jsx("span", { className: "text-xs text-gray-700 truncate max-w-[150px]", children: file.name }), _jsx("button", { type: "button", onClick: () => removeAttachment(index), className: "ml-2 text-gray-500 hover:text-red-500", children: _jsx(X, { className: "h-4 w-4" }) })] }, index))) }) })), _jsxs("form", { className: "flex items-center px-4 py-3 border-t border-gray-200 bg-white", onSubmit: handleSendMessage, children: [_jsx("button", { type: "button", className: "p-2 rounded-full text-gray-400 hover:text-gray-600", onClick: () => setShowEmojiPicker(prev => !prev), children: _jsx(Smile, { className: "h-5 w-5" }) }), showEmojiPicker && (_jsx("div", { className: "absolute bottom-16 left-4", children: _jsx(EmojiPicker, { onEmojiClick: (emojiData) => {
                                setNewMessage(prev => prev + emojiData.emoji);
                                setShowEmojiPicker(false);
                            } }) })), _jsx("input", { type: "text", className: "flex-1 mx-3 px-4 py-2 border rounded-full text-sm text-gray-900", placeholder: `Message ${expert.name}...`, value: newMessage, onChange: (e) => setNewMessage(e.target.value) }), _jsx("input", { type: "file", ref: fileInputRef, className: "hidden", onChange: handleFileUpload, multiple: true }), _jsx("button", { type: "button", className: "p-2 rounded-full text-gray-400 hover:text-gray-600", onClick: () => fileInputRef.current?.click(), children: _jsx(Paperclip, { className: "h-5 w-5" }) }), _jsx("button", { type: "submit", className: "p-2 ml-1 rounded-full bg-yellow-500 text-white hover:bg-yellow-600", children: _jsx(Send, { className: "h-5 w-5" }) })] })] }));
};
export default ChatWithExpert;
