// Store Types

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  hasActiveSubscription: boolean;
  trialEndDate?: string | null;
  avatar?: string | null;
  joinDate?: string;
  lastActive?: string;

  // Additional fields used in the app
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
  goals?: string[];
  sportsFocus?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  senderName: string;
  senderType?: 'user' | 'ai' | 'trainer';
  readBy?: string[];
  attachments?: Array<{
    type: string;
    url: string;
    [key: string]: any;
  }>;
  [key: string]: any; // Allow any other properties
}

// Define Message type for chat components
export interface Message extends ChatMessage {
  // Any additional properties needed for Message
}

export interface ChatParticipant {
  id: string;
  name: string;
  type: 'user' | 'ai' | 'trainer';
  avatar?: string;
}

export interface ChatThread {
  id: string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  isGroup: boolean;
  name?: string;
  lastActivity: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  category: string;
  targetMuscles: string[];
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    rest: number;
    formTips?: string[];
    [key: string]: any;
  }>;
  aiGenerated?: boolean;
  sportsFocus?: string;
  createdAt?: string;
  userId?: string;
  [key: string]: any; // Allow any other properties
}

export interface CommunityComment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  images?: string[];
  image?: string; // Add this for backward compatibility
  timestamp: string;
  likes: string[]; // Array of user IDs
  comments: CommunityComment[];
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: string[]; // Array of user IDs
  avatar?: string;
  isPrivate: boolean;
  image?: string; // Add this property
}

export interface CommunityMember {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  joinDate: string;
  role?: 'admin' | 'member'; // Add this property
}

// The main store state type
export interface AppState {
  user: User | null;
  setUser: (user: User) => void;

  // Add other state properties your app uses
  // These can be filled in later as needed
  [key: string]: any;

  chatThreads: ChatThread[];
  createChatThread: (participants: ChatParticipant[], isGroup?: boolean, groupName?: string) => void;
  sendMessage: (threadId: string, messageData: Partial<ChatMessage>) => void;
  deleteChatThread: (threadId: string) => void;
  updateChatThreadName: (threadId: string, newName: string) => void;

  workouts: Workout[];
  addWorkout: (workout: Partial<Workout>) => void;
  deleteWorkout: (id: string) => void;

  communityPosts: CommunityPost[];
  communityGroups: CommunityGroup[];
  communityMembers: CommunityMember[];
  addCommunityPost: (post: Partial<CommunityPost>) => void;
  deleteCommunityPost: (postId: string) => void;
  updateCommunityPost: (postId: string, updates: Partial<CommunityPost>) => void;
  likeCommunityPost: (postId: string, userId: string) => void;
  unlikeCommunityPost: (postId: string, userId: string) => void;
  addCommunityComment: (postId: string, comment: Partial<CommunityComment>) => void;
  deleteCommunityComment: (postId: string, commentId: string) => void;
  joinCommunityGroup: (groupId: string, userId: string) => void;
  leaveCommunityGroup: (groupId: string, userId: string) => void;
  addGroup: (group: Partial<CommunityGroup>) => void;

  redirectToCheckout: (planId: string) => Promise<void>;
}