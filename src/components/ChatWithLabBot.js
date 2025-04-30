import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Brain, User, Users, X, File, Search, MoreVertical, MessageSquare, ChevronDown } from 'lucide-react';
import { useAppStore } from '../store';
import { sendMessageToClaude } from '../services/claudeApi';
import ChatMessage from './ChatMessage';
const ChatWithLabBot = ({ threadId }) => {
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const chatThreads = useAppStore(state => state.chatThreads);
    const sendMessage = useAppStore(state => state.sendMessage);
    const user = useAppStore(state => state.user);
    const currentThread = chatThreads.find(thread => thread.id === threadId);
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [currentThread?.messages]);
    useEffect(() => {
        // Clean up preview URL when component unmounts
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if ((!message.trim() && !selectedFile) || !user || !currentThread)
            return;
        const attachments = selectedFile && previewUrl ? [
            {
                name: selectedFile.name,
                type: selectedFile.type,
                size: selectedFile.size,
                url: previewUrl
            }
        ] : undefined;
        sendMessage(threadId, {
            id: `msg-${Date.now()}`,
            senderId: user.id,
            senderName: user.name || 'User',
            senderType: 'user',
            content: message,
            attachments,
            readBy: [user.id]
        });
        setTimeout(() => scrollToBottom(), 100);
        const userMessage = message; // Store message before clearing
        setMessage('');
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        const otherParticipant = currentThread.participants.find(p => p.id !== user.id);
        if (otherParticipant?.type === 'ai') {
            setIsTyping(true);
            try {
                const previousMessages = currentThread.messages
                    .slice(-5)
                    .map(msg => ({
                    role: msg.senderType === 'ai' ? 'assistant' : 'user',
                    content: String(msg.content)
                }));
                const context = previousMessages.slice(0, -1);
                const aiResponse = await sendMessageToClaude(String(userMessage), context);
                sendMessage(threadId, {
                    id: `msg-${Date.now()}`,
                    senderId: otherParticipant.id,
                    senderName: otherParticipant.name,
                    senderType: 'ai',
                    content: aiResponse,
                    readBy: [] // Empty array as AI messages aren't "read"
                });
            }
            catch (error) {
                console.error('Error getting response from Claude:', error);
                sendMessage(threadId, {
                    id: `msg-${Date.now()}`,
                    senderId: otherParticipant.id,
                    senderName: otherParticipant.name,
                    senderType: 'ai',
                    content: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
                    readBy: []
                });
            }
            finally {
                setIsTyping(false);
            }
        }
        else if (otherParticipant?.type === 'trainer') {
            setTimeout(() => {
                const trainerResponses = [
                    "Great question! Let's focus on that during our next session.",
                    "I'm glad to hear you're making progress. Keep up the good work!",
                    "I'll adjust your program based on this feedback. Thanks for letting me know.",
                    "That's a common challenge. Try focusing on your breathing and maintaining proper form.",
                    "I've sent you a modified workout plan that should help with that issue."
                ];
                const randomResponse = trainerResponses[Math.floor(Math.random() * trainerResponses.length)];
                sendMessage(threadId, {
                    id: `msg-${Date.now()}`,
                    senderId: otherParticipant.id,
                    senderName: otherParticipant.name,
                    senderType: 'trainer',
                    content: randomResponse,
                    readBy: []
                });
            }, 1500);
        }
        else if (currentThread.isGroup) {
            setTimeout(() => {
                const otherMembers = currentThread.participants.filter(p => p.id !== user.id);
                if (otherMembers.length > 0) {
                    const randomMember = otherMembers[Math.floor(Math.random() * otherMembers.length)];
                    const groupResponses = [
                        "Thanks for sharing that with the group!",
                        "I had a similar experience last week.",
                        "Great point! I'll try that in my next workout.",
                        "Is anyone else joining the challenge this weekend?",
                        "That's impressive progress! What's your secret?"
                    ];
                    const randomResponse = groupResponses[Math.floor(Math.random() * groupResponses.length)];
                    sendMessage(threadId, {
                        id: `msg-${Date.now()}`,
                        senderId: randomMember.id,
                        senderName: randomMember.name,
                        senderType: randomMember.type || 'user',
                        content: randomResponse,
                        readBy: []
                    });
                }
            }, 2000);
        }
    };
    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            if (file.type.startsWith('image/')) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            }
            else {
                setPreviewUrl(null);
            }
        }
    };
    const handleAttachmentClick = () => {
        fileInputRef.current?.click();
    };
    const clearAttachment = () => {
        setSelectedFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    if (!currentThread) {
        return _jsx("div", { children: "Thread not found" });
    }
    const renderChatHeader = () => {
        return (_jsxs("div", { className: "bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm", children: [_jsxs("div", { className: "flex items-center", children: [currentThread.isGroup ? (_jsx("div", { className: "bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-full mr-3 shadow-sm border border-gray-200", children: _jsx(Users, { className: "h-5 w-5 text-gray-600" }) })) : (_jsx(_Fragment, { children: currentThread.participants.find(p => p.id !== user?.id)?.type === 'ai' ? (_jsx("div", { className: "bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-full mr-3 shadow-sm border border-blue-200", children: _jsx(Brain, { className: "h-5 w-5 text-blue-600" }) })) : (_jsx("div", { className: "bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-full mr-3 shadow-sm border border-yellow-200", children: _jsx(User, { className: "h-5 w-5 text-yellow-600" }) })) })), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: currentThread.isGroup
                                        ? currentThread.name
                                        : currentThread.participants.find(p => p.id !== user?.id)?.name || 'Chat' }), _jsx("p", { className: "text-xs text-gray-500 flex items-center", children: currentThread.isGroup ? (_jsxs(_Fragment, { children: [currentThread.participants.length, " members"] })) : currentThread.participants.find(p => p.id !== user?.id)?.type === 'ai' ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "flex h-2 w-2 rounded-full bg-green-400 mr-1.5" }), "AI-powered fitness assistant"] })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: "flex h-2 w-2 rounded-full bg-green-400 mr-1.5" }), currentThread.participants.find(p => p.id !== user?.id)?.type === 'trainer'
                                                ? 'Personal Trainer'
                                                : 'Online'] })) })] })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("button", { className: "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors", children: _jsx(Search, { className: "h-5 w-5" }) }), _jsx("button", { className: "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors", children: _jsx(MoreVertical, { className: "h-5 w-5" }) })] })] }));
    };
    return (_jsxs("div", { className: "flex flex-col h-full", children: [renderChatHeader(), _jsxs("div", { className: "flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white px-4 py-4 relative", children: [currentThread.messages.length === 0 ? (_jsxs("div", { className: "h-full flex flex-col items-center justify-center text-center px-6", children: [_jsx("div", { className: "bg-gray-100 rounded-full p-5 mb-4", children: currentThread.participants.find(p => p.id !== user?.id)?.type === 'ai' ? (_jsx(Brain, { className: "h-8 w-8 text-blue-500" })) : (_jsx(MessageSquare, { className: "h-8 w-8 text-yellow-500" })) }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-1", children: "Start a conversation" }), _jsx("p", { className: "text-gray-500 text-sm max-w-sm", children: currentThread.participants.find(p => p.id !== user?.id)?.type === 'ai'
                                    ? "Ask the Lab Assistant about workouts, nutrition advice, or any fitness questions you have."
                                    : "Send a message to start your conversation." })] })) : (_jsxs(_Fragment, { children: [currentThread.messages.map((msg, index) => (_jsx("div", { className: `mb-4 ${index === 0 ? 'mt-2' : ''}`, children: _jsx(ChatMessage, { message: msg, isCurrentUser: user?.id === msg.senderId, showAvatar: index === 0 ||
                                        currentThread.messages[index - 1].senderId !== msg.senderId, showName: index === 0 ||
                                        currentThread.messages[index - 1].senderId !== msg.senderId }) }, index))), isTyping && (_jsx("div", { className: "flex mb-4 justify-start", children: _jsx("div", { className: "bg-gray-100 rounded-lg px-4 py-2 max-w-[75%]", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0ms' } }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '150ms' } }), _jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '300ms' } })] }) }) }))] })), _jsx("div", { ref: messagesEndRef, className: "h-4" }), currentThread.messages.length > 0 && (_jsx("button", { onClick: scrollToBottom, className: "absolute bottom-4 right-4 bg-white shadow-md rounded-full p-2 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 transition-colors", "aria-label": "Scroll to bottom", children: _jsx(ChevronDown, { className: "h-5 w-5" }) }))] }), _jsxs("div", { className: "bg-white border-t border-gray-200 p-4", children: [selectedFile && (_jsx("div", { className: "mb-3 relative", children: previewUrl && selectedFile.type.startsWith('image/') ? (_jsxs("div", { className: "relative inline-block group", children: [_jsx("img", { src: previewUrl, alt: "Preview", className: "h-24 rounded-lg object-cover border border-gray-200 shadow-sm" }), _jsx("button", { onClick: clearAttachment, className: "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors", "aria-label": "Remove attachment", children: _jsx(X, { size: 14 }) })] })) : (_jsxs("div", { className: "flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200", children: [_jsx("div", { className: "bg-blue-100 p-2 rounded-md mr-3", children: _jsx(File, { size: 16, className: "text-blue-600" }) }), _jsx("span", { className: "text-sm text-gray-700 truncate flex-1", children: selectedFile.name }), _jsx("button", { onClick: clearAttachment, className: "ml-2 text-gray-400 hover:text-red-500 transition-colors", "aria-label": "Remove file", children: _jsx(X, { size: 18 }) })] })) })), _jsxs("form", { onSubmit: handleSendMessage, className: "flex items-center bg-gray-50 rounded-full px-3 border border-gray-200 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400 transition-all", children: [_jsx("button", { type: "button", onClick: handleAttachmentClick, className: "p-2 text-gray-400 hover:text-yellow-600 transition-colors", "aria-label": "Attach file", children: _jsx(Paperclip, { size: 20 }) }), _jsx("input", { type: "file", ref: fileInputRef, onChange: handleFileSelect, className: "hidden", accept: "image/*,application/pdf" }), _jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), placeholder: `Message ${currentThread.isGroup ? currentThread.name : currentThread.participants.find(p => p.id !== user?.id)?.name}`, className: "flex-1 border-0 bg-transparent focus:ring-0 text-sm text-gray-800 placeholder-gray-400 py-3 px-2", disabled: isTyping }), _jsx("button", { type: "submit", disabled: (!message.trim() && !selectedFile) || isTyping, className: `p-2 rounded-full ${(message.trim() || selectedFile) && !isTyping
                                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'} transition-colors`, "aria-label": "Send message", children: _jsx(Send, { size: 18, className: isTyping ? "opacity-50" : "" }) })] }), isTyping && (_jsxs("div", { className: "text-xs text-gray-500 mt-2 flex items-center", children: [_jsxs("div", { className: "flex space-x-1 mr-2", children: [_jsx("div", { className: "w-2 h-2 bg-yellow-400 rounded-full animate-bounce", style: { animationDelay: '0ms' } }), _jsx("div", { className: "w-2 h-2 bg-yellow-400 rounded-full animate-bounce", style: { animationDelay: '150ms' } }), _jsx("div", { className: "w-2 h-2 bg-yellow-400 rounded-full animate-bounce", style: { animationDelay: '300ms' } })] }), "Lab Assistant is typing..."] }))] })] }));
};
export default ChatWithLabBot;
