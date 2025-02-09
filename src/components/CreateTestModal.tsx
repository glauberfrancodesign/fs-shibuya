import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Blocks } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSidebarStore } from '../store/sidebarStore';

interface CreateTestModalProps {
  onClose: () => void;
}

interface TestTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  isPro?: boolean;
  icon?: string;
}

const CreateTestModal: React.FC<CreateTestModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const autoCollapse = useSidebarStore(state => state.autoCollapse);
  const autoExpand = useSidebarStore(state => state.autoExpand);

  // Auto-collapse sidebar when modal opens
  useEffect(() => {
    autoCollapse();
    return () => autoExpand();
  }, [autoCollapse, autoExpand]);

  const categories = [
    { id: 'all', name: 'All templates', count: 54 },
    { id: 'content', name: 'Content Testing', count: 13 },
    { id: 'concept', name: 'Concept Validation', count: 8 },
    { id: 'idea', name: 'Idea Validation', count: 8 },
    { id: 'copy', name: 'Copy Testing', count: 8 },
    { id: 'satisfaction', name: 'Satisfaction Survey', count: 4 },
    { id: 'feedback', name: 'Feedback Survey', count: 14 },
    { id: 'usability', name: 'Usability Testing', count: 11 },
    { id: 'wireframe', name: 'Wireframe Testing', count: 5 },
  ];

  const templates: TestTemplate[] = [
    {
      id: 'scratch',
      title: 'Start from scratch',
      description: 'Begin with a blank slate and select your own maze blocks',
      category: 'custom',
      icon: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=100&h=100&fit=crop'
    },
    {
      id: 'card-sorting',
      title: 'Run closed card sorting',
      description: 'Organize and categorize content effectively',
      category: 'content',
      isPro: true
    },
    {
      id: 'cta-placement',
      title: 'Test CTA placement',
      description: 'Optimize your call-to-action positioning',
      category: 'content'
    },
    {
      id: 'product-discovery',
      title: 'Run a product discovery survey',
      description: 'Gather insights about product features',
      category: 'idea',
      isPro: true
    },
    {
      id: 'usability-test',
      title: 'Usability testing a new product',
      description: 'Test your product with real users',
      category: 'usability'
    },
    {
      id: 'feature-discovery',
      title: 'Feature discoverability template',
      description: 'Evaluate how users find and interact with features',
      category: 'usability',
      isPro: true
    }
  ];

  const filteredTemplates = templates.filter(template => 
    selectedCategory === 'all' || template.category === selectedCategory
  );

  const handleTemplateSelect = (template: TestTemplate) => {
    onClose();
    navigate('/test/create', { state: { template } });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark-900 rounded-xl w-[90vw] max-w-6xl max-h-[85vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-dark-800">
          <h2 className="text-xl font-semibold text-white">Create a new test</h2>
          <button
            onClick={onClose}
            className="text-dark-400 hover:text-white p-2 rounded-lg hover:bg-dark-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[calc(85vh-76px)]">
          <div className="w-64 border-r border-dark-800 p-4 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-white mb-2">Custom templates</h3>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-dark-800 text-white'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <span>All templates</span>
                <span className="text-dark-400">0</span>
              </button>
            </div>

            <div>
              <h3 className="text-sm font-medium text-white mb-2">Templates</h3>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-dark-800 text-white'
                        : 'text-dark-400 hover:text-white hover:bg-dark-800'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-dark-400">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">Create your own test</h3>
              <div 
                onClick={() => handleTemplateSelect(templates[0])}
                className="bg-dark-800 rounded-xl p-4 flex items-center gap-4 hover:bg-dark-700 cursor-pointer"
              >
                <div className="w-12 h-12 bg-dark-700 rounded-lg flex items-center justify-center">
                  <Blocks className="w-6 h-6 text-dark-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Start from scratch</h4>
                  <p className="text-dark-400 text-sm">Begin with a blank slate and select your own test blocks</p>
                </div>
                <ChevronRight className="w-5 h-5 text-dark-400 ml-auto" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Start from a Template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTemplates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="bg-dark-800 rounded-xl p-4 hover:bg-dark-700 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-dark-700 rounded-lg flex items-center justify-center">
                        <Blocks className="w-5 h-5 text-dark-400" />
                      </div>
                      {template.isPro && (
                        <span className="px-2 py-1 text-xs font-medium bg-accent-500/10 text-accent-500 rounded-full">
                          PRO
                        </span>
                      )}
                    </div>
                    <h4 className="text-white font-medium mb-1 group-hover:text-accent-500">
                      {template.title}
                    </h4>
                    <p className="text-dark-400 text-sm">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTestModal;