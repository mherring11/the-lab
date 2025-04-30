import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  AppState, 
  User, 
  ChatThread, 
  ChatMessage, 
  ChatParticipant,
  Workout,
  CommunityPost,
  CommunityComment,
  CommunityGroup
} from './types/store.types';

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // User state
      user: null,
      setUser: (user: User) => set({ user }),
      
      // Chat functionality
      chatThreads: [],
      createChatThread: (participants: ChatParticipant[], isGroup = false, groupName?: string) => {
        set(state => {
          const newThread: ChatThread = {
            id: Date.now().toString(),
            participants,
            messages: [],
            isGroup,
            name: groupName,
            lastActivity: new Date().toISOString()
          };
          
          return {
            chatThreads: [...state.chatThreads, newThread]
          };
        });
      },
      
      sendMessage: (threadId: string, messageData: Partial<ChatMessage>) => {
        set((state) => ({
          chatThreads: state.chatThreads.map((thread) => {
            if (thread.id === threadId) {
              const newMessage = {
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                ...messageData
              } as ChatMessage;
              
              return {
                ...thread,
                messages: [...thread.messages, newMessage],
                lastActivity: new Date().toISOString()
              };
            }
            return thread;
          })
        }));
      },
      
      deleteChatThread: (threadId: string) => {
        set((state) => ({
          chatThreads: state.chatThreads.filter(thread => thread.id !== threadId)
        }));
      },
      
      updateChatThreadName: (threadId: string, newName: string) => {
        set(state => ({
          chatThreads: state.chatThreads.map(thread =>
            thread.id === threadId
              ? { ...thread, name: newName }
              : thread
          )
        }));
      },
      
      // Workout functionality
      workouts: [],
      addWorkout: (workout: Partial<Workout>) => set((state) => ({
        workouts: [...state.workouts, { id: Date.now().toString(), ...workout } as Workout]
      })),
      
      deleteWorkout: (id: string) => set((state) => ({
        workouts: state.workouts.filter(workout => workout.id !== id)
      })),
      
      // Community functionality
      communityPosts: [],
      communityGroups: [],
      communityMembers: [],
      
      addCommunityPost: (post: Partial<CommunityPost>) => set((state) => ({
        communityPosts: [...state.communityPosts, { id: Date.now().toString(), likes: [], comments: [], ...post } as CommunityPost]
      })),
      
      deleteCommunityPost: (postId: string) => set((state) => ({
        communityPosts: state.communityPosts.filter(post => post.id !== postId)
      })),
      
      updateCommunityPost: (postId: string, updates: Partial<CommunityPost>) => set((state) => ({
        communityPosts: state.communityPosts.map(post =>
          post.id === postId 
            ? { ...post, ...updates }
            : post
        )
      })),
      
      likeCommunityPost: (postId: string, userId: string) => set((state) => ({
        communityPosts: state.communityPosts.map(post =>
          post.id === postId
            ? { ...post, likes: [...post.likes, userId] }
            : post
        )
      })),
      
      unlikeCommunityPost: (postId: string, userId: string) => set((state) => ({
        communityPosts: state.communityPosts.map(post =>
          post.id === postId
            ? { ...post, likes: post.likes.filter(id => id !== userId) }
            : post
        )
      })),
      
      addCommunityComment: (postId: string, comment: Partial<CommunityComment>) => set((state) => ({
        communityPosts: state.communityPosts.map(post => {
          if (post.id === postId) {
            const newComment = {
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
              ...comment
            } as CommunityComment;
            
            return {
              ...post,
              comments: [...post.comments, newComment]
            };
          }
          return post;
        })
      })),
      
      deleteCommunityComment: (postId: string, commentId: string) => set((state) => ({
        communityPosts: state.communityPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.filter(comment => comment.id !== commentId)
            };
          }
          return post;
        })
      })),
      
      joinCommunityGroup: (groupId: string, userId: string) => set((state) => ({
        communityGroups: state.communityGroups.map(group => {
          if (group.id === groupId) {
            return {
              ...group, 
              members: [...group.members, userId]
            };
          }
          return group;
        })
      })),
      
      leaveCommunityGroup: (groupId: string, userId: string) => set((state) => ({
        communityGroups: state.communityGroups.map(group => {
          if (group.id === groupId) {
            return {
              ...group,
              members: group.members.filter(id => id !== userId)
            };
          }
          return group;
        })
      })),
      
      addGroup: (group: Partial<CommunityGroup>) => set((state) => ({
        communityGroups: [
          ...state.communityGroups, 
          { id: Date.now().toString(), members: [], isPrivate: false, ...group } as CommunityGroup
        ]
      })),
      
      // Checkout functionality
      redirectToCheckout: async (planId: string) => {
        console.log(`Redirecting to checkout for plan: ${planId}`);
        // Implement your checkout logic here
      }
    }),
    {
      name: 'app-storage',
      storage: {
        getItem: (key) => {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        }
      }
    }
  )
);