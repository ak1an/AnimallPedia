import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import logos
import MammalsLogo from '../Category/logos/MammalsLogo';
import BirdsLogo from '../Category/logos/BirdsLogo';
import ReptilesLogo from '../Category/logos/ReptilesLogo';
import AmphibiansLogo from '../Category/logos/AmphibiansLogo';
import InsectsLogo from '../Category/logos/InsectsLogo';
import ExtinctLogo from '../Category/logos/ExtinctLogo';
import FishLogo from '../Category/logos/FishLogo';

interface Category {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  bgColor: string;
}

interface CategoryBlockProps {
  category: Category;
  isSelected: boolean;
  onSelect: (categoryId: string) => void;
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({ category, isSelected, onSelect }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    onSelect(category.id);
    navigate(`/category/${category.id}`);
  };

  // Map category IDs to logo components
  const getLogoComponent = () => {
    switch (category.id) {
      case 'mammals': return MammalsLogo;
      case 'birds': return BirdsLogo;
      case 'reptiles': return ReptilesLogo;
      case 'amphibians': return AmphibiansLogo;
      case 'fish': return FishLogo;
      case 'insects': return InsectsLogo;
      case 'extinct': return ExtinctLogo;
      default: return MammalsLogo;
    }
  };

  const LogoComponent = getLogoComponent();

  return (
    <motion.div 
      onClick={handleClick}
      className={`relative overflow-hidden rounded-3xl shadow-lg cursor-pointer border border-white/30 dark:border-gray-700/50 ${
        isSelected ? 'ring-4 ring-green-500' : ''
      }`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className={`bg-gradient-to-br ${category.bgColor} p-8 h-full flex flex-col items-center justify-center transition-all duration-300 hover:brightness-105`}>
        <motion.div 
          className="mb-6"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <LogoComponent className="w-20 h-20" />
        </motion.div>
        <motion.h3 
          className="text-2xl font-bold text-gray-800 dark:text-white text-center"
          whileHover={{ color: "#111827" }}
          transition={{ duration: 0.2 }}
        >
          {category.name}
        </motion.h3>
      </div>
    </motion.div>
  );
};

export default CategoryBlock;