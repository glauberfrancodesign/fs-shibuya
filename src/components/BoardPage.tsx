import React, { useRef, useState, useEffect } from 'react';
import {
  Pencil,
  Mouse,
  Square,
  Circle,
  StickyNote,
  Type,
  Image,
  Hand,
  Undo,
  Redo,
  Download,
  Share2,
  Timer,
  Settings,
  Users,
  Plus,
  Minus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectHeader from './ProjectHeader';

interface Tool {
  id: string;
  icon: React.ReactNode;
  name: string;
}

interface CanvasObject {
  id: string;
  type: 'sticky' | 'shape' | 'text' | 'drawing';
  x: number;
  y: number;
  content?: string;
  color?: string;
  path?: string[];
}

const BoardPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<string>('cursor');
  const [objects, setObjects] = useState<CanvasObject[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [zoom, setZoom] = useState(100);
  const [showTimeline, setShowTimeline] = useState(true);

  const tools: Tool[] = [
    { id: 'cursor', icon: <Mouse className="w-5 h-5" />, name: 'Select' },
    { id: 'hand', icon: <Hand className="w-5 h-5" />, name: 'Pan' },
    { id: 'pen', icon: <Pencil className="w-5 h-5" />, name: 'Pen' },
    { id: 'square', icon: <Square className="w-5 h-5" />, name: 'Square' },
    { id: 'circle', icon: <Circle className="w-5 h-5" />, name: 'Circle' },
    {
      id: 'sticky',
      icon: <StickyNote className="w-5 h-5" />,
      name: 'Sticky Note',
    },
    { id: 'text', icon: <Type className="w-5 h-5" />, name: 'Text' },
    { id: 'image', icon: <Image className="w-5 h-5" />, name: 'Image' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas
    canvas.width = window.innerWidth - 64; // Account for toolbar
    canvas.height = window.innerHeight - 180; // Account for header and timeline

    // Initial canvas setup
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool === 'pen') {
      setIsDrawing(true);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCurrentPath([`M ${x} ${y}`]);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing && selectedTool === 'pen') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCurrentPath([...currentPath, `L ${x} ${y}`]);
    }
  };

  const handleCanvasMouseUp = () => {
    if (isDrawing && selectedTool === 'pen') {
      setIsDrawing(false);
      setObjects([
        ...objects,
        {
          id: Date.now().toString(),
          type: 'drawing',
          x: 0,
          y: 0,
          path: currentPath,
        },
      ]);
      setCurrentPath([]);
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom((prev) => {
      const newZoom = direction === 'in' ? prev + 10 : prev - 10;
      return Math.max(50, Math.min(200, newZoom));
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <ProjectHeader
        title="Collaborative Board"
        description="Work together in real-time"
        onBack={() => navigate(-1)}
      />

      <div className="flex-1 flex">
        {/* Toolbar */}
        <div className="w-16 items-center bg-dark-900 border-r border-dark-800 p-2 flex flex-col gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolSelect(tool.id)}
              className={`p-2 rounded-lg transition-colors ${
                selectedTool === tool.id
                  ? 'bg-accent-500 text-white'
                  : 'text-dark-400 hover:text-white hover:bg-dark-800'
              }`}
              title={tool.name}
            >
              {tool.icon}
            </button>
          ))}

          <div className="mt-auto flex flex-col gap-2">
            <button
              onClick={() => handleZoom('in')}
              className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
              title="Zoom In"
            >
              <Plus className="w-5 h-5" />
            </button>
            <div className="text-center text-sm text-dark-400">{zoom}%</div>
            <button
              onClick={() => handleZoom('out')}
              className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
              title="Zoom Out"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-dark-950 overflow-hidden">
          <div className="relative w-full h-full">
            <canvas
              ref={canvasRef}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              className="absolute inset-0"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: '0 0',
              }}
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="w-16 items-center bg-dark-900 border-l border-dark-800 p-2 flex flex-col gap-2">
          <button
            className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
            title="Undo"
          >
            <Undo className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
            title="Redo"
          >
            <Redo className="w-5 h-5" />
          </button>
          <div className="border-t border-dark-800 my-2" />
          <button
            className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
            title="Export"
          >
            <Download className="w-5 h-5" />
          </button>
          <div className="mt-auto">
            <button
              className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
              title="Timer"
            >
              <Timer className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
              title="Collaborators"
            >
              <Users className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {showTimeline && (
        <div className="h-24 bg-dark-900 border-t border-dark-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-white">Timeline</h3>
            <button
              onClick={() => setShowTimeline(false)}
              className="text-dark-400 hover:text-white"
            >
              Hide
            </button>
          </div>
          <div className="h-8 bg-dark-800 rounded-lg"></div>
        </div>
      )}
    </div>
  );
};

export default BoardPage;
