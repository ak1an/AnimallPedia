import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WelcomeSection } from './index';

/**
 * Test suite for the WelcomeSection component
 */
describe('WelcomeSection Component', () => {
  test('renders the main heading', () => {
    render(
      <BrowserRouter>
        <WelcomeSection />
      </BrowserRouter>
    );
    
    // Check if the main heading is rendered
    expect(screen.getByText('Добро пожаловать в AnimalPedia')).toBeInTheDocument();
  });

  test('renders the subtitle', () => {
    render(
      <BrowserRouter>
        <WelcomeSection />
      </BrowserRouter>
    );
    
    // Check if the subtitle is rendered
    expect(screen.getByText('Изучайте животных, узнавайте интересные факты и следите за редкими видами')).toBeInTheDocument();
  });

  test('renders the call-to-action button', () => {
    render(
      <BrowserRouter>
        <WelcomeSection />
      </BrowserRouter>
    );
    
    // Check if the button is rendered
    const button = screen.getByText('Начать изучать');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/categories');
  });
});