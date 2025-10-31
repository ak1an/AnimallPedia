import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Animal {
  id: string;
  name: string;
  category: string;
  habitat: string;
  photo: string;
  short: string;
  details: string;
  diet?: string;
  sleep?: string;
  facts?: string[];
  redBook?: boolean; // Red Book status
}

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    // Here you would typically dispatch an action to Redux store
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    // Here you would typically dispatch an action to Redux store
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700"
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative overflow-hidden">
        <motion.img 
          src={animal.photo} 
          alt={animal.name} 
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        {animal.redBook && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            Красная книга
          </div>
        )}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 flex items-end p-4"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white text-sm line-clamp-2">{animal.short}</p>
        </motion.div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <motion.h3 
          className="text-xl font-bold text-gray-900 dark:text-white mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {animal.name}
        </motion.h3>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex-grow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-medium">Среда обитания:</span> {animal.habitat}
        </motion.p>
        
        <motion.div 
          className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex space-x-2">
            <motion.button 
              onClick={handleLike}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
              aria-label={isLiked ? "Убрать лайк" : "Поставить лайк"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500 dark:text-gray-400" />
              )}
            </motion.button>
            
            <motion.button 
              onClick={handleFavorite}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all duration-200"
              aria-label={isFavorited ? "Убрать из избранного" : "Добавить в избранное"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isFavorited ? (
                <FaStar className="text-yellow-500" />
              ) : (
                <FaRegStar className="text-gray-500 dark:text-gray-400" />
              )}
            </motion.button>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to={`/animal/${animal.id}`}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg block"
            >
              Подробнее
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimalCard;