import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Translator from './Translator';

/**
 * Test suite for the Translator component
 */
describe('Translator Component', () => {
  test('renders the translator button', () => {
    render(
      <Provider store={store}>
        <Translator />
      </Provider>
    );
    
    // Check if the translator button is rendered
    expect(screen.getByLabelText('Select language')).toBeInTheDocument();
  });

  test('shows language options when clicked', () => {
    render(
      <Provider store={store}>
        <Translator />
      </Provider>
    );
    
    // Click the translator button
    const button = screen.getByLabelText('Select language');
    button.click();
    
    // Check if language options are displayed
    expect(screen.getByText('Русский')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Кыргызча')).toBeInTheDocument();
  });
});