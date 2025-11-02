import React from 'react';
import { FaBook, FaGamepad, FaNewspaper, FaLeaf } from 'react-icons/fa';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  // Map feature icons to react-icons
  const getFeatureIcon = (icon: string) => {
    switch (icon) {
      case "📚":
        return <FaBook className="text-4xl mb-4 text-center" />;
      case "🎮":
        return <FaGamepad className="text-4xl mb-4 text-center" />;
      case "📰":
        return <FaNewspaper className="text-4xl mb-4 text-center" />;
      case "🌍":
        return <FaLeaf className="text-4xl mb-4 text-center" />;
      default:
        return <FaBook className="text-4xl mb-4 text-center" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full">
      <div>{getFeatureIcon(feature.icon)}</div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 text-center">{feature.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 flex-grow">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;