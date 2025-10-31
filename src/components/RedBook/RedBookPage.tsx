import React, { useState, useEffect } from 'react';
import { motion, Transition } from 'framer-motion';
import AnimalCard from '../Categories/AnimalCard';

// Define animal interface
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

const RedBookPage: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all animals and filter Red Book animals
  useEffect(() => {
    const loadRedBookAnimals = async () => {
      try {
        setLoading(true);
        setError(null);
        
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
        
        // Filter animals that are in the Red Book
        const redBookAnimals = allAnimals.filter(animal => animal.redBook === true);
        
        setAnimals(redBookAnimals);
      } catch (err) {
        console.error('Error loading Red Book animals:', err);
        setError('Ошибка загрузки данных Красной книги');
      } finally {
        setLoading(false);
      }
    };
    
    loadRedBookAnimals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Загрузка животных из Красной книги...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Ошибка</h1>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Animation variants for animal cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-amber-50 dark:from-gray-900 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <motion.div 
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-12 text-center border border-white/20 dark:border-gray-700/50"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 } as Transition}
        >
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 } as Transition}
          >
            <div className="bg-red-500 w-24 h-24 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 } as Transition}
          >
            Красная книга
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 } as Transition}
          >
            {animals.length} животных, находящихся под угрозой исчезновения
          </motion.p>
        </motion.div>

        {/* Animal Grid */}
        {animals.length > 0 ? (
          <motion.div 
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {animals.map((animal: Animal, index) => (
                <motion.div
                  key={animal.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 * index } as Transition}
                >
                  <AnimalCard animal={animal} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 text-center border border-white/20 dark:border-gray-700/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 } as Transition}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Животные не найдены</h2>
            <p className="text-gray-600 dark:text-gray-400">
              В Красной книге пока нет животных в нашей базе данных.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RedBookPage;