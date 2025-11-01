import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { clearUser, updateProfile } from '../../store/slices/userSlice';
import { RootState } from '../../store';
import { getFavoriteAnimals, toggleFavoriteAnimal } from '../../firebase/userOperations';
import { updateAvatar } from './utils/authFunctions'; // Import the new function
import AnimalCard from '../Categories/AnimalCard';

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

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites'>('profile');
  const [name, setName] = useState(user.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [favoriteAnimals, setFavoriteAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load favorite animals from Firestore
  useEffect(() => {
    const loadData = async () => {
      if (!user.uid) return;
      
      try {
        setLoading(true);
        const animals = await getFavoriteAnimals(user.uid);
        setFavoriteAnimals(animals);
      } catch (err) {
        console.error('Error loading favorite animals:', err);
        setError('Ошибка при загрузке избранных животных');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [user.uid]);

  const handleSaveProfile = async () => {
    if (!user.uid) return;
    
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      // Update avatar in Firestore using the new function
      if (avatarUrl !== user.avatarUrl) {
        await updateAvatar(avatarUrl);
      }
      
      // Update name in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        name
      });
      
      // Update Redux store
      dispatch(updateProfile({ name, avatarUrl }));
      
      setSuccess('Профиль успешно обновлен!');
      setIsEditing(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Ошибка при обновлении профиля');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (err: any) {
      console.error('Error signing out:', err);
      setError(err.message || 'Ошибка при выходе');
    }
  };

  const handleRemoveFavorite = async (animalId: string) => {
    if (!user.uid) return;
    
    try {
      // Toggle favorite status to remove it
      const animalToRemove = favoriteAnimals.find(animal => animal.id === animalId);
      if (animalToRemove) {
        await toggleFavoriteAnimal(user.uid, animalToRemove);
        
        // Update local state
        setFavoriteAnimals(prev => prev.filter(animal => animal.id !== animalId));
      }
    } catch (err: any) {
      console.error('Error removing favorite:', err);
      setError(err.message || 'Ошибка при удалении из избранного');
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Не указана';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Профиль пользователя</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Выйти
          </button>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 mb-6 animate-fade-in">
            <div className="text-sm text-red-700 dark:text-red-200">
              {error}
            </div>
          </div>
        )}
        
        {success && (
          <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-4 mb-6 animate-fade-in">
            <div className="text-sm text-green-700 dark:text-green-200">
              {success}
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Профиль
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'favorites'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Любимые животные
            </button>
          </nav>
        </div>
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="Avatar" 
                    className="h-32 w-32 rounded-full object-cover border-4 border-green-500"
                  />
                ) : (
                  <div className="bg-gray-200 dark:bg-gray-700 border-4 border-green-500 rounded-full h-32 w-32 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Имя
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        URL аватара
                      </label>
                      <input
                        type="text"
                        id="avatarUrl"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        {saving ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Сохранение...
                          </>
                        ) : 'Сохранить'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setName(user.name || '');
                          setAvatarUrl(user.avatarUrl || '');
                          setIsEditing(false);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name || 'Пользователь'}</h2>
                      <p className="text-gray-600 dark:text-gray-400">Участник с {formatDate(user.registrationDate)}</p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Редактировать профиль
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Контактная информация</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{user.email || 'Не указан'}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Статистика</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Избранные животные</span>
                    <span className="font-medium text-gray-900 dark:text-white">{favoriteAnimals.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Дата регистрации</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatDate(user.registrationDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Любимые животные</h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : favoriteAnimals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteAnimals.map((animal) => (
                  <div key={animal.id} className="relative">
                    <AnimalCard animal={animal} />
                    <button
                      onClick={() => handleRemoveFavorite(animal.id)}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
                      aria-label="Удалить из избранного"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Нет избранных животных</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Добавьте животных в избранное, чтобы видеть их здесь
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;