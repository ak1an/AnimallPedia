import React from 'react';
import { Favorites } from '../components/Favorites';

/**
 * Example component demonstrating the Favorites component
 */
const FavoritesExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Избранное AnimalPedia</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Пример использования компонента избранного
          </p>
        </div>
        
        <Favorites />
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Особенности системы избранного</h2>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Добавление животных в избранное с помощью кнопки ❤️</li>
            <li>Сохранение избранных животных в Firestore для авторизованных пользователей</li>
            <li>Отображение избранных животных на отдельной странице</li>
            <li>Синхронизация между Redux store и Firestore</li>
            <li>Поддержка темной и светлой темы</li>
            <li>Адаптивный дизайн для мобильных и десктопов</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FavoritesExample;