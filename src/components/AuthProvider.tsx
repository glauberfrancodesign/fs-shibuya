// Add error handling
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, error } = useAuthStore();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;

  return children;
}
