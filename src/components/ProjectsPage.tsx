import React, { useState } from 'react';
import { Plus, Search, ExternalLink, Archive, Clock, Users, Folder, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CreateTestModal from './CreateTestModal';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');

  const projects = {
    active: [
      {
        id: 1,
        name: 'E-commerce Redesign',
        description: 'Complete overhaul of the main e-commerce platform',
        status: 'In Progress',
        progress: 65,
        members: 8,
        lastUpdated: '2024-03-18',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80'
      },
      {
        id: 2,
        name: 'Mobile App Testing',
        description: 'User testing for the new mobile application',
        status: 'Planning',
        progress: 15,
        members: 5,
        lastUpdated: '2024-03-17',
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80'
      },
      {
        id: 3,
        name: 'Dashboard Analytics',
        description: 'Implementation of new analytics dashboard',
        status: 'Review',
        progress: 90,
        members: 4,
        lastUpdated: '2024-03-16',
        thumbnail: 'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=500&q=80'
      }
    ],
    archived: [
      {
        id: 4,
        name: 'Legacy System Migration',
        description: 'Migration of legacy systems to new platform',
        status: 'Completed',
        progress: 100,
        members: 12,
        lastUpdated: '2024-02-28',
        thumbnail: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=500&q=80'
      },
      {
        id: 5,
        name: 'UI Component Library',
        description: 'Design and development of reusable UI components',
        status: 'Completed',
        progress: 100,
        members: 6,
        lastUpdated: '2024-02-15',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-500/50 text-blue-500';
      case 'planning':
        return 'bg-yellow-500/50 text-yellow-500';
      case 'review':
        return 'bg-purple-500/50 text-purple-500';
      case 'completed':
        return 'bg-green-500/50 text-green-500';
      default:
        return 'bg-dark-700/50 text-dark-400';
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="page-header">
        <div className="px-4 sm:px-6 py-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">Projects</h1>
            <p className="text-dark-400">Manage and track your project progress</p>
          </div>
        </div>
      </header>

      <div className="page-content">
        <div className="px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'active'
                    ? 'bg-dark-800 text-white'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                Active Projects
              </button>
              <button
                onClick={() => setActiveTab('archived')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'archived'
                    ? 'bg-dark-800 text-white'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <Archive className="w-4 h-4 inline-block mr-2" />
                Archived
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full sm:w-64 bg-dark-800 text-white pl-10 pr-4 py-2 rounded-lg text-sm placeholder-dark-400 focus:outline-none focus:ring-1 focus:ring-accent-500"
                />
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn-glow flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg"
              >
                <Plus className="w-5 h-5" />
                New Project
              </button>
            </div>
          </div>

          <div className="grid-cards">
            {projects[activeTab].map((project) => (
              <div
                key={project.id}
                className="group bg-dark-900 rounded-xl border border-dark-800 overflow-hidden hover:border-dark-700 transition-colors"
              >
                <div className="relative h-40 overflow-hidden">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                      <Folder className="w-12 h-12 text-dark-700" />
                    </div>
                  )}
                  <button className="absolute top-3 right-3 p-1.5 bg-dark-900/80 rounded-lg text-dark-400 hover:text-white backdrop-blur-sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-white group-hover:text-accent-500 transition-colors">
                      {project.name}
                    </h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-dark-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-dark-400">
                        <Users className="w-4 h-4" />
                        {project.members}
                      </div>
                      <div className="flex items-center gap-1.5 text-dark-400">
                        <Clock className="w-4 h-4" />
                        {new Date(project.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="h-2 w-24 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-500 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isCreateModalOpen && <CreateTestModal onClose={() => setIsCreateModalOpen(false)} />}
    </div>
  );
};

export default ProjectsPage;