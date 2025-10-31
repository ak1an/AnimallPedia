import quizQuestions from './quizQuestions.json';
import { getRandomQuestions } from './utils/questions';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

/**
 * Selects a random set of questions from the quiz questions pool
 * @param count Number of questions to select
 * @returns Array of randomly selected questions
 */
export const selectRandomQuestions = (count: number): QuizQuestion[] => {
  return getRandomQuestions(quizQuestions, count);
};

/**
 * Checks if the selected answer is correct
 * @param question The question object
 * @param selectedOption Index of the selected option
 * @returns Boolean indicating if the answer is correct
 */
export const isAnswerCorrect = (question: QuizQuestion, selectedOption: number): boolean => {
  return question.correctAnswer === selectedOption;
};

/**
 * Calculates the percentage score
 * @param correctAnswers Number of correct answers
 * @param totalQuestions Total number of questions
 * @returns Percentage score
 */
export const calculatePercentage = (correctAnswers: number, totalQuestions: number): number => {
  return Math.round((correctAnswers / totalQuestions) * 100);
};

export default quizQuestions;