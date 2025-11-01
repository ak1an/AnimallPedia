import { 
  Firestore, 
  CollectionReference, 
  DocumentReference, 
  Query, 
  onSnapshot, 
  enableIndexedDbPersistence, 
  FirestoreError,
  Unsubscribe
} from 'firebase/firestore';

/**
 * Safely initialize Firestore persistence
 * @param db - Firestore instance
 */
export const initializeFirestorePersistence = async (db: Firestore) => {
  try {
    // Only initialize persistence in browser environment
    if (typeof window !== 'undefined' && 'indexedDB' in window) {
      await enableIndexedDbPersistence(db);
      console.log('Firestore persistence enabled');
      return { success: true, error: null };
    }
    return { success: true, error: null };
  } catch (error) {
    const firestoreError = error as FirestoreError;
    if (firestoreError.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn('Firestore persistence failed: Multiple tabs open');
      return { success: false, error: 'multiple-tabs' };
    } else if (firestoreError.code === 'unimplemented') {
      // The current browser doesn't support persistence
      console.warn('Firestore persistence not supported in this browser');
      return { success: false, error: 'not-supported' };
    } else {
      console.error('Firestore persistence error:', error);
      return { success: false, error: 'unknown' };
    }
  }
};

/**
 * Create a safe subscription to a Firestore collection or query
 * @param query - Firestore collection or query to subscribe to
 * @param onNext - Callback function to handle updated data
 * @param onError - Callback function to handle errors
 * @returns Unsubscribe function
 */
export const createSafeCollectionSubscription = <T>(
  query: CollectionReference<T> | Query<T>,
  onNext: (data: T[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  // Track if component is still mounted
  let isMounted = true;
  
  const unsubscribe = onSnapshot(
    query,
    (snapshot) => {
      if (!isMounted) return;
      
      try {
        const data: T[] = [];
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data()
          } as T & { id: string });
        });
        
        if (isMounted) {
          onNext(data);
        }
      } catch (error) {
        if (isMounted && onError) {
          onError(error as Error);
        }
      }
    },
    (error) => {
      if (isMounted && onError) {
        onError(error);
      }
    }
  );
  
  // Return a wrapper unsubscribe function that also sets isMounted to false
  return () => {
    isMounted = false;
    unsubscribe();
  };
};

/**
 * Create a safe subscription to a Firestore document
 * @param docRef - Firestore document reference to subscribe to
 * @param onNext - Callback function to handle updated data
 * @param onError - Callback function to handle errors
 * @returns Unsubscribe function
 */
export const createSafeDocumentSubscription = <T>(
  docRef: DocumentReference<T>,
  onNext: (data: T | null) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  // Track if component is still mounted
  let isMounted = true;
  
  const unsubscribe = onSnapshot(
    docRef,
    (docSnapshot) => {
      if (!isMounted) return;
      
      try {
        if (docSnapshot.exists()) {
          const data = {
            id: docSnapshot.id,
            ...docSnapshot.data()
          } as T & { id: string };
          
          if (isMounted) {
            onNext(data);
          }
        } else {
          if (isMounted) {
            onNext(null);
          }
        }
      } catch (error) {
        if (isMounted && onError) {
          onError(error as Error);
        }
      }
    },
    (error) => {
      if (isMounted && onError) {
        onError(error);
      }
    }
  );
  
  // Return a wrapper unsubscribe function that also sets isMounted to false
  return () => {
    isMounted = false;
    unsubscribe();
  };
};

/**
 * Debounce function to prevent rapid re-subscriptions
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};