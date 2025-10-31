import { mapAuthError } from './authErrors';

describe('Auth Error Mapping', () => {
  test('should map user not found error', () => {
    const result = mapAuthError('auth/user-not-found');
    expect(result).toBe('Пользователь с таким email не найден.');
  });

  test('should map wrong password error', () => {
    const result = mapAuthError('auth/wrong-password');
    expect(result).toBe('Вы ввели неправильный пароль.');
  });

  test('should map email already in use error', () => {
    const result = mapAuthError('auth/email-already-in-use');
    expect(result).toBe('Этот email уже зарегистрирован.');
  });

  test('should map invalid email error', () => {
    const result = mapAuthError('auth/invalid-email');
    expect(result).toBe('Неверный формат email.');
  });

  test('should map weak password error', () => {
    const result = mapAuthError('auth/weak-password');
    expect(result).toBe('Пароль слишком простой (минимум 6 символов).');
  });

  test('should return default message for unknown error codes', () => {
    const result = mapAuthError('auth/unknown-error');
    expect(result).toBe('Произошла ошибка авторизации. Попробуйте снова.');
  });

  test('should return default message for undefined error code', () => {
    const result = mapAuthError(undefined);
    expect(result).toBe('Произошла ошибка авторизации. Попробуйте снова.');
  });
});