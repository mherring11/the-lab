import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Brain, User, Users, X, File, Search, MoreVertical, MessageSquare, ChevronDown } from 'lucide-react';
import { useAppStore } from '../store';
import { sendMessageToClaude } from '../services/claudeApi';
import ChatMessage from './ChatMessage';
import { Message, Attachment } from '../types';

interface ChatWithLabBotProps {
  threadId: string;
}

const ChatWithLabBot: React.FC<ChatWithLabBotProps> = ({ threadId }) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!message.trim() && !selectedFile) || !user || !currentThread) return;
    
    const attachments: Attachment[] | undefined = selectedFile && previewUrl ? [
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
            role: msg.senderType === 'ai' ? 'assistant' as const : 'user' as const,
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
      } catch (error) {
        console.error('Error getting response from Claude:', error);
        
        sendMessage(threadId, {
          id: `msg-${Date.now()}`,
          senderId: otherParticipant.id,
          senderName: otherParticipant.name,
          senderType: 'ai',
          content: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
          readBy: []
        });
      } finally {
        setIsTyping(false);
      }
    } else if (otherParticipant?.type === 'trainer') {
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
    } else if (currentThread.isGroup) {
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
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
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
    return <div>Thread not found</div>;
  }
  
  const renderChatHeader = () => {
    return (
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          {currentThread.isGroup ? (
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-full mr-3 shadow-sm border border-gray-200">
              <Users className="h-5 w-5 text-gray-600" />
            </div>
          ) : (
            <>
              {currentThread.participants.find(p => p.id !== user?.id)?.type === 'ai' ? (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-full mr-3 shadow-sm border border-blue-200">
                  <Brain className="h-5 w-5 text-blue-600" />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-full mr-3 shadow-sm border border-yellow-200">
                  <User className="h-5 w-5 text-yellow-600" />
                </div>
              )}
            </>
          )}
          
          <div>
            <h3 className="font-semibold text-gray-900">
              {currentThread.isGroup 
                ? currentThread.name 
                : currentThread.participants.find(p => p.id !== user?.id)?.name || 'Chat'}
            </h3>
            <p className="text-xs text-gray-500 flex items-center">
              {currentThread.isGroup ? (
                <>{currentThread.participants.length} members</>
              ) : currentThread.participants.find(p => p.id !== user?.id)?.type === 'ai' ? (
                <>
                  <span className="flex h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
                  AI-powered fitness assistant
                </>
              ) : (
                <>
                  <span className="flex h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
                  {currentThread.participants.find(p => p.id !== user?.id)?.type === 'trainer' 
                    ? 'Personal Trainer' 
                    : 'Online'}
                </>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-full">
      {renderChatHeader()}
      
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white px-4 py-4 relative">
        {currentThread.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="bg-gray-100 rounded-full p-5 mb-4">
              {currentThread.participants.find(p => p.id !== user?.id)?.type === 'ai' ? (
                <Brain className="h-8 w-8 text-blue-500" />
              ) : (
                <MessageSquare className="h-8 w-8 text-yellow-500" />
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Start a conversation</h3>
            <p className="text-gray-500 text-sm max-w-sm">
              {currentThread.participants.find(p => p.id !== user?.id)?.type === 'ai'
                ? "Ask the Lab Assistant about workouts, nutrition advice, or any fitness questions you have."
                : "Send a message to start your conversation."}
            </p>
          </div>
        ) : (
          <>
            {currentThread.messages.map((msg, index) => (
              <div key={index} className={`mb-4 ${index === 0 ? 'mt-2' : ''}`}>
                <ChatMessage
                  message={msg}
                  isCurrentUser={user?.id === msg.senderId}
                  showAvatar={index === 0 || 
                    currentThread.messages[index - 1].senderId !== msg.senderId}
                  showName={index === 0 || 
                    currentThread.messages[index - 1].senderId !== msg.senderId}
                />
              </div>
            ))}
            
            {isTyping && (
              <div className="flex mb-4 justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[75%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} className="h-4" />
        
        {currentThread.messages.length > 0 && (
          <button 
            onClick={scrollToBottom}
            className="absolute bottom-4 right-4 bg-white shadow-md rounded-full p-2 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
            aria-label="Scroll to bottom"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <div className="bg-white border-t border-gray-200 p-4">
        {selectedFile && (
          <div className="mb-3 relative">
            {previewUrl && selectedFile.type.startsWith('image/') ? (
              <div className="relative inline-block group">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="h-24 rounded-lg object-cover border border-gray-200 shadow-sm" 
                />
                <button 
                  onClick={clearAttachment}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                  aria-label="Remove attachment"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  <File size={16} className="text-blue-600" />
                </div>
                <span className="text-sm text-gray-700 truncate flex-1">{selectedFile.name}</span>
                <button 
                  onClick={clearAttachment}
                  className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove file"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="flex items-center bg-gray-50 rounded-full px-3 border border-gray-200 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400 transition-all">
          <button
            type="button"
            onClick={handleAttachmentClick}
            className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
            aria-label="Attach file"
          >
            <Paperclip size={20} />
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,application/pdf"
          />
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message ${currentThread.isGroup ? currentThread.name : currentThread.participants.find(p => p.id !== user?.id)?.name}`}
            className="flex-1 border-0 bg-transparent focus:ring-0 text-sm text-gray-800 placeholder-gray-400 py-3 px-2"
            disabled={isTyping}
          />
          
          <button
            type="submit"
            disabled={(!message.trim() && !selectedFile) || isTyping}
            className={`p-2 rounded-full ${
              (message.trim() || selectedFile) && !isTyping
                ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } transition-colors`}
            aria-label="Send message"
          >
            <Send size={18} className={isTyping ? "opacity-50" : ""} />
          </button>
        </form>
        
        {isTyping && (
          <div className="text-xs text-gray-500 mt-2 flex items-center">
            <div className="flex space-x-1 mr-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            Lab Assistant is typing...
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWithLabBot;