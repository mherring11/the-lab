import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useAppStore = create()(persist((set) => ({
    // User state
    user: null,
    setUser: (user) => set({ user }),
    // Chat functionality
    chatThreads: [],
    createChatThread: (participants, isGroup = false, groupName) => {
        set(state => {
            const newThread = {
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
    sendMessage: (threadId, messageData) => {
        set((state) => ({
            chatThreads: state.chatThreads.map((thread) => {
                if (thread.id === threadId) {
                    const newMessage = {
                        id: Date.now().toString(),
                        timestamp: new Date().toISOString(),
                        ...messageData
                    };
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
    deleteChatThread: (threadId) => {
        set((state) => ({
            chatThreads: state.chatThreads.filter(thread => thread.id !== threadId)
        }));
    },
    updateChatThreadName: (threadId, newName) => {
        set(state => ({
            chatThreads: state.chatThreads.map(thread => thread.id === threadId
                ? { ...thread, name: newName }
                : thread)
        }));
    },
    // Workout functionality
    workouts: [],
    addWorkout: (workout) => set((state) => ({
        workouts: [...state.workouts, { id: Date.now().toString(), ...workout }]
    })),
    deleteWorkout: (id) => set((state) => ({
        workouts: state.workouts.filter(workout => workout.id !== id)
    })),
    // Community functionality
    communityPosts: [],
    communityGroups: [],
    communityMembers: [],
    addCommunityPost: (post) => set((state) => ({
        communityPosts: [...state.communityPosts, { id: Date.now().toString(), likes: [], comments: [], ...post }]
    })),
    deleteCommunityPost: (postId) => set((state) => ({
        communityPosts: state.communityPosts.filter(post => post.id !== postId)
    })),
    updateCommunityPost: (postId, updates) => set((state) => ({
        communityPosts: state.communityPosts.map(post => post.id === postId
            ? { ...post, ...updates }
            : post)
    })),
    likeCommunityPost: (postId, userId) => set((state) => ({
        communityPosts: state.communityPosts.map(post => post.id === postId
            ? { ...post, likes: [...post.likes, userId] }
            : post)
    })),
    unlikeCommunityPost: (postId, userId) => set((state) => ({
        communityPosts: state.communityPosts.map(post => post.id === postId
            ? { ...post, likes: post.likes.filter(id => id !== userId) }
            : post)
    })),
    addCommunityComment: (postId, comment) => set((state) => ({
        communityPosts: state.communityPosts.map(post => {
            if (post.id === postId) {
                const newComment = {
                    id: Date.now().toString(),
                    timestamp: new Date().toISOString(),
                    ...comment
                };
                return {
                    ...post,
                    comments: [...post.comments, newComment]
                };
            }
            return post;
        })
    })),
    deleteCommunityComment: (postId, commentId) => set((state) => ({
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
    joinCommunityGroup: (groupId, userId) => set((state) => ({
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
    leaveCommunityGroup: (groupId, userId) => set((state) => ({
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
    addGroup: (group) => set((state) => ({
        communityGroups: [
            ...state.communityGroups,
            { id: Date.now().toString(), members: [], isPrivate: false, ...group }
        ]
    })),
    // Checkout functionality
    redirectToCheckout: async (planId) => {
        console.log(`Redirecting to checkout for plan: ${planId}`);
        // Implement your checkout logic here
    }
}), {
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
}));
