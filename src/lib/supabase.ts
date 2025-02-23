// Add API wrapper with consistent error handling
export const safeSupabaseQuery = async (query: Promise<any>) => {
  try {
    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Supabase error:', error);
    throw new Error('Database operation failed');
  }
};
