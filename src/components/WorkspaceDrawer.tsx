import React from 'react';
import { X, Settings, Users, Trash2, Archive, Share2, Bell } from 'lucide-react';

interface WorkspaceDrawerProps {
  workspace: {
    id: number;
    name: string;
    description: string;
    members: number;
    projects: number;
    lastActive: string;
    thumbnail?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const WorkspaceDrawer: React.FC<WorkspaceDrawerProps> = ({ workspace, isOpen, onClose }) => {
  if (!isOpen) return null;

  const menuItems = [
    { icon: Settings, label: 'General Settings', description: 'Workspace name, description, and preferences' },
    { icon: Users, label: 'Team Members', description: 'Manage workspace members and roles' },
    { icon: Share2, label: 'Sharing', description: 'Workspace visibility and sharing options' },
    { icon: Bell, label: 'Notifications', description: 'Configure workspace notifications' },
    { icon: Archive, label: 'Archive', description: 'Archive this workspace', danger: false },
    { icon: Trash2, label: 'Delete', description: 'Permanently delete this workspace', danger: true },
  ];

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/15 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className={`fixed right-0 top-0 h-full w-[400px] bg-dark-900 border-l border-dark-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-dark-800">
            <h2 className="text-lg font-semibold text-white">Workspace Settings</h2>
            <button 
              onClick={onClose}
              className="p-1 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 border-b border-dark-800">
              <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                {workspace.thumbnail ? (
                  <img
                    src={workspace.thumbnail}
                    alt={workspace.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                    <Folder className="w-12 h-12 text-dark-700" />
                  </div>
                )}
              </div>
              <h3 className="text-white font-medium mb-2">{workspace.name}</h3>
              <p className="text-dark-400 text-sm">{workspace.description}</p>
            </div>

            <div className="p-6">
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-start gap-4 p-3 rounded-lg hover:bg-dark-800 transition-colors ${
                      item.danger ? 'text-red-500 hover:text-red-400' : 'text-dark-400 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mt-0.5" />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className={`text-sm ${item.danger ? 'text-red-500/70' : 'text-dark-500'}`}>
                        {item.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspaceDrawer;