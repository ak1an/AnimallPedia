import { doc, updateDoc, getDoc, arrayUnion, arrayRemove, collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from './config';

/**
 * Like an animal
 * @param animalId - The ID of the animal to like
 * @param userId - The ID of the user who is liking the animal
 * @returns Promise<boolean> - True if liked, false if unliked
 */
export const toggleAnimalLike = async (animalId: string, userId: string): Promise<boolean> => {
  try {
    // Reference to the user document
    const userDocRef = doc(db, 'users', userId);
    
    // Get current user data to check if animal is already liked
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const likedAnimals = userData.likedAnimals || [];
      
      // Check if animal is already liked
      const isAlreadyLiked = likedAnimals.includes(animalId);
      
      if (isAlreadyLiked) {
        // Remove from user's liked animals
        await updateDoc(userDocRef, {
          likedAnimals: arrayRemove(animalId)
        });
        
        return false; // Unliked
      } else {
        // Add to user's liked animals
        await updateDoc(userDocRef, {
          likedAnimals: arrayUnion(animalId)
        });
        
        return true; // Liked
      }
    } else {
      // User document doesn't exist, create it with the animal as liked
      await updateDoc(userDocRef, {
        likedAnimals: arrayUnion(animalId)
      });
      
      return true; // Liked
    }
  } catch (error) {
    console.error('Error toggling animal like:', error);
    throw error;
  }
};

/**
 * Check if an animal is liked by a user
 * @param animalId - The ID of the animal
 * @param userId - The ID of the user
 * @returns Promise<boolean> - True if liked, false otherwise
 */
export const isAnimalLiked = async (animalId: string, userId: string): Promise<boolean> => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const likedAnimals = userData.likedAnimals || [];
      return likedAnimals.includes(animalId);
    }
    
    return false;
  } catch (error) {
    console.error('Error checking if animal is liked:', error);
    return false;
  }
};

/**
 * Get the top N liked animals based on how many users have liked them
 * @param limitCount - The number of animals to retrieve
 * @returns Promise<any[]> - Array of popular animals with like counts
 */
export const getPopularAnimals = async (limitCount: number = 10): Promise<any[]> => {
  try {
    // Get all animals
    const animalsCollection = collection(db, 'animals');
    const animalsSnapshot = await getDocs(animalsCollection);
    
    // Create a map to store animal data
    const animalsMap: Record<string, any> = {};
    animalsSnapshot.forEach((doc) => {
      animalsMap[doc.id] = {
        id: doc.id,
        ...doc.data()
      };
    });
    
    // Get all users
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    
    // Count how many users have liked each animal
    const likeCounts: Record<string, number> = {};
    
    usersSnapshot.forEach((userDoc) => {
      const userData = userDoc.data();
      const likedAnimals = userData.likedAnimals || [];
      
      likedAnimals.forEach((animalId: string) => {
        if (!likeCounts[animalId]) {
          likeCounts[animalId] = 0;
        }
        likeCounts[animalId]++;
      });
    });
    
    // Convert to array and sort by like count
    const popularAnimals: any[] = [];
    for (const [animalId, likeCount] of Object.entries(likeCounts)) {
      if (animalsMap[animalId]) {
        popularAnimals.push({
          ...animalsMap[animalId],
          likeCount
        });
      }
    }
    
    // Sort by like count in descending order
    popularAnimals.sort((a, b) => b.likeCount - a.likeCount);
    
    // Return top N animals
    return popularAnimals.slice(0, limitCount);
  } catch (error) {
    console.error('Error getting popular animals:', error);
    throw error;
  }
};

/**
 * Count how many users have liked a specific animal
 * @param animalId - The ID of the animal to count likes for
 * @returns Promise<number> - The number of users who have liked the animal
 */
export const getAnimalLikeCount = async (animalId: string): Promise<number> => {
  try {
    // Query users who have liked this animal
    const q = query(collection(db, 'users'), where('likedAnimals', 'array-contains', animalId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting animal like count:', error);
    return 0;
  }
};