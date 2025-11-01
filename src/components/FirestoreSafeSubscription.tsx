import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  where,
  enableIndexedDbPersistence,
  FirestoreError
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Define types for our data
interface Animal {
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
}

interface User {
  uid: string;
  name: string;
  email: string;
  avatarUrl: string;
  favoriteAnimals: string[];
}

// Initialize Firestore persistence safely
const initializePersistence = async () => {
  try {
    // Only initialize persistence in browser environment
    if (typeof window !== 'undefined' && 'indexedDB' in window) {
      await enableIndexedDbPersistence(db);
      console.log('Firestore persistence enabled');
    }
  } catch (error) {
    const firestoreError = error as FirestoreError;
    if (firestoreError.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn('Firestore persistence failed: Multiple tabs open');
    } else if (firestoreError.code === 'unimplemented') {
      // The current browser doesn't support persistence
      console.warn('Firestore persistence not supported in this browser');
    } else {
      console.error('Firestore persistence error:', error);
    }
  }
};

// Initialize persistence when the module loads
initializePersistence();

// Safe Firestore subscription hook
const useFirestoreSubscription = <T,>(
  subscribe: () => () => void,
  deps: React.DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    // Clean up previous subscription if it exists
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    // Reset state when dependencies change
    setLoading(true);
    setError(null);

    try {
      // Create new subscription
      unsubscribeRef.current = subscribe();
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Failed to subscribe to data');
      setLoading(false);
    }

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, deps);

  // Wrapper function to update state safely
  const safeSetData = useCallback((newData: T) => {
    if (isMountedRef.current) {
      setData(newData);
      setLoading(false);
    }
  }, []);

  const safeSetError = useCallback((errorMessage: string) => {
    if (isMountedRef.current) {
      setError(errorMessage);
      setLoading(false);
    }
  }, []);

  return { data, loading, error, setData: safeSetData, setError: safeSetError };
};

// Example component using safe Firestore subscriptions
const FirestoreSafeSubscriptionExample: React.FC = () => {
  // Subscribe to animals collection
  const {
    data: animals,
    loading: animalsLoading,
    error: animalsError
  } = useFirestoreSubscription<Animal[]>(
    () => {
      const q = query(
        collection(db, 'animals'),
        orderBy('name')
      );
      
      return onSnapshot(
        q,
        (snapshot) => {
          const animalsData: Animal[] = [];
          snapshot.forEach((doc) => {
            animalsData.push({
              id: doc.id,
              ...(doc.data() as Omit<Animal, 'id'>)
            });
          });
          console.log('Animals updated:', animalsData);
        },
        (error) => {
          console.error('Animals subscription error:', error);
        }
      );
    },
    [] // No dependencies, so this only runs once
  );

  // Subscribe to a specific user document
  const [userId, setUserId] = useState<string>('user123');
  const {
    data: userData,
    loading: userLoading,
    error: userError
  } = useFirestoreSubscription<User>(
    () => {
      // Return unsubscribe function
      return onSnapshot(
        doc(db, 'users', userId),
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData: User = {
              uid: docSnapshot.id,
              ...(docSnapshot.data() as Omit<User, 'uid'>)
            };
            console.log('User updated:', userData);
          } else {
            console.log('User document does not exist');
          }
        },
        (error) => {
          console.error('User subscription error:', error);
        }
      );
    },
    [userId] // Re-subscribe when userId changes
  );

  // Subscribe to favorite animals for a user
  const {
    data: favoriteAnimals,
    loading: favoritesLoading,
    error: favoritesError
  } = useFirestoreSubscription<Animal[]>(
    () => {
      if (!userId) {
        return () => {}; // No-op if no userId
      }

      const q = query(
        collection(db, 'animals'),
        where('likedBy', 'array-contains', userId)
      );
      
      return onSnapshot(
        q,
        (snapshot) => {
          const favoritesData: Animal[] = [];
          snapshot.forEach((doc) => {
            favoritesData.push({
              id: doc.id,
              ...(doc.data() as Omit<Animal, 'id'>)
            });
          });
          console.log('Favorites updated:', favoritesData);
        },
        (error) => {
          console.error('Favorites subscription error:', error);
        }
      );
    },
    [userId] // Re-subscribe when userId changes
  );

  // Handle user ID change
  const handleUserIdChange = (newUserId: string) => {
    setUserId(newUserId);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Safe Firestore Subscription Example</h1>
      
      {/* User ID Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          User ID:
        </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => handleUserIdChange(e.target.value)}
          className="border rounded px-3 py-2 w-64"
          placeholder="Enter user ID"
        />
      </div>

      {/* Animals Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Animals</h2>
        {animalsLoading && <p>Loading animals...</p>}
        {animalsError && <p className="text-red-500">Error: {animalsError}</p>}
        {animals && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {animals.map((animal) => (
              <div key={animal.id} className="border rounded p-4">
                <h3 className="font-bold">{animal.name}</h3>
                <p>Category: {animal.category}</p>
                <p>Habitat: {animal.habitat}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User Data</h2>
        {userLoading && <p>Loading user...</p>}
        {userError && <p className="text-red-500">Error: {userError}</p>}
        {userData && (
          <div className="border rounded p-4">
            <h3 className="font-bold">{userData.name}</h3>
            <p>Email: {userData.email}</p>
            <p>UID: {userData.uid}</p>
          </div>
        )}
      </div>

      {/* Favorites Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Favorite Animals</h2>
        {favoritesLoading && <p>Loading favorites...</p>}
        {favoritesError && <p className="text-red-500">Error: {favoritesError}</p>}
        {favoriteAnimals && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteAnimals.length > 0 ? (
              favoriteAnimals.map((animal) => (
                <div key={animal.id} className="border rounded p-4">
                  <h3 className="font-bold">{animal.name}</h3>
                  <p>Category: {animal.category}</p>
                </div>
              ))
            ) : (
              <p>No favorite animals found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FirestoreSafeSubscriptionExample;