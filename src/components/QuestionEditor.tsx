// Add validation
const validateQuestion = (question: Partial<Question>) => {
  if (!question.question_text?.trim()) {
    throw new Error('Question text is required');
  }
  if (question.question_type === 'multiple_choice' && 
      (!question.options || question.options.length < 2)) {
    throw new Error('At least two options are required');
  }
};
