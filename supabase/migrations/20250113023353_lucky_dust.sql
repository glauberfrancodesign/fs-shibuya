/*
  # Initial Schema Setup

  1. Tables
    - users (extends auth.users)
    - workspaces
    - workspace_members
    - projects

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  job_role text,
  company_size text,
  subscription_tier text DEFAULT 'free',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workspaces table
CREATE TABLE IF NOT EXISTS workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  thumbnail_url text,
  owner_id uuid REFERENCES users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workspace members table
CREATE TABLE IF NOT EXISTS workspace_members (
  workspace_id uuid REFERENCES workspaces ON DELETE CASCADE,
  user_id uuid REFERENCES users ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member',
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (workspace_id, user_id)
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  status text DEFAULT 'draft',
  created_by uuid REFERENCES users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url, subscription_tier)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    'free'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create RLS Policies
DO $$ BEGIN
  -- Users policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile"
      ON users FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON users FOR UPDATE
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  -- Workspaces policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'workspaces' AND policyname = 'Workspace members can view workspaces'
  ) THEN
    CREATE POLICY "Workspace members can view workspaces"
      ON workspaces FOR SELECT
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM workspace_members
          WHERE workspace_members.workspace_id = workspaces.id
          AND workspace_members.user_id = auth.uid()
        )
        OR owner_id = auth.uid()
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'workspaces' AND policyname = 'Workspace owner can update workspace'
  ) THEN
    CREATE POLICY "Workspace owner can update workspace"
      ON workspaces FOR UPDATE
      TO authenticated
      USING (owner_id = auth.uid());
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'workspaces' AND policyname = 'Users can create workspaces'
  ) THEN
    CREATE POLICY "Users can create workspaces"
      ON workspaces FOR INSERT
      TO authenticated
      WITH CHECK (owner_id = auth.uid());
  END IF;

  -- Workspace members policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'workspace_members' AND policyname = 'Workspace members can view other members'
  ) THEN
    CREATE POLICY "Workspace members can view other members"
      ON workspace_members FOR SELECT
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM workspace_members wm
          WHERE wm.workspace_id = workspace_members.workspace_id
          AND wm.user_id = auth.uid()
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'workspace_members' AND policyname = 'Workspace owner can manage members'
  ) THEN
    CREATE POLICY "Workspace owner can manage members"
      ON workspace_members FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM workspaces
          WHERE workspaces.id = workspace_members.workspace_id
          AND workspaces.owner_id = auth.uid()
        )
      );
  END IF;

  -- Projects policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Workspace members can view projects'
  ) THEN
    CREATE POLICY "Workspace members can view projects"
      ON projects FOR SELECT
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM workspace_members
          WHERE workspace_members.workspace_id = projects.workspace_id
          AND workspace_members.user_id = auth.uid()
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Workspace members can create projects'
  ) THEN
    CREATE POLICY "Workspace members can create projects"
      ON projects FOR INSERT
      TO authenticated
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM workspace_members
          WHERE workspace_members.workspace_id = projects.workspace_id
          AND workspace_members.user_id = auth.uid()
        )
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Project creator can update project'
  ) THEN
    CREATE POLICY "Project creator can update project"
      ON projects FOR UPDATE
      TO authenticated
      USING (created_by = auth.uid());
  END IF;
END $$;