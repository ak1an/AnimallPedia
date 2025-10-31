import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * WelcomeSection component for AnimalPedia homepage
 * Displays a welcoming message with a call-to-action button
 */
const WelcomeSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        {/* Animated heading */}
        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-white transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          Добро пожаловать в AnimalPedia
        </h1>
        
        {/* Animated subtitle */}
        <p 
          className={`text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 ease-out delay-150 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          Изучайте животных, узнавайте интересные факты и следите за редкими видами
        </p>
        
        {/* Animated button */}
        <Link 
          to="/categories"
          className={`inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transform transition-all duration-500 ease-out delay-300 ${
            isVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-6 scale-95'
          } hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        >
          Начать изучать
        </Link>
      </div>
    </section>
  );
};

export default WelcomeSection;