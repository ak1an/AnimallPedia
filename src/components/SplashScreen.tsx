import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Set timeout to start fade out after 3 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
      
      // Set timeout to completely hide after fade out animation
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        onFinish();
      }, 500); // Match this to the duration of the fade-out animation
      
      return () => clearTimeout(hideTimer);
    }, 3000); // 3 seconds before starting fade out
    
    return () => clearTimeout(fadeOutTimer);
  }, [onFinish]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center">
        <img 
          src="/logo.png" 
          alt="Animalpedia Logo" 
          className="w-32 h-32 md:w-40 md:h-40 mb-6 animate-fadeInScale"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white text-center mb-2 animate-fadeInUp shadow-md">
          Добро пожаловать в Animalpedia
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center animate-fadeInUp delay-150">
          Здесь вы узнаете много интересного о животных
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;