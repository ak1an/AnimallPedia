import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doc, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { addFavoriteAnimal, removeFavoriteAnimal } from '../../store/slices/userSlice';
import { RootState } from '../../store';

// Define the animal item type
interface AnimalItem {
  id: number;
  name: string;
  habitat: string;
  imageUrl: string;
  isLiked: boolean;
  isFavorite: boolean;
}

/**
 * PopularAnimals component for AnimalPedia homepage
 * Displays a grid of popular animals with like and favorite functionality
 */
const PopularAnimals: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [animals, setAnimals] = useState<AnimalItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock popular animals data - in a real app, this would come from an API
  const mockAnimalsData: AnimalItem[] = [
    {
      id: 1,
      name: "Африканский слон",
      habitat: "Саванны Африки",
      imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      isLiked: false,
      isFavorite: false
    },
    {
      id: 2,
      name: "Панда",
      habitat: "Бамбуковые леса Китая",
      imageUrl: "https://images.unsplash.com/photo-1524380453100-2b5c6c7c6b7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      isLiked: false,
      isFavorite: false
    },
    {
      id: 3,
      name: "Белый медведь",
      habitat: "Арктика",
      imageUrl: "https://images.unsplash.com/photo-1548439752-228c4f04c050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      isLiked: false,
      isFavorite: false
    },
    {
      id: 4,
      name: "Тигр",
      habitat: "Джунгли Азии",
      imageUrl: "https://images.unsplash.com/photo-1551641932-78a3df9434d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      isLiked: false,
      isFavorite: false
    },
    {
      id: 5,
      name: "Горилла",
      habitat: "Горные леса Африки",
      imageUrl: "https://images.unsplash.com/photo-1548677649-0c2b0d3b1e4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      isLiked: false,
      isFavorite: false
    },
    {
      id: 6,
      name: "Коала",
      habitat: "Эвкалиптовые леса Австралии",
      imageUrl: "https://images.unsplash.com/photo-1544778169-347f7d20aa3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      isLiked: false,
      isFavorite: false
    },
    {
      id: 7,
      name: "Лев",
      habitat: "Саванны Африки",
      imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      isLiked: false,
      isFavorite: false
    },
    {
      id: 8,
      name: "Жираф",
      habitat: "Саванны Африки",
      imageUrl: "https://images.unsplash.com/photo-1545388286-761095c9f8f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      isLiked: false,
      isFavorite: false
    }
  ];

  // Function to simulate fetching popular animals from an API
  const fetchPopularAnimals = async (): Promise<AnimalItem[]> => {
    // In a real implementation, this would be an API call:
    // const response = await fetch('https://api.animalpedia.com/popular-animals');
    // const data = await response.json();
    // return data;
    
    // For now, we'll use mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAnimalsData);
      }, 500); // Simulate network delay
    });
  };

  // Effect to load animals on component mount
  useEffect(() => {
    const loadAnimals = async () => {
      try {
        setLoading(true);
        const animalsData = await fetchPopularAnimals();
        
        // If user is authenticated, update favorite status based on their favorites
        if (user.isAuthenticated) {
          const updatedAnimals = animalsData.map(animal => ({
            ...animal,
            isFavorite: user.favoriteAnimals.includes(animal.id.toString())
          }));
          setAnimals(updatedAnimals);
        } else {
          setAnimals(animalsData);
        }
      } catch (error) {
        console.error("Failed to load animals:", error);
        // Fallback to mock data if API fails
        setAnimals(mockAnimalsData);
      } finally {
        setLoading(false);
      }
    };

    loadAnimals();
  }, [user]);

  // Handle liking an animal
  const handleLike = (id: number) => {
    setAnimals(animals.map(animal => 
      animal.id === id ? { ...animal, isLiked: !animal.isLiked } : animal
    ));
  };

  // Handle adding/removing from favorites
  const handleFavorite = async (id: number) => {
    // Check if user is authenticated
    if (!user.isAuthenticated) {
      alert('Авторизуйтесь, чтобы добавлять в избранное');
      return;
    }
    
    try {
      const animalId = id.toString();
      const userDocRef = doc(db, 'users', user.uid!);
      
      // Find the current animal
      const animal = animals.find(a => a.id === id);
      if (!animal) return;
      
      // Toggle favorite status
      const newFavoriteStatus = !animal.isFavorite;
      
      // Update Firestore
      if (newFavoriteStatus) {
        // Add to favorites
        await updateDoc(userDocRef, {
          favoriteAnimals: arrayUnion(animalId)
        });
        // Update Redux store
        dispatch(addFavoriteAnimal(animalId));
      } else {
        // Remove from favorites
        await updateDoc(userDocRef, {
          favoriteAnimals: arrayRemove(animalId)
        });
        // Update Redux store
        dispatch(removeFavoriteAnimal(animalId));
      }
      
      // Update local state
      setAnimals(animals.map(animal => 
        animal.id === id ? { ...animal, isFavorite: newFavoriteStatus } : animal
      ));
    } catch (error) {
      console.error('Error updating favorites:', error);
      alert('Ошибка при обновлении избранного');
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Популярные животные</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div 
                key={item} 
                className="bg-gradient-to-br from-green-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="bg-gray-300 dark:bg-gray-700 h-48 w-full"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Популярные животные</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {animals.map((animal) => (
            <div 
              key={animal.id}
              className="bg-gradient-to-br from-green-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="relative">
                <img 
                  src={animal.imageUrl} 
                  alt={animal.name} 
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{animal.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">{animal.habitat}</p>
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => handleLike(animal.id)}
                    className={`p-2 rounded-full transition-colors ${
                      animal.isLiked 
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/30' 
                        : 'text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
                    }`}
                    aria-label={animal.isLiked ? "Убрать лайк" : "Поставить лайк"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={animal.isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={() => handleFavorite(animal.id)}
                    className={`p-2 rounded-full transition-colors ${
                      animal.isFavorite 
                        ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30' 
                        : 'text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/30'
                    }`}
                    aria-label={animal.isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={animal.isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularAnimals;