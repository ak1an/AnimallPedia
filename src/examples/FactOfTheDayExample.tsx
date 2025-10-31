import React from 'react';
import { FactOfTheDay } from '../components/FactOfTheDay';

/**
 * Example component demonstrating the FactOfTheDay component
 */
const FactOfTheDayExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <FactOfTheDay />
      
      {/* Additional content to show how it fits on a page */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            FactOfTheDay Component Example
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The FactOfTheDay component above demonstrates:
          </p>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2 mt-2">
            <li>Responsive design that works on mobile and desktop</li>
            <li>Dark/light mode support using Tailwind's dark: modifier</li>
            <li>Loading states with skeleton screens</li>
            <li>Entrance animations for image and text</li>
            <li>Automatic date updates for facts</li>
            <li>Easy integration with external APIs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FactOfTheDayExample;