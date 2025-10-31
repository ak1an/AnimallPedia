import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import MiniQuest from './MiniQuest';

/**
 * Test suite for the MiniQuest component
 */
describe('MiniQuest Component', () => {
  test('renders the mini quest preview', () => {
    render(
      <Provider store={store}>
        <MiniQuest />
      </Provider>
    );
    
    // Check if the main heading is rendered
    expect(screen.getByText('Миниквесты AnimalPedia')).toBeInTheDocument();
    
    // Check if the start button is rendered
    expect(screen.getByRole('button', { name: 'Начать миниквест' })).toBeInTheDocument();
  });
});