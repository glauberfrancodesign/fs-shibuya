import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Plus, GripVertical } from 'lucide-react';
import TestBlockEditor from './TestBlockEditor';
import { TestBlock } from '../types';
import { useTestBuilderStore } from '../store/testBuilderStore';

interface LocationState {
  template: {
    id: string;
    title: string;
    description: string;
    category: string;
  };
}

const initialBlocks: TestBlock[] = [
  {
    id: 'welcome',
    type: 'welcome',
    title: 'A-mazing to meet you!',
    description: 'Welcome Screen',
    customMessage: true,
    content: 'You have been invited to share feedback, ideas and insights'
  },
  {
    id: 'usage',
    type: 'yes-no',
    title: 'Have you used our product before?',
    description: 'Usage Question',
    required: true,
    showIcons: true
  },
  {
    id: 'frequency',
    type: 'multiple-choice',
    title: 'If yes, how often do you use it per week?',
    description: 'Usage Frequency',
    choices: [
      'Once a week',
      'Twice a week',
      'Three times a week',
      'Five times a week',
      'More than five times a week'
    ],
    singleSelect: true
  }
];

const TestBuilderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [selectedBlockId, setSelectedBlockId] = useState<string>('welcome');
  const [draggedBlock, setDraggedBlock] = useState<number | null>(null);
  const [dropTarget, setDropTarget] = useState<number | null>(null);

  const { blocks, setBlocks, moveBlock, updateBlock } = useTestBuilderStore();

  useEffect(() => {
    setBlocks(initialBlocks);
  }, [setBlocks]);

  if (!state?.template) {
    return <Navigate to="/projects" replace />;
  }

  const { template } = state;

  const handleDragStart = (index: number) => {
    setDraggedBlock(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedBlock === null) return;
    setDropTarget(index);
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedBlock === null) return;
    moveBlock(draggedBlock, targetIndex);
    setDraggedBlock(null);
    setDropTarget(null);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
    setDropTarget(null);
  };

  const selectedBlock = blocks.find(block => block.id === selectedBlockId);

  const getBlockIcon = (type: TestBlock['type']) => {
    switch (type) {
      case 'welcome': return '👋';
      case 'yes-no': return '✓';
      case 'multiple-choice': return '☰';
      case 'prototype': return '⚡';
      case 'open-question': return '💭';
      case 'thank-you': return '🎉';
      default: return '📝';
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="page-header">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center text-dark-400 text-sm mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 mr-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span>Projects</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>New Test</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">{template.title}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">{template.title}</h1>
              <p className="text-dark-400">{template.description}</p>
            </div>
            <button className="btn-glow btn-responsive px-4 py-2 text-white rounded-lg">
              Save & Continue
            </button>
          </div>
        </div>
      </header>

      <div className="page-content">
        <div className="px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-dark-900 rounded-xl border border-dark-800 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-medium">Test Blocks</h2>
                  <button className="p-1.5 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {blocks.map((block, index) => (
                    <div
                      key={block.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={() => handleDrop(index)}
                      onDragEnd={handleDragEnd}
                      onClick={() => setSelectedBlockId(block.id)}
                      className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedBlockId === block.id
                          ? 'bg-dark-700 ring-1 ring-accent-500'
                          : 'bg-dark-800 hover:bg-dark-700'
                      } ${
                        dropTarget === index ? 'border-t-2 border-accent-500' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button 
                          className="touch-none p-1 -ml-1.5 text-dark-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <GripVertical className="w-4 h-4" />
                        </button>
                        <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center">
                          <span className="text-dark-400 text-sm">
                            {getBlockIcon(block.type)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-white">{block.title}</p>
                          <p className="text-xs text-dark-400">{block.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1">
              {selectedBlock && (
                <TestBlockEditor 
                  block={selectedBlock} 
                  onChange={(updatedBlock) => {
                    updateBlock(selectedBlock.id, updatedBlock);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestBuilderPage;