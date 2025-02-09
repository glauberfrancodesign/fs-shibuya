import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  // No need for real-time auth state management with basic auth
  return children;
}