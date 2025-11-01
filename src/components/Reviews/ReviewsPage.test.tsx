import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import ReviewsPage from './ReviewsPage';

// Mock Firebase hooks
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null]
}));

// Mock Firebase functions
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  onSnapshot: jest.fn(() => jest.fn()),
  query: jest.fn(),
  orderBy: jest.fn(),
  serverTimestamp: jest.fn()
}));

jest.mock('../../firebase/config', () => ({
  db: {},
  auth: {}
}));

/**
 * Test suite for the ReviewsPage component
 */
describe('ReviewsPage Component', () => {
  test('renders the reviews page heading', () => {
    render(
      <Provider store={store}>
        <ReviewsPage />
      </Provider>
    );
    
    // Check if the main heading is rendered
    expect(screen.getByText('Отзывы пользователей')).toBeInTheDocument();
  });

  test('renders login prompt when user is not authenticated', () => {
    render(
      <Provider store={store}>
        <ReviewsPage />
      </Provider>
    );
    
    // Check if login prompt is rendered
    expect(screen.getByText('Войдите, чтобы оставить отзыв')).toBeInTheDocument();
  });
});