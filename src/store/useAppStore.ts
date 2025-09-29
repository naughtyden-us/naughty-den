import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Profile, Creator, Post, AppError } from '@/types';

interface AppState {
  // User state
  user: User | null;
  userProfile: Profile | null;
  isAuthenticated: boolean;
  
  // UI state
  isLoading: boolean;
  error: AppError | null;
  isAgeConfirmed: boolean;
  
  // Content state
  creators: Creator[];
  posts: Post[];
  
  // Modal state
  isLoginModalOpen: boolean;
  isProfileModalOpen: boolean;
  isKYCModalOpen: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setUserProfile: (profile: Profile | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: AppError | null) => void;
  setAgeConfirmed: (confirmed: boolean) => void;
  setCreators: (creators: Creator[]) => void;
  setPosts: (posts: Post[]) => void;
  setLoginModal: (isOpen: boolean) => void;
  setProfileModal: (isOpen: boolean) => void;
  setKYCModal: (isOpen: boolean) => void;
  
  // Complex actions
  login: (user: User, profile: Profile) => void;
  logout: () => void;
  updateProfile: (updates: Partial<Profile>) => void;
  addCreator: (creator: Creator) => void;
  updateCreator: (id: number, updates: Partial<Creator>) => void;
  likeCreator: (id: number) => void;
  addPost: (post: Post) => void;
  likePost: (id: number) => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      userProfile: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isAgeConfirmed: false,
      creators: [],
      posts: [],
      isLoginModalOpen: false,
      isProfileModalOpen: false,
      isKYCModalOpen: false,
      
      // Basic setters
      setUser: (user) => set({ user }),
      setUserProfile: (profile) => set({ userProfile: profile }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setAgeConfirmed: (isAgeConfirmed) => set({ isAgeConfirmed }),
      setCreators: (creators) => set({ creators }),
      setPosts: (posts) => set({ posts }),
      setLoginModal: (isLoginModalOpen) => set({ isLoginModalOpen }),
      setProfileModal: (isProfileModalOpen) => set({ isProfileModalOpen }),
      setKYCModal: (isKYCModalOpen) => set({ isKYCModalOpen }),
      
      // Complex actions
      login: (user, profile) => set({
        user,
        userProfile: profile,
        isAuthenticated: true,
        isLoginModalOpen: false,
        error: null,
      }),
      
      logout: () => set({
        user: null,
        userProfile: null,
        isAuthenticated: false,
        isLoginModalOpen: false,
        isProfileModalOpen: false,
        isKYCModalOpen: false,
        error: null,
      }),
      
      updateProfile: (updates) => set((state) => ({
        userProfile: state.userProfile ? { ...state.userProfile, ...updates } : null,
      })),
      
      addCreator: (creator) => set((state) => ({
        creators: [...state.creators, creator],
      })),
      
      updateCreator: (id, updates) => set((state) => ({
        creators: state.creators.map(creator =>
          creator.id === id ? { ...creator, ...updates } : creator
        ),
      })),
      
      likeCreator: (id) => set((state) => ({
        creators: state.creators.map(creator =>
          creator.id === id ? { ...creator, likes: creator.likes + 1 } : creator
        ),
      })),
      
      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts],
      })),
      
      likePost: (id) => set((state) => ({
        posts: state.posts.map(post =>
          post.id === id ? { ...post, likes: post.likes + 1 } : post
        ),
      })),
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'naughty-den-storage',
      partialize: (state) => ({
        isAgeConfirmed: state.isAgeConfirmed,
        user: state.user,
        userProfile: state.userProfile,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors for better performance
export const useUser = () => useAppStore((state) => ({
  user: state.user,
  userProfile: state.userProfile,
  isAuthenticated: state.isAuthenticated,
}));

export const useUI = () => useAppStore((state) => ({
  isLoading: state.isLoading,
  error: state.error,
  isAgeConfirmed: state.isAgeConfirmed,
}));

export const useModals = () => useAppStore((state) => ({
  isLoginModalOpen: state.isLoginModalOpen,
  isProfileModalOpen: state.isProfileModalOpen,
  isKYCModalOpen: state.isKYCModalOpen,
}));

export const useContent = () => useAppStore((state) => ({
  creators: state.creators,
  posts: state.posts,
}));
