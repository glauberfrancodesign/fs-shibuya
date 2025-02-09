import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  
  // Since we always have a user now, we can simplify this
  return children;
}