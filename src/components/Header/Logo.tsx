import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Logo component for AnimalPedia
 * Returns user to the homepage when clicked
 */
const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="bg-blue-500 dark:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-xl">A</span>
      </div>
      <span className="text-xl font-bold text-gray-800 dark:text-white">AnimalPedia</span>
    </Link>
  );
};

export default Logo;