import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logo from './Logo';

/**
 * Test suite for the Logo component
 */
describe('Logo Component', () => {
  test('renders the logo with correct text', () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    
    // Check if the logo text is rendered
    expect(screen.getByText('AnimalPedia')).toBeInTheDocument();
  });

  test('logo links to the homepage', () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    
    // Check if the logo is a link to the homepage
    const logoLink = screen.getByRole('link');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});