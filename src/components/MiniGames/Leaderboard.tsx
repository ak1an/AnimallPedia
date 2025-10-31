import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

interface QuizResult {
  id: string;
  userId: string;
  userName: string;
  avatarUrl: string;
  date: any;
  correctAnswers: number;
  totalQuestions: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        
        // Query to get top 10 best scores ordered by correct answers
        const q = query(
          collection(db, 'bestScores'),
          orderBy('correctAnswers', 'desc'),
          limit(10)
        );
        
        const querySnapshot = await getDocs(q);
        const results: QuizResult[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          results.push({
            id: doc.id,
            userId: data.userId,
            userName: data.userName,
            avatarUrl: data.avatarUrl,
            date: data.date,
            correctAnswers: data.correctAnswers,
            totalQuestions: data.totalQuestions
          });
        });
        
        setLeaderboard(results);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Ошибка при загрузке списка лидеров');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
        <p className="text-red-800 dark:text-red-200 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Список лидеров</h2>
      
      {leaderboard.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {leaderboard.map((result, index) => (
              <li key={result.id} className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 text-center">
                    {index === 0 ? (
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                        <span className="text-yellow-800 dark:text-yellow-200 font-bold">1</span>
                      </span>
                    ) : index === 1 ? (
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700">
                        <span className="text-gray-800 dark:text-gray-200 font-bold">2</span>
                      </span>
                    ) : index === 2 ? (
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <span className="text-amber-800 dark:text-amber-200 font-bold">3</span>
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 font-medium">#{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0 ml-4">
                    {result.avatarUrl ? (
                      <img 
                        src={result.avatarUrl} 
                        alt={result.userName} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {result.userName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {result.date?.toDate ? result.date.toDate().toLocaleDateString('ru-RU') : 'Дата не указана'}
                    </p>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                      {result.correctAnswers}/{result.totalQuestions}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Пока нет результатов</h3>
          <p className="text-gray-500 dark:text-gray-400">Пройдите викторину, чтобы попасть в список лидеров</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;