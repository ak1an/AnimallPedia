import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { RootState } from '../../store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import AnimalCard from '../Categories/AnimalCard';
import mammalsData from '../../data/mammals.json';
import birdsData from '../../data/birds.json';
import reptilesData from '../../data/reptiles.json';
import amphibiansData from '../../data/amphibians.json';
import fishData from '../../data/fish.json';
import insectsData from '../../data/insects.json';

// Define the animal item type
interface AnimalItem {
  id: string;
  name: string;
  category: string;
  habitat: string;
  photo: string;
  short: string;
  details: string;
  isFavorite: boolean;
  redBook?: boolean;
  likeCount?: number;
  diet?: string;
  sleep?: string;
  facts?: string[];
}

/**
 * PopularAnimals component for AnimalPedia homepage
 * Displays a grid of popular animals based on likes count
 */
const PopularAnimals: React.FC = () => {
  const [user] = useAuthState(auth);
  const reduxUser = useSelector((state: RootState) => state.user);
  const [animals, setAnimals] = useState<AnimalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  // Combine all animal data
  const allAnimals = [
    ...mammalsData,
    ...birdsData,
    ...reptilesData,
    ...amphibiansData,
    ...fishData,
    ...insectsData
  ];

  // Create a map of all animals for quick lookup
  const animalsMap: Record<string, any> = {};
  allAnimals.forEach((animal: any) => {
    animalsMap[animal.id] = animal;
  });

  // Fetch popular animals from Firestore
  useEffect(() => {
    isMountedRef.current = true;
    
    // Set up real-time listener for users collection
    const unsubscribe = onSnapshot(collection(db, 'users'), (usersSnapshot) => {
      // Check if component is still mounted
      if (!isMountedRef.current) return;
      
      try {
        console.log('Users snapshot updated, fetching popular animals...');
        
        // Count how many users have liked each animal
        const likeCounts: Record<string, number> = {};
        
        usersSnapshot.forEach((userDoc) => {
          const userData = userDoc.data();
          const likedAnimals = userData.likedAnimals || [];
          
          likedAnimals.forEach((animalId: string) => {
            // Check if the animal exists in our local animals data
            if (animalsMap[animalId]) {
              if (!likeCounts[animalId]) {
                likeCounts[animalId] = 0;
              }
              likeCounts[animalId]++;
            }
          });
        });
        
        console.log('Like counts calculated:', likeCounts);
        
        // Convert to array and sort by like count
        const popularAnimals: any[] = [];
        for (const [animalId, likeCount] of Object.entries(likeCounts)) {
          // Only include animals with at least one like
          if (likeCount > 0 && animalsMap[animalId]) {
            popularAnimals.push({
              ...animalsMap[animalId],
              likeCount
            });
          }
        }
        
        // Sort by like count in descending order
        popularAnimals.sort((a, b) => b.likeCount - a.likeCount);
        
        console.log('Sorted popular animals:', popularAnimals);
        
        // Get top 5 animals
        const topAnimals = popularAnimals.slice(0, 5);
        
        console.log('Top 5 animals:', topAnimals);
        
        // If user is authenticated, update favorite status based on their favorites
        if (reduxUser.isAuthenticated) {
          const updatedAnimals = topAnimals.map((animal: any) => ({
            ...animal,
            isFavorite: reduxUser.favoriteAnimals.includes(animal.id)
          }));
          
          // Only update state if component is still mounted
          if (isMountedRef.current) {
            setAnimals(updatedAnimals);
          }
        } else {
          // Set default favorite status to false for unauthenticated users
          const updatedAnimals = topAnimals.map((animal: any) => ({
            ...animal,
            isFavorite: false
          }));
          
          // Only update state if component is still mounted
          if (isMountedRef.current) {
            setAnimals(updatedAnimals);
          }
        }
      } catch (error) {
        console.error('Error fetching popular animals:', error);
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    }, (error) => {
      // Error handler for the subscription
      console.error('Firestore subscription error:', error);
      if (isMountedRef.current) {
        setLoading(false);
      }
    });

    // Clean up listener on unmount
    return () => {
      isMountedRef.current = false;
      unsubscribe();
    };
  }, [reduxUser]);

  if (loading) {
    return (
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Популярные животные</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((item) => (
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

  // If no animals have likes, show a message
  if (animals.length === 0) {
    return (
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Популярные животные</h2>
          </div>
          
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Пока нет популярных животных 😿 Станьте первым, кто поставит лайк!
            </p>
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {animals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularAnimals;