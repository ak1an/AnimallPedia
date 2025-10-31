import React from 'react';
import { render, screen } from '@testing-library/react';
import Leaderboard from './Leaderboard';

/**
 * Test suite for the Leaderboard component
 */
describe('Leaderboard Component', () => {
  test('renders the leaderboard heading', () => {
    render(<Leaderboard />);
    
    // Check if the main heading is rendered
    expect(screen.getByText('Список лидеров')).toBeInTheDocument();
  });
});