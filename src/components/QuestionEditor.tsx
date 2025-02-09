import React, { useState, useEffect } from 'react';
import { AlertCircle, Save, Trash2 } from 'lucide-react';
import { Question, QuestionType, DifficultyLevel } from '../types';
import { useQuestionStore } from '../store/questionStore';

interface QuestionEditorProps {
  question?: Question;
  onClose: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onClose }) => {
  const createQuestion = useQuestionStore(state => state.createQuestion);
  const updateQuestion = useQuestionStore(state => state.updateQuestion);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Question>>({
    question_text: '',
    question_type: 'multiple_choice',
    options: [''],
    points: 1,
    difficulty: 'medium'
  });

  useEffect(() => {
    if (question) {
      setFormData(question);
    }
  }, [question]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.question_text) {
        throw new Error('Question text is required');
      }

      if (formData.question_type === 'multiple_choice' && 
          (!formData.options || formData.options.length === 0)) {
        throw new Error('Multiple choice questions require at least one option');
      }

      if (question?.id) {
        await updateQuestion(question.id, formData);
      } else {
        await createQuestion(formData as Required<Omit<Question, 'id' | 'created_at' | 'updated_at'>>);
      }

      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(formData.options || [])];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...(formData.options || []), '']
    });
  };

  const removeOption = (index: number) => {
    const newOptions = formData.options?.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <div className="bg-dark-900 rounded-xl border border-dark-800 overflow-hidden">
      <form onSubmit={handleSubmit}>
        <div className="p-6 border-b border-dark-800">
          <h2 className="text-lg font-medium text-white mb-6">
            {question ? 'Edit Question' : 'Create New Question'}
          </h2>

          <div className="space-y-6">
            {/* Question Text */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Question Text *
              </label>
              <textarea
                value={formData.question_text}
                onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Enter your question"
                rows={3}
                required
              />
            </div>

            {/* Question Type */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Question Type
              </label>
              <select
                value={formData.question_type}
                onChange={(e) => setFormData({ ...formData, question_type: e.target.value as QuestionType })}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="text">Text</option>
                <option value="numeric">Numeric</option>
              </select>
            </div>

            {/* Multiple Choice Options */}
            {formData.question_type === 'multiple_choice' && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Answer Options
                </label>
                <div className="space-y-2">
                  {formData.options?.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1 bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
                        placeholder={`Option ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addOption}
                    className="w-full px-4 py-2 border border-dashed border-dark-700 rounded-lg text-dark-400 hover:text-white hover:border-dark-600"
                  >
                    Add Option
                  </button>
                </div>
              </div>
            )}

            {/* Points */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Points
              </label>
              <input
                type="number"
                min="1"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Difficulty Level
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as DifficultyLevel })}
                className="w-full bg-dark-800 border border-dark-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-dark-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-glow px-4 py-2 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Saving...' : 'Save Question'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionEditor;