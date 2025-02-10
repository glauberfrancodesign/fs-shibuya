import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Users, Clock, Folder, MoreHorizontal, ChevronDown } from 'lucide-react';
import DashboardStats from './DashboardStats';
import WorkspaceDrawer from './WorkspaceDrawer';
import CreateTestModal from './CreateTestModal';

interface Workspace {
  id: number;
  name: string;
  description: string;
  members: number;
  projects: number;
  lastActive: string;
  thumbnail?: string;
}

const WorkspacePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const workspaces: Workspace[] = [
    {
      id: 1,
      name: "Franco Labs",
      description: "Research platform for analyzing user behavior",
      members: 5,
      projects: 9,
      lastActive: "2024-03-15",
      thumbnail: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=500&q=80"
    },
    {
      id: 2,
      name: "BCA - CRM Web App",
      description: "Customer relationship management system for BCA",
      members: 8,
      projects: 11,
      lastActive: "2024-03-14",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80"
    },
    {
      id: 3,
      name: "Mandiri - Landing Page",
      description: "Website redesign project for Mandiri",
      members: 4,
      projects: 3,
      lastActive: "2024-03-12",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80"
    }
  ];

  const recentTests = [
    {
      id: 1,
      title: 'E-commerce Navigation',
      participants: 45,
      successRate: 82,
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Main Menu',
      participants: 30,
      successRate: 75,
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Admin Area',
      participants: 15,
      successRate: 60,
      status: 'In Progress',
    },
  ];

  const handleOpenDrawer = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    setIsDrawerOpen(true);
  };

  // Filter workspaces based on search query
  const filteredWorkspaces = workspaces.filter(workspace =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workspace.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <header className="page-header">
        <div className="px-4 sm:px-6 py-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">Welcome to FrancoLabs</h1>
            <p className="text-dark-400">Manage your projects and team collaborations</p>
          </div>
        </div>
      </header>

      <div className="page-content">
        <div className="px-4 sm:px-6 py-6 sm:py-8">
          <DashboardStats />

          <div className="bg-dark-900 rounded-xl border border-dark-800 mb-8">
            <div className="p-4 sm:p-6 border-b border-dark-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <h2 className="text-lg font-semibold text-white">Recent studies</h2>
                <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn-glow flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg"
              >
                <Plus className="w-5 h-5" />
                New Study
              </button>
                  <button className="btn-responsive px-4 py-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800 transition-colors">
                    Go to projects
                  </button>
                </div>
              </div>
              <p className="text-dark-400 text-sm">Studies recently created or modified by your team.</p>
            </div>

            <div className="table-container">
              <div className="table-wrapper">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-800">
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase">Study Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase">Integration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase">Responses</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase">Created By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-dark-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-800">
                    {recentTests.map((test) => (
                      <tr key={test.id} className="hover:bg-dark-800/50">
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-white">{test.title}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            test.status === 'In Progress'
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-dark-700/50 text-dark-400'
                          }`}>
                            {test.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-dark-400">Figma</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-dark-400">{test.participants}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <img
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=30&h=30&fit=crop"
                              alt="User"
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm text-dark-400">CO</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="p-1 text-dark-400 hover:text-white rounded-lg hover:bg-dark-700">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="search-filters mb-6">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search workspaces..."
                  className="w-full bg-dark-800 text-white pl-10 pr-4 py-2 rounded-lg text-sm placeholder-dark-400 focus:outline-none focus:ring-1 focus:ring-accent-500"
                />
              </div>

              <button className="flex items-center gap-2 px-3 py-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800">
                <span>Sort by:</span>
                Most Recent
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="grid-cards">
              {filteredWorkspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  onClick={() => navigate(`/workspace/${workspace.id}/projects`)}
                  className="group bg-dark-900 rounded-xl border border-dark-800 overflow-hidden hover:border-dark-700 transition-colors cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden">
                    {workspace.thumbnail ? (
                      <img
                        src={workspace.thumbnail}
                        alt={workspace.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                        <Folder className="w-12 h-12 text-dark-700" />
                      </div>
                    )}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDrawer(workspace);
                      }}
                      className="absolute top-3 right-3 p-1.5 bg-dark-900/80 rounded-lg text-dark-400 hover:text-white backdrop-blur-sm"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-medium text-white mb-2 group-hover:text-accent-500 transition-colors">
                      {workspace.name}
                    </h3>
                    <p className="text-dark-400 text-sm mb-4 line-clamp-2">{workspace.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-dark-400">
                          <Users className="w-4 h-4" />
                          {workspace.members}
                        </div>
                        <div className="flex items-center gap-1.5 text-dark-400">
                          <Folder className="w-4 h-4" />
                          {workspace.projects}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-dark-400">
                        <Clock className="w-4 h-4" />
                        {new Date(workspace.lastActive).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedWorkspace && (
        <WorkspaceDrawer
          workspace={selectedWorkspace}
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedWorkspace(null);
          }}
        />
      )}
      {isCreateModalOpen && <CreateTestModal onClose={() => setIsCreateModalOpen(false)} />}
    </div>
  );
};

export default WorkspacePage;