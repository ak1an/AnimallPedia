import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db } from './config';

// Define the Animal interface
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

/**
 * Toggle favorite status of an animal for a user
 * @param userId - The ID of the user
 * @param animal - The animal to toggle favorite status for
 * @returns Promise<boolean> - True if animal was added to favorites, false if removed
 */
export const toggleFavoriteAnimal = async (userId: string, animal: Animal): Promise<boolean> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    
    // Get current user data to check if animal is already favorited
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const favoriteAnimals = userData.favoriteAnimals || [];
      
      // Check if animal is already in favorites
      const isAlreadyFavorited = favoriteAnimals.some((favAnimal: any) => 
        favAnimal.id === animal.id
      );
      
      if (isAlreadyFavorited) {
        // Remove from favorites
        await updateDoc(userDocRef, {
          favoriteAnimals: arrayRemove(animal)
        });
        return false; // Removed from favorites
      } else {
        // Add to favorites
        await updateDoc(userDocRef, {
          favoriteAnimals: arrayUnion(animal)
        });
        return true; // Added to favorites
      }
    } else {
      // User document doesn't exist, create it with the animal as favorite
      await updateDoc(userDocRef, {
        favoriteAnimals: arrayUnion(animal)
      });
      return true; // Added to favorites
    }
  } catch (error) {
    console.error('Error toggling favorite animal:', error);
    throw error;
  }
};

/**
 * Add an animal to the recently viewed list for a user
 * @param userId - The ID of the user
 * @param animal - The animal to add to recently viewed
 */
export const addRecentlyViewedAnimal = async (userId: string, animal: Animal): Promise<void> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    
    // Get current user data to check existing recently viewed animals
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      let recentAnimals = userData.recentAnimals || [];
      
      // Remove duplicates
      recentAnimals = recentAnimals.filter((recentAnimal: any) => 
        recentAnimal.id !== animal.id
      );
      
      // Add current animal to the beginning
      recentAnimals.unshift(animal);
      
      // Keep only the last 5 animals
      if (recentAnimals.length > 5) {
        recentAnimals = recentAnimals.slice(0, 5);
      }
      
      // Update Firestore
      await updateDoc(userDocRef, {
        recentAnimals: recentAnimals
      });
    } else {
      // User document doesn't exist, create it with the animal as recently viewed
      await updateDoc(userDocRef, {
        recentAnimals: [animal]
      });
    }
  } catch (error) {
    console.error('Error adding recently viewed animal:', error);
    throw error;
  }
};

/**
 * Get favorite animals for a user
 * @param userId - The ID of the user
 * @returns Promise<Animal[]> - Array of favorite animals
 */
export const getFavoriteAnimals = async (userId: string): Promise<Animal[]> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.favoriteAnimals || [];
    }
    
    return [];
  } catch (error) {
    console.error('Error getting favorite animals:', error);
    throw error;
  }
};

/**
 * Get recently viewed animals for a user
 * @param userId - The ID of the user
 * @returns Promise<Animal[]> - Array of recently viewed animals
 */
export const getRecentlyViewedAnimals = async (userId: string): Promise<Animal[]> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.recentAnimals || [];
    }
    
    return [];
  } catch (error) {
    console.error('Error getting recently viewed animals:', error);
    throw error;
  }
};