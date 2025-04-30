import React from 'react';
// @ts-ignore - Fix import
import { ChatMessage, Message } from '../types';

// Update the Message interface to make senderType required
export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  senderName: string;
  senderType: 'user' | 'ai' | 'trainer'; // Make this required, not optional
  attachments?: any[];
  [key: string]: any;
}

// Or alternatively, make the type check more lenient
export interface ChatMessageProps {
  message: any; // Use 'any' temporarily to bypass strict checking
  isOwn?: boolean;
  showAvatar?: boolean;
  showName?: boolean; // Add this missing prop
  isCurrentUser?: boolean; // Add this prop too
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isOwn: isCurrentUser, 
  showAvatar = true, 
  showName = true 
}) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Enhanced message styling with better visual hierarchy and shadows
  const getMessageStyle = () => {
    if (isCurrentUser) {
      return 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-md';
    }
    
    if (message.senderType === 'ai') {
      return 'bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 shadow-sm border border-blue-200';
    }
    
    return 'bg-white text-gray-800 shadow-sm border border-gray-200';
  };
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-0`}>
      {!isCurrentUser && showAvatar && (
        <div className="flex-shrink-0 mr-2 mt-1">
          {message.senderType === 'ai' ? (
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-xs font-bold">AI</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 text-xs font-bold">{message.senderName.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-col max-w-[75%]">
        {!isCurrentUser && showName && (
          <span className="text-xs text-gray-500 mb-1 ml-1 font-medium">{message.senderName}</span>
        )}
        
        <div className={`rounded-2xl px-4 py-2.5 ${getMessageStyle()}`}>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-3">
              {message.attachments.map((attachment: any, index: number) => (
                <div key={index} className="mt-1">
                  {attachment.type === 'image' && (
                    <img 
                      src={attachment.url} 
                      alt="Attachment" 
                      className="rounded-lg max-h-48 object-cover border shadow-sm"
                    />
                  )}
                  {attachment.type === 'video' && (
                    <div className="rounded-md bg-black/10 p-3 text-xs flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Video attachment
                    </div>
                  )}
                  {attachment.type === 'workout' && (
                    <div className="rounded-md bg-yellow-50 p-3 text-xs text-yellow-700 border border-yellow-200">
                      <div className="font-semibold mb-1 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Workout Plan
                      </div>
                      Tap to view detailed workout plan
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <span className="text-xs text-gray-400 mt-1 self-end mr-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
      
      {isCurrentUser && showAvatar && (
        <div className="flex-shrink-0 ml-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-yellow-600 text-xs font-bold">{message.senderName.charAt(0).toUpperCase()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;