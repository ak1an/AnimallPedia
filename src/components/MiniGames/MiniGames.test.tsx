import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { MiniGames } from './index';

/**
 * Test suite for the MiniGames component
 */
describe('MiniGames Component', () => {
  test('renders the mini games tabs', () => {
    render(
      <Provider store={store}>
        <MiniGames />
      </Provider>
    );
    
    // Check if the main heading is rendered
    expect(screen.getByText('Мини-игры AnimalPedia')).toBeInTheDocument();
    
    // Check if tabs are rendered
    expect(screen.getByRole('button', { name: 'Викторина' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Миниквест' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Список лидеров' })).toBeInTheDocument();
  });
});