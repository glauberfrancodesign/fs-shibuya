import React, { useState } from 'react';
import { Info, Plus, Trash2 } from 'lucide-react';
import { TestBlock, TestBlockType } from '../types';

interface TestBlockEditorProps {
  block: TestBlock;
  onChange: (block: TestBlock) => void;
}

const TestBlockEditor: React.FC<TestBlockEditorProps> = ({ block, onChange }) => {
  const handleChange = (field: keyof TestBlock, value: any) => {
    onChange({ ...block, [field]: value });
  };

  const handleSettingsChange = (field: string, value: any) => {
    onChange({
      ...block,
      settings: {
        ...block.settings,
        [field]: value
      }
    });
  };

  const renderBlockSpecificFields = () => {
    switch (block.type) {
      case 'long-text':
      case 'short-text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Minimum Length
              </label>
              <input
                type="number"
                value={block.settings.minLength || 0}
                onChange={(e) => handleSettingsChange('minLength', parseInt(e.target.value))}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Maximum Length
              </label>
              <input
                type="number"
                value={block.settings.maxLength || 1000}
                onChange={(e) => handleSettingsChange('maxLength', parseInt(e.target.value))}
                className="input-field"
                min="1"
              />
            </div>
          </div>
        );

      case 'single-choice':
      case 'multiple-choice':
        return (
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Options
            </label>
            <div className="space-y-2">
              {(block.settings.options || []).map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(block.settings.options || [])];
                      newOptions[index] = e.target.value;
                      handleSettingsChange('options', newOptions);
                    }}
                    className="input-field flex-1"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    onClick={() => {
                      const newOptions = (block.settings.options || []).filter((_, i) => i !== index);
                      handleSettingsChange('options', newOptions);
                    }}
                    className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newOptions = [...(block.settings.options || []), ''];
                  handleSettingsChange('options', newOptions);
                }}
                className="w-full px-4 py-2 border border-dashed border-dark-700 rounded-lg text-dark-400 hover:text-white hover:border-dark-600"
              >
                Add Option
              </button>
            </div>
          </div>
        );

      case 'navigation':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Navigation URL
              </label>
              <input
                type="url"
                value={block.settings.navigationUrl || ''}
                onChange={(e) => handleSettingsChange('navigationUrl', e.target.value)}
                className="input-field"
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Task Description
              </label>
              <textarea
                value={block.settings.navigationTask || ''}
                onChange={(e) => handleSettingsChange('navigationTask', e.target.value)}
                className="input-field"
                rows={3}
                placeholder="Describe the navigation task..."
              />
            </div>
          </div>
        );

      case 'nps':
        return (
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              NPS Scale
            </label>
            <div className="grid grid-cols-11 gap-1">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-dark-800 rounded-lg flex items-center justify-center text-dark-400"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        );

      case 'likert':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Statements
              </label>
              <div className="space-y-2">
                {(block.settings.statements || []).map((statement, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={statement}
                      onChange={(e) => {
                        const newStatements = [...(block.settings.statements || [])];
                        newStatements[index] = e.target.value;
                        handleSettingsChange('statements', newStatements);
                      }}
                      className="input-field flex-1"
                      placeholder="Enter a statement..."
                    />
                    <button
                      onClick={() => {
                        const newStatements = (block.settings.statements || []).filter((_, i) => i !== index);
                        handleSettingsChange('statements', newStatements);
                      }}
                      className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newStatements = [...(block.settings.statements || []), ''];
                    handleSettingsChange('statements', newStatements);
                  }}
                  className="w-full px-4 py-2 border border-dashed border-dark-700 rounded-lg text-dark-400 hover:text-white hover:border-dark-600"
                >
                  Add Statement
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Scale
              </label>
              <select
                value={block.settings.scale || 5}
                onChange={(e) => handleSettingsChange('scale', parseInt(e.target.value))}
                className="input-field"
              >
                <option value={5}>5-point scale</option>
                <option value={7}>7-point scale</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-dark-900 rounded-xl border border-dark-800">
      <div className="p-6 border-b border-dark-800">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg font-medium text-white">Edit Block</h2>
          <button className="text-dark-400 hover:text-white">
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Question Text
            </label>
            <input
              type="text"
              value={block.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="input-field"
              placeholder="Enter your question"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description (optional)
            </label>
            <textarea
              value={block.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className="input-field"
              rows={2}
              placeholder="Add a description..."
            />
          </div>

          {renderBlockSpecificFields()}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="required"
              checked={block.required || false}
              onChange={(e) => handleChange('required', e.target.checked)}
              className="rounded border-dark-700 text-accent-500 focus:ring-accent-500"
            />
            <label htmlFor="required" className="text-sm text-white">
              Required
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestBlockEditor;