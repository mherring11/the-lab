export interface User {
    id: string;
    email: string; // Keep required fields required
    name?: string; // Make non-essential fields optional
    avatar?: string;
    role?: string;
    hasActiveSubscription?: boolean;
    trialEndDate?: string; // Add this for the PaymentRequired component
    // New fields:
    fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
    goals?: string[];
    sportsFocus?: string;
    // Add any other fields you need
}

export interface Participant {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    type: 'user' | 'ai' | 'trainer';
}

export interface Attachment {
    name: string;
    type: string;
    size: number;
    url: string;
}

export interface Message {
    id: string;
    senderId: string;
    senderName: string; 
    senderType: 'user' | 'ai' | 'trainer';
    content: string;
    timestamp: number;
    attachments?: Attachment[];
    readBy: string[];
}

export interface ChatThread {
    id: string;
    participants: Participant[];
    messages: Message[];
    isGroup: boolean;
    name: string; // This will store the group name
}

export interface CommunityMember {
    id: string;
    name: string;
    avatar: string;
    role: string;
    joinDate: string;
    email?: string; // Add this
    bio?: string; // Make optional
    stats?: {
        workoutsCompleted: number;
        achievements: string[];
        favoriteWorkouts: string[];
    }; // Make optional
}