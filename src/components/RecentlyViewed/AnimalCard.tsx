import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Animal {
  id: string;
  name: string;
  category: string;
  habitat: string;
  photo: string;
  short: string;
  details: string;
  redBook?: boolean; // Red Book status
}

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <motion.div 
      className="rounded-2xl shadow-xl bg-white hover:scale-105 transition-all duration-300 flex flex-col h-full"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="relative">
        <img 
          src={animal.photo} 
          alt={animal.name} 
          className="h-48 w-full object-cover rounded-t-2xl"
        />
        {animal.redBook && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            Красная книга
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{animal.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">{animal.short}</p>
        <Link 
          to={`/animal/${animal.id}`}
          className="mt-3 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium"
        >
          Подробнее →
        </Link>
      </div>
    </motion.div>
  );
};

export default AnimalCard;