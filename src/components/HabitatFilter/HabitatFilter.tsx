import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
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

const HabitatFilter: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [selectedHabitat, setSelectedHabitat] = useState<string>('Все');
  const [loading, setLoading] = useState(true);

  // Load all animals from JSON files
  useEffect(() => {
    const loadAnimals = async () => {
      try {
        setLoading(true);
        
        // Import all animal data files
        const mammals = await import('../../data/mammals.json');
        const birds = await import('../../data/birds.json');
        const reptiles = await import('../../data/reptiles.json');
        const amphibians = await import('../../data/amphibians.json');
        const fish = await import('../../data/fish.json');
        const insects = await import('../../data/insects.json');
        const extinct = await import('../../data/extinctAnimals.json');
        
        // Combine all animals
        const allAnimals: Animal[] = [
          ...mammals.default,
          ...birds.default,
          ...reptiles.default,
          ...amphibians.default,
          ...fish.default,
          ...insects.default,
          ...extinct.default
        ];
        
        setAnimals(allAnimals);
        
        // Check if there's a selected habitat from localStorage
        const storedHabitat = localStorage.getItem('selectedHabitat');
        if (storedHabitat) {
          setSelectedHabitat(storedHabitat);
          // Clear the stored habitat so it's not used again
          localStorage.removeItem('selectedHabitat');
        }
      } catch (error) {
        console.error('Error loading animals:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAnimals();
  }, []);

  // Generate unique habitats list with "Все" at the beginning
  const habitats = useMemo(() => {
    const list = Array.from(new Set(animals.map(a => a.habitat?.trim())));
    return ["Все", ...list];
  }, [animals]);

  // Handle habitat selection with useCallback for optimization
  const handleHabitatSelect = useCallback((habitat: string) => {
    setSelectedHabitat(habitat);
  }, []);

  // Filter animals using useMemo for optimization with exact case-insensitive matching
  const filteredAnimals = useMemo(() => {
    if (selectedHabitat === 'Все') return animals;
    return animals.filter(a =>
      a.habitat?.trim().toLowerCase() === selectedHabitat.trim().toLowerCase()
    );
  }, [animals, selectedHabitat]);

  // Animation variants for filter buttons
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring" as const, stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-blue-50 dark:from-gray-900 dark:to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Загрузка животных...</p>
          </div>
          
          {/* Skeleton loader for filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="px-5 py-3 rounded-full bg-gray-200 dark:bg-gray-700 w-24 h-12 animate-pulse"></div>
            ))}
          </div>
          
          {/* Skeleton loader for animal grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-700 h-48 w-full"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-blue-50 dark:from-gray-900 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Фильтр животных по среде обитания
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Выберите среду обитания, чтобы увидеть животных, которые там живут
          </p>
        </motion.div>

        {/* Habitat Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {habitats.map((habitat) => (
            <motion.button
              key={habitat}
              onClick={() => handleHabitatSelect(habitat)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-md ${
                selectedHabitat === habitat
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {habitat}
            </motion.button>
          ))}
        </motion.div>

        {/* Results count */}
        <motion.div 
          className="mb-6 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Найдено животных: <span className="font-bold text-green-600 dark:text-green-400">{filteredAnimals.length}</span>
          </p>
        </motion.div>

        {/* Animal Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filteredAnimals.map((animal, index) => (
            <motion.div
              key={animal.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-full">
                <AnimalCard animal={animal} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAnimals.length === 0 && (
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
              <button
                onClick={() => handleHabitatSelect('Все')}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
              >
                Показать всех животных
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HabitatFilter;