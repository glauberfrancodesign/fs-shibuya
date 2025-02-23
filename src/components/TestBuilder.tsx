import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestBlockEditor from './TestBlockEditor';
import { TestBlock } from '../types';

interface TestBuilderProps {
  onBack: () => void;
  template: {
    id: string;
    title: string;
    description: string;
    category: string;
  };
}

const TestBuilder: React.FC<TestBuilderProps> = ({ onBack, template }) => {
  // ... (keep existing state)

  return (
    <div className="flex flex-col h-screen">
      <header className="page-header">
        <div className="px-6 py-4">
          <div className="flex items-center text-dark-400 text-sm mb-4">
            <button
              onClick={onBack}
              className="p-1 -ml-1 mr-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>Projects</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>New Test</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">{template.title}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-2">{template.title}</h1>
              <p className="text-dark-400">{template.description}</p>
            </div>
            <button className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600">
              Save & Continue
            </button>
          </div>
        </div>
      </header>

      <div className="page-content">
        {/* Rest of the existing content */}
      </div>
    </div>
  );
};

export default TestBuilder;
