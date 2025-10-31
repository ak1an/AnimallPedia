import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import AnimalCard from './AnimalCard';

const RecentlyViewedBlock: React.FC = () => {
  const recentlyViewedAnimals = useSelector((state: RootState) => state.recentlyViewed.animals);

  // Don't render the block if there are no recently viewed animals
  if (recentlyViewedAnimals.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Недавно просмотренные животные</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide">
          {recentlyViewedAnimals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedBlock;