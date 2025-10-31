import React from 'react';
import AuthWrapper from '../components/Auth/AuthWrapper';

/**
 * Example component demonstrating the authentication system
 */
const AuthExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Система авторизации AnimalPedia</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Пример использования компонентов регистрации, входа и профиля пользователя
          </p>
        </div>
        
        <AuthWrapper />
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Особенности системы</h2>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Регистрация и вход по email/паролю</li>
            <li>Вход через Google аккаунт</li>
            <li>Валидация форм на фронтенде</li>
            <li>Хранение данных пользователя в Firestore и Redux</li>
            <li>Редактирование профиля (имя, аватар)</li>
            <li>Избранные животные</li>
            <li>Список лидеров по результатам викторин</li>
            <li>Поддержка темной и светлой темы</li>
            <li>Адаптивный дизайн для мобильных и десктопов</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthExample;