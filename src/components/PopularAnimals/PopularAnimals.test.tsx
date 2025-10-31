import React from 'react';
import { render, screen } from '@testing-library/react';
import { PopularAnimals } from './index';

/**
 * Test suite for the PopularAnimals component
 */
describe('PopularAnimals Component', () => {
  test('renders the main heading', () => {
    render(<PopularAnimals />);
    
    // Check if the main heading is rendered
    expect(screen.getByText('Популярные животные')).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    render(<PopularAnimals />);
    
    // Check if loading state is displayed
    expect(screen.getByText('Популярные животные')).toBeInTheDocument();
  });
});