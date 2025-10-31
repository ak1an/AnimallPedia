import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';

/**
 * Example component demonstrating Firebase integration
 * Shows how to use Firebase Authentication and Firestore in AnimalPedia
 */
const FirebaseExample: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch animals from Firestore
  const fetchAnimals = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'animals'));
      const animalsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAnimals(animalsData);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };

  // Sign in anonymously
  const handleSignIn = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // Add a new animal to Firestore
  const handleAddAnimal = async () => {
    try {
      await addDoc(collection(db, 'animals'), {
        name: 'New Animal',
        habitat: 'Unknown',
        createdAt: new Date()
      });
      // Refresh the list
      fetchAnimals();
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-800 dark:text-white">Loading Firebase...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Firebase Integration Example</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Authentication</h2>
          
          {user ? (
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Signed in as: <span className="font-medium">{user.uid}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Anonymous: <span className="font-medium">{user.isAnonymous ? 'Yes' : 'No'}</span>
              </p>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Sign In Anonymously
            </button>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Firestore Data</h2>
            <button
              onClick={handleAddAnimal}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Add Animal
            </button>
          </div>
          
          <button
            onClick={fetchAnimals}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors mb-4"
          >
            Fetch Animals
          </button>
          
          <div className="mt-4">
            {animals.length > 0 ? (
              <ul className="space-y-2">
                {animals.map((animal) => (
                  <li 
                    key={animal.id} 
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
                  >
                    {animal.name} - {animal.habitat}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No animals found. Click "Fetch Animals" to load data.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseExample;