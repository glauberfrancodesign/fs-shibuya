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
        {/* Header content */}
      </div>
    </header>
  );
};

export default ProjectHeader; // Add this line
