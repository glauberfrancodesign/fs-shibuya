// Add to existing types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  job_role?: string;
  company_size?: string;
  subscription_tier: 'free' | 'pro';
  permissions: UserPermission[];
}

export type UserPermission = 
  | 'create_workspace'
  | 'manage_workspace'
  | 'create_project'
  | 'manage_project'
  | 'create_test'
  | 'manage_test'
  | 'view_analytics'
  | 'manage_team'
  | 'manage_billing';

export type UserRole = 'owner' | 'admin' | 'member' | 'viewer';
