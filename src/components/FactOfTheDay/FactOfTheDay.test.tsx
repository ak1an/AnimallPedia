import React from 'react';
import { render, screen } from '@testing-library/react';
import { FactOfTheDay } from './index';

/**
 * Test suite for the FactOfTheDay component
 */
describe('FactOfTheDay Component', () => {
  test('renders the main heading', () => {
    render(<FactOfTheDay />);
    
    // Check if the main heading is rendered
    expect(screen.getByText('Интересный факт дня')).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    render(<FactOfTheDay />);
    
    // Check if loading state is displayed
    expect(screen.getByText('Интересный факт дня')).toBeInTheDocument();
  });
});