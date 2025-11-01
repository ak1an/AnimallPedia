import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimalCard from '../Categories/AnimalCard';

// Define the animal interface
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
  redBook?: boolean;
}

interface AnimalGridProps {
  animals: Animal[];
  selectedHabitat: string;
}

const AnimalGrid: React.FC<AnimalGridProps> = ({ animals, selectedHabitat }) => {
  // Animation variants for animal cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="w-full">
      {/* Results count */}
      <motion.div 
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Найдено животных: <span className="font-bold text-green-600 dark:text-green-400">{animals.length}</span>
        </p>
      </motion.div>

      {/* Animal grid */}
      {animals.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {animals.map((animal) => (
              <motion.div
                key={animal.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-full">
                  <AnimalCard animal={animal} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        // Empty state
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-auto border border-gray-100 dark:border-gray-700">
            <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Животные не найдены</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Попробуйте выбрать другую среду обитания
            </p>
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-medium">
                Сбросить фильтр
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AnimalGrid;