import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { Favorites } from './index';

/**
 * Test suite for the Favorites component
 */
describe('Favorites Component', () => {
  test('renders the favorites heading', () => {
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );
    
    // Check if the main heading is rendered
    expect(screen.getByText('Избранное')).toBeInTheDocument();
  });
});