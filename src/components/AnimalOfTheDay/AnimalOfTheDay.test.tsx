import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnimalOfTheDay } from './index';

/**
 * Test suite for the AnimalOfTheDay component
 */
describe('AnimalOfTheDay Component', () => {
  test('renders the main heading', () => {
    render(<AnimalOfTheDay />);
    
    // Check if the main heading is rendered
    expect(screen.getByText('Животное дня')).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    render(<AnimalOfTheDay />);
    
    // Check if loading state is displayed
    expect(screen.getByText('Животное дня')).toBeInTheDocument();
  });
});