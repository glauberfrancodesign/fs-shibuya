import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  full_name: string;
  subscription_tier: 'free' | 'pro';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

// Create a default authenticated user
const defaultUser: User = {
  id: '1',
  email: 'francostudio.design@gmail.com',
  full_name: 'Franco Glauber',
  subscription_tier: 'pro'
};

export const useAuthStore = create<AuthState>((set) => ({
  // Initialize with the default user instead of null
  user: defaultUser,
  loading: false,

  signIn: async () => {
    // Always succeed and set the default user
    set({ user: defaultUser });
  },

  signOut: () => {
    // Reset to default user instead of null
    set({ user: defaultUser });
  }
}));