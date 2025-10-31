import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import LoginForm from './LoginForm';

// Mock the onSwitchToRegister function
const mockOnSwitchToRegister = jest.fn();

/**
 * Test suite for the LoginForm component
 */
describe('LoginForm Component', () => {
  test('renders the login form', () => {
    render(
      <Provider store={store}>
        <LoginForm onSwitchToRegister={mockOnSwitchToRegister} />
      </Provider>
    );
    
    // Check if the main heading is rendered
    expect(screen.getByText('Вход в аккаунт')).toBeInTheDocument();
    
    // Check if form fields are rendered
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Google' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Нет аккаунта? Зарегистрироваться' })).toBeInTheDocument();
  });
});