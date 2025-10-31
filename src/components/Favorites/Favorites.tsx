import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { RootState } from '../../store';

// Define the animal item type
interface AnimalItem {
  id: string;
  name: string;
  habitat: string;
  imageUrl: string;
}

const Favorites: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [animals, setAnimals] = useState<AnimalItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch favorite animals from Firestore
  const fetchFavoriteAnimals = async (): Promise<AnimalItem[]> => {
    if (!user.isAuthenticated || !user.uid) {
      return [];
    }

    try {
      // Get user's favorite animal IDs
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        return [];
      }
      
      const userData = userDoc.data();
      const favoriteAnimalIds = userData.favoriteAnimals || [];
      
      // Fetch animal details from Firestore collection 'animals'
      if (favoriteAnimalIds.length > 0) {
        // Get all animals from the animals collection
        const animalsSnapshot = await getDocs(collection(db, 'animals'));
        const allAnimals: AnimalItem[] = [];
        
        animalsSnapshot.forEach((doc) => {
          allAnimals.push({
            id: doc.id,
            ...(doc.data() as Omit<AnimalItem, 'id'>)
          });
        });
        
        // Filter animals to only include favorites
        const favoriteAnimals = allAnimals.filter(animal => 
          favoriteAnimalIds.includes(animal.id)
        );
        
        return favoriteAnimals;
      }
      
      return [];
    } catch (error) {
      console.error("Failed to load favorite animals:", error);
      return [];
    }
  };

  // Effect to load favorite animals when user changes
  useEffect(() => {
    const loadFavoriteAnimals = async () => {
      try {
        setLoading(true);
        if (user.isAuthenticated) {
          const favoriteAnimals = await fetchFavoriteAnimals();
          setAnimals(favoriteAnimals);
        } else {
          setAnimals([]);
        }
      } catch (error) {
        console.error("Failed to load favorite animals:", error);
        setAnimals([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteAnimals();
  }, [user]);

  if (!user.isAuthenticated) {
    return (
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Избранное</h2>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Авторизуйтесь для просмотра избранного</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Чтобы просматривать избранные животные, пожалуйста, войдите в свой аккаунт.
            </p>
            <a 
              href="/login" 
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Войти
            </a>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Избранное</h2>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (animals.length === 0) {
    return (
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Избранное</h2>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-xl shadow-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Список избранного пуст</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Добавьте животных в избранное, чтобы увидеть их здесь.
            </p>
            <a 
              href="/games" 
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Перейти к животным
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Избранное</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Ваши любимые животные
          </p>
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
                
                <div className="flex justify-end">
                  <button 
                    className="p-2 rounded-full transition-colors text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30"
                    aria-label="В избранном"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
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

export default Favorites;