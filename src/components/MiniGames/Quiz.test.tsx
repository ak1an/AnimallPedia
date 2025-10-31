import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Quiz from './Quiz';

// Mock Firebase functions
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

jest.mock('../../firebase/config', () => ({
  db: {},
  auth: {
    currentUser: { uid: 'test-user-id' }
  }
}));

// Mock quizUtils
jest.mock('./quizUtils', () => ({
  selectRandomQuestions: jest.fn(() => [
    {
      id: 1,
      question: 'Test question 1',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 0,
      hint: 'Test hint'
    },
    {
      id: 2,
      question: 'Test question 2',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 1,
      hint: 'Test hint'
    }
  ]),
  isAnswerCorrect: jest.fn((question, selectedOption) => selectedOption === question.correctAnswer),
  calculatePercentage: jest.fn(() => 50)
}));

/**
 * Test suite for the Quiz component
 */
describe('Quiz Component', () => {
  test('renders the quiz preview', () => {
    render(
      <Provider store={store}>
        <Quiz />
      </Provider>
    );
    
    // Check if the main heading is rendered
    expect(screen.getByText('Викторина по животным')).toBeInTheDocument();
    
    // Check if the start button is rendered
    expect(screen.getByRole('button', { name: 'Начать викторину' })).toBeInTheDocument();
  });
});