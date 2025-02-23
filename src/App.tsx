import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import WorkspacePage from './components/WorkspacePage';
import ProjectsPage from './components/ProjectsPage';
import TestBuilderPage from './components/TestBuilderPage';
import ProfileSettings from './components/ProfileSettings';
import BoardPage from './components/BoardPage';
import BoardsPage from './components/BoardsPage';
import KanbanBoard from './components/KanbanBoard';
import AuthPage from './components/AuthPage';
import { AuthGuard } from './components/AuthGuard';
import { AuthProvider } from './components/AuthProvider';
import { useSidebarStore } from './store/sidebarStore';

function App() {
  const { isCollapsed } = useSidebarStore();

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          
          <Route
            path="/*"
            element={
              <AuthGuard>
                <div className="flex min-h-screen bg-dark-950">
                  <Sidebar />
                  <main className="flex-1 transition-all duration-300">
                    <Routes>
                      <Route path="/" element={<WorkspacePage />} />
                      <Route path="/projects" element={<ProjectsPage />} />
                      <Route path="/workspace/:id/projects" element={<ProjectsPage />} />
                      <Route path="/test/create" element={<TestBuilderPage />} />
                      <Route path="/boards" element={<BoardsPage />} />
                      <Route path="/board" element={<BoardPage />} />
                      <Route path="/board/:id" element={<BoardPage />} />
                      <Route path="/kanban" element={<KanbanBoard />} />
                      <Route path="/settings/profile" element={<ProfileSettings />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </div>
              </AuthGuard>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
