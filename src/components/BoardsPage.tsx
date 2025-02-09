import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Layout, Users, Clock, MoreHorizontal } from 'lucide-react';
import ProjectHeader from './ProjectHeader';

interface Board {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  collaborators: number;
  thumbnail?: string;
}

const BoardsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const boards: Board[] = [
    {
      id: '1',
      title: 'Product Roadmap',
      description: 'Q1 2024 product planning and feature roadmap',
      created_at: '2024-03-15',
      updated_at: '2024-03-15',
      collaborators: 5,
      thumbnail: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=500&q=80'
    },
    {
      id: '2',
      title: 'Design Sprint',
      description: 'User flow exploration and wireframing session',
      created_at: '2024-03-14',
      updated_at: '2024-03-14',
      collaborators: 3,
      thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80'
    }
  ];

  const filteredBoards = boards.filter(board =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <ProjectHeader 
        title="Boards" 
        description="Collaborate with your team in real-time"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search boards..."
                className="w-full sm:w-64 bg-dark-800 text-white pl-10 pr-4 py-2 rounded-lg text-sm placeholder-dark-400 focus:outline-none focus:ring-1 focus:ring-accent-500"
              />
            </div>
            <button
              onClick={() => navigate('/board')}
              className="btn-glow flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg w-full sm:w-auto"
            >
              <Plus className="w-5 h-5" />
              New Board
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBoards.map((board) => (
              <div
                key={board.id}
                onClick={() => navigate(`/board/${board.id}`)}
                className="group bg-dark-900 rounded-xl border border-dark-800 overflow-hidden hover:border-dark-700 transition-colors cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden">
                  {board.thumbnail ? (
                    <img
                      src={board.thumbnail}
                      alt={board.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                      <Layout className="w-12 h-12 text-dark-700" />
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle board options
                    }}
                    className="absolute top-3 right-3 p-1.5 bg-dark-900/80 rounded-lg text-dark-400 hover:text-white backdrop-blur-sm"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-accent-500 transition-colors">
                    {board.title}
                  </h3>
                  <p className="text-dark-400 text-sm mb-4 line-clamp-2">
                    {board.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-dark-400">
                        <Users className="w-4 h-4" />
                        {board.collaborators}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-dark-400">
                      <Clock className="w-4 h-4" />
                      {new Date(board.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsPage;