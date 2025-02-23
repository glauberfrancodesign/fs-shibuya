import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

const TestBuilderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  // ... rest of the component code ...

  return (
    <div className="flex flex-col h-screen">
      {/* Header and content */}
    </div>
  );
};

export default TestBuilderPage; // Add this line
