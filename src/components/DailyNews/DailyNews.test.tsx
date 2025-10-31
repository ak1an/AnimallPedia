import React from 'react';
import { render, screen } from '@testing-library/react';
import { DailyNews } from './index';

/**
 * Test suite for the DailyNews component
 */
describe('DailyNews Component', () => {
  test('renders the main heading', () => {
    render(<DailyNews />);
    
    // Check if the main heading is rendered
    expect(screen.getByText('Новости дня')).toBeInTheDocument();
  });

  test('renders the subtitle', () => {
    render(<DailyNews />);
    
    // Check if the subtitle is rendered
    expect(screen.getByText('Последние события из мира животных и природы')).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    render(<DailyNews />);
    
    // Check if loading state is displayed
    expect(screen.getByText('Загрузка новостей...')).toBeInTheDocument();
  });
});