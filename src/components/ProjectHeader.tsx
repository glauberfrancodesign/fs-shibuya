import React from 'react';
import { ChevronRight, Pencil, Users, Layout, ArrowLeft } from 'lucide-react';

interface ProjectHeaderProps {
  onBack?: () => void;
  title: string;
  description?: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ onBack, title, description }) => {
  return (
    <header className="page-header">
      <div className="px-6 py-4">
        <div className="flex items-center text-dark-400 text-sm mb-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1 -ml-1 mr-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <span>Projects</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white">{title}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">{title}</h1>
            {description && <p className="text-dark-400">{description}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-dark-400 hover:text-white rounded-md hover:bg-dark-800">
              <Users className="w-4 h-4" />
              Invite
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-dark-400 hover:text-white rounded-md hover:bg-dark-800">
              <Layout className="w-4 h-4" />
              Board
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProjectHeader;