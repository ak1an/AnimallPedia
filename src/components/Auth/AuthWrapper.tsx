import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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
            // Update last login time
            const updatedUserData = {
              uid: user.uid,
              name: userData.name,
              email: userData.email,
              avatarUrl: userData.avatarUrl,
              favoriteAnimals: userData.favoriteAnimals || [],
              registrationDate: userData.registrationDate,
              lastLogin: new Date().toISOString()
            };
            
            // Dispatch to Redux store
            dispatch(setUser(updatedUserData));
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