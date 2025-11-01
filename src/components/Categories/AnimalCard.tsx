import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useFavorites } from '../../contexts/FavoriteContext';

interface Animal {
  id: string;
  name: string;
  category: string;
  habitat: string;
  photo: string;
  short: string;
  details: string;
  redBook?: boolean; // Red Book status
}

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const [user] = useAuthState(auth);
  const { isFavorite, refreshFavorites } = useFavorites();
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Check if animal is liked by the user
  useEffect(() => {
    const checkIfLiked = async () => {
      if (user && animal.id) {
        try {
          // Check if the animal is liked using Firebase
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const likedAnimals = userData.likedAnimals || [];
            setIsLiked(likedAnimals.includes(animal.id));
          }
        } catch (error) {
          console.error('Error checking if animal is liked:', error);
        }
      }
    };

    checkIfLiked();
  }, [user, animal.id]);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Авторизуйтесь, чтобы добавлять в избранное');
      return;
    }
    
    setFavoriteLoading(true);
    
    try {
      const userId = user.uid;
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      
      if (!docSnap.exists()) {
        // User document doesn't exist, create it with the animal as favorite
        await updateDoc(userRef, {
          favoriteAnimals: arrayUnion(animal)
        });
        await refreshFavorites();
        return;
      }
      
      const favoriteAnimals = docSnap.data()?.favoriteAnimals || [];
      const isFavorite = favoriteAnimals.some((a: any) => a.id === animal.id);
      
      if (isFavorite) {
        await updateDoc(userRef, { 
          favoriteAnimals: arrayRemove(animal) 
        });
      } else {
        await updateDoc(userRef, { 
          favoriteAnimals: arrayUnion(animal) 
        });
      }
      
      // Refresh favorites across the app
      await refreshFavorites();
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Ошибка при добавлении в избранное');
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Авторизуйтесь, чтобы ставить лайки');
      return;
    }
    
    setLikeLoading(true);
    
    try {
      const userId = user.uid;
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      
      if (!docSnap.exists()) {
        // User document doesn't exist, create it with the animal as liked
        await updateDoc(userRef, {
          likedAnimals: arrayUnion(animal.id)
        });
        setIsLiked(true);
        return;
      }
      
      const likedAnimals = docSnap.data()?.likedAnimals || [];
      if (likedAnimals.includes(animal.id)) {
        alert("Вы уже лайкнули");
        setLikeLoading(false);
        return;
      }
      
      await updateDoc(userRef, { 
        likedAnimals: arrayUnion(animal.id) 
      });
      setIsLiked(true);
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Ошибка при установке лайка');
    } finally {
      setLikeLoading(false);
    }
  };

  const isFavorited = isFavorite(animal.id);

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700"
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative overflow-hidden">
        <motion.img 
          src={animal.photo} 
          alt={animal.name} 
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        {animal.redBook && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            Красная книга
          </div>
        )}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 flex items-end p-4"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white text-sm line-clamp-2">{animal.short}</p>
        </motion.div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <motion.h3 
          className="text-xl font-bold text-gray-900 dark:text-white mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {animal.name}
        </motion.h3>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex-grow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="font-medium">Среда обитания:</span> {animal.habitat}
        </motion.p>
        
        <motion.div 
          className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex space-x-2">
            <motion.button 
              onClick={handleLike}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all duration-200 flex items-center"
              aria-label={isLiked ? "Убрать лайк" : "Поставить лайк"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={likeLoading}
            >
              {likeLoading ? (
                <div className="w-4 h-4 border-t-2 border-yellow-500 border-solid rounded-full animate-spin"></div>
              ) : isLiked ? (
                <FaStar className="text-yellow-500 transition-all duration-300 transform scale-110" />
              ) : (
                <FaStar className="text-gray-400 dark:text-gray-500 transition-all duration-300" />
              )}
              {isLiked && (
                <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">1 лайк</span>
              )}
            </motion.button>
            
            <motion.button 
              onClick={handleFavorite}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
              aria-label={isFavorited ? "Убрать из избранного" : "Добавить в избранное"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={favoriteLoading}
            >
              {favoriteLoading ? (
                <div className="w-4 h-4 border-t-2 border-red-500 border-solid rounded-full animate-spin"></div>
              ) : isFavorited ? (
                <FaHeart className="text-red-500 transition-all duration-300 transform scale-110" />
              ) : (
                <FaRegHeart className="text-gray-500 dark:text-gray-400 transition-all duration-300" />
              )}
            </motion.button>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to={`/animal/${animal.id}`}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg block"
            >
              Подробнее
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnimalCard;