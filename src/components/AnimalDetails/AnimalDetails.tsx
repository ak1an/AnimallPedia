import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';
import { auth } from '../../firebase/config';
import { addRecentlyViewedAnimal } from '../../firebase/userOperations';

// Define the Animal interface
interface Animal {
  id: string | number;
  name: string;
  category: string;
  habitat: string;
  photo: string;
  short?: string;
  details?: string;
  description?: string;
  diet?: string;
  sleep?: string;
  facts?: string[];
}

// Import data files
import mammalsData from '../../data/mammals.json';
import birdsData from '../../data/birds.json';
import reptilesData from '../../data/reptiles.json';
import amphibiansData from '../../data/amphibians.json';
import fishData from '../../data/fish.json';
import insectsData from '../../data/insects.json';
import extinctAnimalsData from '../../data/extinctAnimals.json';

const AnimalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user] = useAuthState(auth);
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to add animal to recent list in Firestore
  const addToRecent = async (animal: Animal) => {
    if (user) {
      try {
        // Add to Firestore
        await addRecentlyViewedAnimal(user.uid, {
          id: animal.id.toString(),
          name: animal.name,
          category: animal.category,
          habitat: animal.habitat,
          photo: animal.photo,
          short: animal.short || '',
          details: animal.details || ''
        });
      } catch (error) {
        console.error("Error saving to Firestore:", error);
        // Fallback to localStorage
        try {
          const saved = localStorage.getItem("recentAnimals");
          let recentAnimals: Animal[] = saved ? JSON.parse(saved) : [];
          
          // Remove duplicates
          const filtered = recentAnimals.filter(a => a.id !== animal.id.toString());
          
          // Add current animal to the beginning
          const updated = [
            {
              id: animal.id.toString(),
              name: animal.name,
              category: animal.category,
              habitat: animal.habitat,
              photo: animal.photo,
              short: animal.short || '',
              details: animal.details || ''
            },
            ...filtered
          ].slice(0, 5); // Keep only the last 5 animals
          
          // Save to localStorage
          localStorage.setItem("recentAnimals", JSON.stringify(updated));
        } catch (localStorageError) {
          console.error("Error saving to localStorage:", localStorageError);
        }
      }
    } else {
      // If not authenticated, use localStorage
      try {
        const saved = localStorage.getItem("recentAnimals");
        let recentAnimals: Animal[] = saved ? JSON.parse(saved) : [];
        
        // Remove duplicates
        const filtered = recentAnimals.filter(a => a.id !== animal.id.toString());
        
        // Add current animal to the beginning
        const updated = [
          {
            id: animal.id.toString(),
            name: animal.name,
            category: animal.category,
            habitat: animal.habitat,
            photo: animal.photo,
            short: animal.short || '',
            details: animal.details || ''
          },
          ...filtered
        ].slice(0, 5); // Keep only the last 5 animals
        
        // Save to localStorage
        localStorage.setItem("recentAnimals", JSON.stringify(updated));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  };

  useEffect(() => {
    // Find animal by ID across all data files
    const allAnimals = [
      ...mammalsData,
      ...birdsData,
      ...reptilesData,
      ...amphibiansData,
      ...fishData,
      ...insectsData,
      ...extinctAnimalsData
    ];
    
    const foundAnimal = allAnimals.find((animal) => 
      animal.id.toString() === id
    );
    
    if (foundAnimal) {
      setAnimal(foundAnimal);
      // Add animal to recently viewed list
      addToRecent(foundAnimal);
    }
    
    setLoading(false);
  }, [id, user]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Here you would typically dispatch an action to Redux store
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Here you would typically dispatch an action to Redux store
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Загрузка информации о животном...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Животное не найдено</h1>
            <p className="text-gray-600 dark:text-gray-400">
              К сожалению, информация о животном с ID "{id}" не найдена.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Use either short or description as the main description
  const animalDescription = animal.details || animal.description || animal.short || "Описание отсутствует";

  // Function to get category name in Russian
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'mammals': return 'Млекопитающие';
      case 'birds': return 'Птицы';
      case 'reptiles': return 'Рептилии';
      case 'amphibians': return 'Амфибии';
      case 'fish': return 'Рыбы';
      case 'insects': return 'Насекомые';
      case 'extinctAnimals': return 'Вымершие животные';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Animal Header */}
          <div className="relative">
            <img 
              src={animal.photo} 
              alt={animal.name} 
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-4xl font-bold text-white">{animal.name}</h1>
              <p className="text-xl text-gray-200">{animal.habitat}</p>
            </div>
          </div>

          {/* Animal Details */}
          <div className="p-6">
            <div className="flex flex-wrap justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Описание</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">{animalDescription}</p>
              </div>
              
              <div className="flex space-x-3 mt-4 md:mt-0">
                <button 
                  onClick={handleLike}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-200 transform hover:scale-110"
                  aria-label={isLiked ? "Убрать лайк" : "Поставить лайк"}
                >
                  {isLiked ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-500 dark:text-gray-400 text-xl" />
                  )}
                </button>
                
                <button 
                  onClick={handleFavorite}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-yellow-100 dark:hover:bg-yellow-900 transition-all duration-200 transform hover:scale-110"
                  aria-label={isFavorited ? "Убрать из избранного" : "Добавить в избранное"}
                >
                  {isFavorited ? (
                    <FaStar className="text-yellow-500 text-xl" />
                  ) : (
                    <FaRegStar className="text-gray-500 dark:text-gray-400 text-xl" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Habitat */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Место обитания
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{animal.habitat}</p>
              </div>

              {/* Diet */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Рацион
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{animal.diet || "Информация отсутствует"}</p>
              </div>

              {/* Sleep */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Сон
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{animal.sleep || "Информация отсутствует"}</p>
              </div>

              {/* Category */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Категория
                </h3>
                <p className="text-gray-600 dark:text-gray-300 capitalize">
                  {getCategoryName(animal.category)}
                </p>
              </div>
            </div>

            {/* Interesting Facts */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-amber-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Интересные факты
              </h3>
              {animal.facts && animal.facts.length > 0 ? (
                <ul className="space-y-3">
                  {animal.facts.map((fact, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{fact}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">Интересные факты отсутствуют</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;