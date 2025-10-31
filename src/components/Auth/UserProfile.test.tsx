import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import UserProfile from './UserProfile';

/**
 * Test suite for the UserProfile component
 */
describe('UserProfile Component', () => {
  test('renders the user profile', () => {
    render(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    );
    
    // Check if the main heading is rendered
    expect(screen.getByText('Профиль пользователя')).toBeInTheDocument();
    
    // Check if tabs are rendered
    expect(screen.getByRole('button', { name: 'Профиль' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Любимые питомцы' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Список лидеров' })).toBeInTheDocument();
    
    // Check if logout button is rendered
    expect(screen.getByRole('button', { name: 'Выйти' })).toBeInTheDocument();
  });
});