import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { WelcomeSection } from '../components/WelcomeSection';

/**
 * Example component demonstrating the WelcomeSection component
 */
const WelcomeSectionExample: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <WelcomeSection />
        
        {/* Additional content to show how it fits on a page */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              WelcomeSection Component Example
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              The WelcomeSection component above demonstrates:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2 mt-2">
              <li>Responsive design that works on mobile and desktop</li>
              <li>Dark/light mode support using Tailwind's dark: modifier</li>
              <li>Entrance animations for all elements</li>
              <li>Accessible navigation with React Router</li>
              <li>Modern, clean design with gradient background</li>
            </ul>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default WelcomeSectionExample;