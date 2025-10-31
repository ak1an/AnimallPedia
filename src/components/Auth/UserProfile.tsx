import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { clearUser, updateProfile, addFavoriteAnimal, removeFavoriteAnimal } from '../../store/slices/userSlice';
import { RootState } from '../../store';

interface Animal {
  id: string;
  name: string;
  habitat: string;
  imageUrl: string;
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

  // Load favorite animals
  useEffect(() => {
    const loadData = async () => {
      if (!user.uid) return;
      
      try {
        // Load favorite animals from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const favoriteAnimalIds = userData.favoriteAnimals || [];
          
          // In a real app, you would fetch animal details from an API or database
          // For now, we'll create mock animals based on the IDs
          const mockAnimals: Animal[] = favoriteAnimalIds.map((id: string) => ({
            id: id,
            name: `Животное ${id}`,
            habitat: 'Место обитания',
            imageUrl: 'https://images.unsplash.com/photo-1551641932-78a3df9434d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
          }));
          
          setFavoriteAnimals(mockAnimals);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Ошибка при загрузке данных');
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
      // Update Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        name,
        avatarUrl
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
      // Update Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        favoriteAnimals: arrayRemove(animalId)
      });
      
      // Update Redux store
      dispatch(removeFavoriteAnimal(animalId));
      
      // Update local state
      setFavoriteAnimals(prev => prev.filter(animal => animal.id !== animalId));
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
              Любимые питомцы
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
              
              <div className="flex-1 w-full transition-all duration-300 ease-in-out transform scale-100">
                {isEditing ? (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={user.email || ''}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
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
                          placeholder="https://example.com/avatar.jpg"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Дата регистрации
                        </label>
                        <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                          {formatDate(user.registrationDate)}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Последний вход
                        </label>
                        <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                          {formatDate(user.lastLogin)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 transform hover:scale-105 transition-transform duration-300 ease-in-out"
                      >
                        {saving ? 'Сохранение...' : 'Сохранить изменения'}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors transform hover:scale-105 transition-transform duration-300 ease-in-out"
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Имя
                        </label>
                        <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                          {user.email}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Дата регистрации
                        </label>
                        <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                          {formatDate(user.registrationDate)}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Последний вход
                        </label>
                        <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                          {formatDate(user.lastLogin)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors transform hover:scale-105 transition-transform duration-300 ease-in-out"
                      >
                        Редактировать профиль
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteAnimals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteAnimals.map((animal) => (
                  <div 
                    key={animal.id}
                    className="bg-gradient-to-br from-green-50 to-amber-50 dark:from-gray-700 dark:to-gray-700 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative">
                      <img 
                        src={animal.imageUrl} 
                        alt={animal.name} 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{animal.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{animal.habitat}</p>
                      
                      <button 
                        onClick={() => handleRemoveFavorite(animal.id)}
                        className="flex items-center px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Нет избранных животных</h3>
                <p className="text-gray-500 dark:text-gray-400">Добавьте животных в избранное, чтобы увидеть их здесь</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;