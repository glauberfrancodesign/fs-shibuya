import React, { useEffect } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useQuestionStore } from '../store/questionStore';
import { Question } from '../types';

interface QuestionListProps {
  onEdit: (question: Question) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ onEdit }) => {
  const { questions, loading, error, fetchQuestions, deleteQuestion, subscribeToChanges, unsubscribeFromChanges } = useQuestionStore();

  useEffect(() => {
    fetchQuestions();
    subscribeToChanges();
    return () => unsubscribeFromChanges();
  }, [fetchQuestions, subscribeToChanges, unsubscribeFromChanges]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'hard': return 'text-red-500 bg-red-500/10';
      default: return 'text-dark-400 bg-dark-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div
          key={question.id}
          className="bg-dark-900 rounded-xl border border-dark-800 p-4 hover:border-dark-700 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white font-medium mb-2">
                {question.question_text}
              </h3>
              <div className="flex items-center gap-3 text-sm">
                <span className={`px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </span>
                <span className="text-dark-400">
                  {question.points} point{question.points !== 1 && 's'}
                </span>
                <span className="text-dark-400">
                  {question.question_type.replace('_', ' ')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(question)}
                className="p-2 text-dark-400 hover:text-white rounded-lg hover:bg-dark-800"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this question?')) {
                    deleteQuestion(question.id);
                  }
                }}
                className="p-2 text-dark-400 hover:text-red-500 rounded-lg hover:bg-dark-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {question.question_type === 'multiple_choice' && question.options && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-dark-800 rounded-lg text-dark-400 text-sm"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {questions.length === 0 && (
        <div className="text-center py-12 text-dark-400">
          No questions yet. Create your first question to get started.
        </div>
      )}
    </div>
  );
};

export default QuestionList;