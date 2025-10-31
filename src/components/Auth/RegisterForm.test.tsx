import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import RegisterForm from './RegisterForm';

// Mock the onSwitchToLogin function
const mockOnSwitchToLogin = jest.fn();

/**
 * Test suite for the RegisterForm component
 */
describe('RegisterForm Component', () => {
  test('renders the registration form', () => {
    render(
      <Provider store={store}>
        <RegisterForm onSwitchToLogin={mockOnSwitchToLogin} />
      </Provider>
    );
    
    // Check if the main heading is rendered
    expect(screen.getByText('Создать аккаунт')).toBeInTheDocument();
    
    // Check if form fields are rendered
    expect(screen.getByLabelText('Имя')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByLabelText('Подтвердите пароль')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Уже есть аккаунт? Войти' })).toBeInTheDocument();
  });
});