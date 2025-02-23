// Add caching
const cachedQuestions = new Map();

const fetchQuestions = async () => {
  if (cachedQuestions.has('all')) {
    return cachedQuestions.get('all');
  }

  const data = await safeSupabaseQuery(
    supabase.from('questions').select('*')
  );

  cachedQuestions.set('all', data);
  return data;
};
