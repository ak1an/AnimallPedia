import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { setUser } from '../../store/slices/userSlice';
import { RootState } from '../../store';
import { RegisterForm } from './index';
import { LoginForm } from './index';
import { UserProfile } from './index';

const AuthWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Check if the authenticated user matches the document owner
            if (auth.currentUser && auth.currentUser.uid === user.uid) {
              // Update last login time in Firestore using updateDoc for security
              await updateDoc(doc(db, 'users', user.uid), {
                lastLogin: serverTimestamp()
              });
            }
            
            // Prepare user data for Redux store
            const updatedUserData = {
              uid: user.uid,
              name: userData.name || user.displayName || 'Пользователь',
              email: userData.email || user.email || '',
              avatarUrl: userData.avatarUrl || user.photoURL || 'https://firebasestorage.googleapis.com/v0/b/animallpedia.appspot.com/o/default-avatar.png?alt=media',
              favoriteAnimals: userData.favoriteAnimals || [],
              registrationDate: userData.registrationDate || new Date().toISOString(),
              lastLogin: new Date().toISOString()
            };
            
            // Dispatch to Redux store
            dispatch(setUser(updatedUserData));
          } else {
            // If user document doesn't exist in Firestore, create minimal user data
            const minimalUserData = {
              uid: user.uid,
              name: user.displayName || 'Пользователь',
              email: user.email || '',
              avatarUrl: user.photoURL || '',
              favoriteAnimals: [],
              registrationDate: new Date().toISOString(),
              lastLogin: new Date().toISOString()
            };
            
            // Dispatch to Redux store
            dispatch(setUser(minimalUserData));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <UserProfile />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {authView === 'login' ? (
        <LoginForm onSwitchToRegister={() => setAuthView('register')} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setAuthView('login')} />
      )}
    </div>
  );
};

export default AuthWrapper;