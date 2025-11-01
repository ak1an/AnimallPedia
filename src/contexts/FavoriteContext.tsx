import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { getFavoriteAnimals } from '../firebase/userOperations';

interface Animal {
  id: string;
  name: string;
  category: string;
  habitat: string;
  photo: string;
  short: string;
  details: string;
  redBook?: boolean;
}

interface FavoriteContextType {
  favoriteAnimals: Animal[];
  loading: boolean;
  refreshFavorites: () => Promise<void>;
  isFavorite: (animalId: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useAuthState(auth);
  const [favoriteAnimals, setFavoriteAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshFavorites = async () => {
    if (user) {
      try {
        setLoading(true);
        const animals = await getFavoriteAnimals(user.uid);
        setFavoriteAnimals(animals);
      } catch (error) {
        console.error('Error refreshing favorites:', error);
        setFavoriteAnimals([]);
      } finally {
        setLoading(false);
      }
    } else {
      setFavoriteAnimals([]);
      setLoading(false);
    }
  };

  const isFavorite = (animalId: string): boolean => {
    return favoriteAnimals.some(animal => animal.id === animalId);
  };

  useEffect(() => {
    refreshFavorites();
  }, [user]);

  return (
    <FavoriteContext.Provider value={{ favoriteAnimals, loading, refreshFavorites, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = (): FavoriteContextType => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};