import { create } from 'zustand';
import { Question, QuestionType, DifficultyLevel } from '../types';
import { supabase } from '../lib/supabase';

interface QuestionState {
  questions: Question[];
  loading: boolean;
  error: string | null;
  createQuestion: (question: Omit<Question, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateQuestion: (id: string, updates: Partial<Question>) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  fetchQuestions: () => Promise<void>;
  subscribeToChanges: () => void;
  unsubscribeFromChanges: () => void;
}

export const useQuestionStore = create<QuestionState>((set, get) => {
  let subscription: any = null;

  return {
    questions: [],
    loading: false,
    error: null,

    createQuestion: async (question) => {
      try {
        const { data, error } = await supabase
          .from('questions')
          .insert([question])
          .select()
          .single();

        if (error) throw error;

        set(state => ({
          questions: [...state.questions, data]
        }));
      } catch (error: any) {
        set({ error: error.message });
        throw error;
      }
    },

    updateQuestion: async (id, updates) => {
      try {
        const { data, error } = await supabase
          .from('questions')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;

        set(state => ({
          questions: state.questions.map(q => q.id === id ? data : q)
        }));
      } catch (error: any) {
        set({ error: error.message });
        throw error;
      }
    },

    deleteQuestion: async (id) => {
      try {
        const { error } = await supabase
          .from('questions')
          .delete()
          .eq('id', id);

        if (error) throw error;

        set(state => ({
          questions: state.questions.filter(q => q.id !== id)
        }));
      } catch (error: any) {
        set({ error: error.message });
        throw error;
      }
    },

    fetchQuestions: async () => {
      set({ loading: true, error: null });
      try {
        const { data, error } = await supabase
          .from('questions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        set({ questions: data, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

    subscribeToChanges: () => {
      subscription = supabase
        .channel('questions_changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'questions' },
          (payload) => {
            const { questions } = get();
            
            switch (payload.eventType) {
              case 'INSERT':
                set({ questions: [payload.new, ...questions] });
                break;
              case 'UPDATE':
                set({
                  questions: questions.map(q => 
                    q.id === payload.new.id ? payload.new : q
                  )
                });
                break;
              case 'DELETE':
                set({
                  questions: questions.filter(q => q.id !== payload.old.id)
                });
                break;
            }
          }
        )
        .subscribe();
    },

    unsubscribeFromChanges: () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    }
  };
});