import React from 'react';
import { MiniGames } from '../components/MiniGames';

/**
 * Example component demonstrating the MiniGames component
 */
const MiniGamesExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Мини-игры AnimalPedia</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Пример использования компонентов викторины, миниквестов и списка лидеров
          </p>
        </div>
        
        <MiniGames />
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Особенности системы</h2>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Викторина с 50 вопросами и случайным выбором 12 вопросов</li>
            <li>Таймер 10 секунд на вопрос</li>
            <li>Миниквесты с различными типами заданий</li>
            <li>Список лидеров с результатами викторин</li>
            <li>Сохранение результатов в Firestore для авторизованных пользователей</li>
            <li>Поддержка темной и светлой темы</li>
            <li>Адаптивный дизайн для мобильных и десктопов</li>
            <li>Плавные анимации и переходы</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MiniGamesExample;