import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import ProjectHeader from './ProjectHeader';

const KanbanBoard = () => {
  const columns = [
    {
      title: 'To Do',
      tasks: [],
    },
    {
      title: 'In Progress',
      tasks: [
        {
          id: 1,
          title: 'Planning meeting for second option of the dashboard',
          description: 'Focus on strategizing and outlining the development of the second option for the dashboard',
          priority: 'Medium',
          date: 'Sep 09, 2024',
          assignees: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'
          ],
          comments: 2,
          attachments: 7
        },
        {
          id: 2,
          title: 'Finish the ideation',
          description: 'The team will conclude the ideation phase by finalizing and refining concepts that have been developed',
          priority: 'High',
          date: 'Sep 12, 2024',
          progress: 75,
          assignees: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
          ],
          comments: 12,
          attachments: 34
        }
      ]
    },
    {
      title: 'In Review',
      tasks: [
        {
          id: 3,
          title: 'Business model canvas of product',
          description: 'Developing a comprehensive Business Model Canvas for the product, outlining the key components',
          priority: 'Low',
          date: 'Sep 01, 2024',
          assignees: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
          ]
        }
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-500';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'low':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-dark-800 text-dark-400';
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ProjectHeader 
        title="Kanban Board" 
        description="Manage your tasks and workflow"
      />

      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-6 h-full">
          {columns.map((column, index) => (
            <div key={index} className="flex-1 min-w-[320px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-white">{column.title}</h3>
                  <span className="text-sm text-dark-400">{column.tasks.length}</span>
                </div>
                <button className="text-dark-400 hover:text-white p-1 rounded-md hover:bg-dark-800">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {column.tasks.map((task) => (
                  <div key={task.id} className="bg-dark-900 rounded-lg p-4 border border-dark-800">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <button className="text-dark-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="text-white font-medium mb-2">{task.title}</h4>
                    <p className="text-dark-400 text-sm mb-4">{task.description}</p>

                    {task.progress && (
                      <div className="mb-4">
                        <div className="h-1.5 bg-dark-800 rounded-full">
                          <div 
                            className="h-1.5 bg-accent-500 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {task.assignees.map((url, i) => (
                          <img
                            key={i}
                            className="w-6 h-6 rounded-full border-2 border-dark-900"
                            src={url}
                            alt="Team member"
                          />
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-3 text-dark-400 text-sm">
                        {task.comments && (
                          <span className="flex items-center gap-1">
                            <span>💬</span>
                            {task.comments}
                          </span>
                        )}
                        {task.attachments && (
                          <span className="flex items-center gap-1">
                            <span>📎</span>
                            {task.attachments}
                          </span>
                        )}
                        <span>{task.date}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {column.tasks.length === 0 && (
                  <button className="w-full py-3 border border-dashed border-dark-800 rounded-lg text-dark-400 hover:text-white hover:border-dark-700">
                    <Plus className="w-4 h-4 mx-auto" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;