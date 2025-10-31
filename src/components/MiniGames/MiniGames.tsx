import React, { useState } from 'react';
import { Quiz, MiniQuest, Leaderboard } from './index';

const MiniGames: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'miniqwest' | 'leaderboard'>('quiz');

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Мини-игры AnimalPedia</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'quiz'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Викторина
            </button>
            <button
              onClick={() => setActiveTab('miniqwest')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'miniqwest'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Миниквест
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'leaderboard'
                  ? 'border-green-500 text-green-600 dark:text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Список лидеров
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'quiz' && <Quiz />}
          {activeTab === 'miniqwest' && <MiniQuest />}
          {activeTab === 'leaderboard' && <Leaderboard />}
        </div>
      </div>
    </div>
  );
};

export default MiniGames;