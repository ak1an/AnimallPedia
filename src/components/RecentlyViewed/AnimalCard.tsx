import React from 'react';

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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full min-w-[250px]">
      <div className="relative">
        <img 
          src={animal.photo} 
          alt={animal.name} 
          className="w-full h-48 object-cover"
        />
        {animal.redBook && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            Красная книга
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{animal.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">{animal.habitat}</p>
      </div>
    </div>
  );
};

export default AnimalCard;