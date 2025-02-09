import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function AuthPage() {
  const { user } = useAuthStore();
  
  // Always redirect to home since we're auto-authenticated
  return <Navigate to="/" replace />;
}