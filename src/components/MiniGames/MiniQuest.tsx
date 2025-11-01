import React, { useState, useEffect } from 'react';
import miniQuestQuestions from './miniQuestQuestions.json';
import { MiniQuestQuestion } from './miniQuestTypes';
import { shuffleArray } from './utils/questions';

const MiniQuest: React.FC = () => {
  const [gameState, setGameState] = useState<'preview' | 'playing' | 'result'>('preview');
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedQuests, setSelectedQuests] = useState<MiniQuestQuestion[]>([]);
  const [totalQuests] = useState(5); // Show only 5 quests per session
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  const startGame = () => {
    // Select a unique set of quests for this session
    const selected = shuffleArray(miniQuestQuestions as MiniQuestQuestion[]).slice(0, totalQuests);
    setSelectedQuests(selected);
    setCurrentQuestIndex(0);
    setScore(0);
    setUserAnswers([]);
    setGameState('playing');
  };

  const handleAnswer = (answer: string | number, correct: boolean) => {
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);
    
    // Update score if correct
    if (correct) {
      setScore(score + 1);
    }
    
    // Store user answer for result screen
    setUserAnswers([...userAnswers, correct]);
    
    // Move to next question after delay
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (currentQuestIndex < selectedQuests.length - 1) {
        setCurrentQuestIndex(currentQuestIndex + 1);
      } else {
        setGameState('result');
      }
    }, 1500);
  };

  const restartGame = () => {
    startGame();
  };

  const closeGame = () => {
    setGameState('preview');
  };

  const renderPreview = () => (
    <div className="text-center py-8">
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-8 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Миниквесты AnimalPedia</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Пройдите увлекательные задания и проверьте свои знания о животных!
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{totalQuests}</div>
            <div className="text-gray-600 dark:text-gray-400">Заданий</div>
          </div>
        </div>
      </div>
      
      <button
        onClick={startGame}
        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105"
      >
        Начать миниквест
      </button>
    </div>
  );

  const renderQuest = () => {
    const quest = selectedQuests[currentQuestIndex];
    
    return (
      <div className="py-4 animate-fadeIn">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Задание {currentQuestIndex + 1} из {totalQuests}</span>
            <span>{score} правильных</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${((currentQuestIndex + 1) / totalQuests) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Quest Content */}
        <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 mb-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{quest.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{quest.description}</p>
          
          {/* Feedback overlay */}
          {showFeedback && (
            <div className={`fixed inset-0 flex items-center justify-center z-50 ${isCorrect ? 'bg-green-500/80' : 'bg-red-500/80'} transition-opacity duration-300`}>
              <div className="text-white text-2xl font-bold">
                {isCorrect ? 'Правильно! 🎉' : 'Неправильно 😔'}
              </div>
            </div>
          )}
          
          {/* Matching Type */}
          {quest.type === 'matching' && quest.pairs && (
            <div className="space-y-4">
              {quest.pairs.map((pair, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:shadow-md"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{pair.animal}</span>
                  <div className="h-0.5 w-8 bg-gray-300 dark:bg-gray-500"></div>
                  <span className="font-medium text-gray-900 dark:text-white">{pair.habitat}</span>
                </div>
              ))}
              <button
                onClick={() => handleAnswer('matching', true)}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md transform hover:scale-[1.02]"
              >
                Подтвердить
              </button>
            </div>
          )}
          
          {/* Puzzle Type */}
          {quest.type === 'puzzle' && (
            <div className="text-center">
              <img 
                src={quest.image} 
                alt="Puzzle" 
                className="mx-auto mb-4 rounded-lg shadow-lg border-2 border-amber-200 dark:border-amber-700"
              />
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Соберите пазл из {quest.pieces} частей
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[...Array(quest.pieces)].map((_, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-700 border-2 border-dashed border-amber-300 dark:border-amber-600 rounded-lg h-24 flex items-center justify-center shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Часть {index + 1}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleAnswer('puzzle', true)}
                className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md transform hover:scale-[1.02]"
              >
                Собрать пазл
              </button>
            </div>
          )}
          
          {/* Identification Type */}
          {quest.type === 'identification' && quest.clues && (
            <div>
              <div className="space-y-3 mb-6">
                {quest.clues.map((clue, index) => (
                  <div 
                    key={index} 
                    className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-white">{index + 1}</span>
                    </div>
                    <span className="text-gray-900 dark:text-white">{clue}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Введите название животного"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                      handleAnswer(e.currentTarget.value, 
                        quest.answer ? e.currentTarget.value.toLowerCase() === quest.answer.toLowerCase() : false);
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
                    if (input && input.value.trim() !== '') {
                      handleAnswer(input.value, 
                        quest.answer ? input.value.toLowerCase() === quest.answer.toLowerCase() : false);
                    }
                  }}
                  className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md transform hover:scale-[1.02]"
                >
                  Ответить
                </button>
              </div>
            </div>
          )}
          
          {/* Sequence Type */}
          {quest.type === 'sequence' && quest.items && (
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">Перетащите элементы в правильном порядке:</p>
              <div className="space-y-3">
                {quest.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:shadow-md cursor-move"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mr-3">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                      <span className="text-gray-900 dark:text-white">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleAnswer('sequence', true)}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md transform hover:scale-[1.02]"
              >
                Подтвердить порядок
              </button>
            </div>
          )}
          
          {/* Classification Type */}
          {quest.type === 'classification' && quest.items && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3 text-center">Млекопитающие</h4>
                  <div className="space-y-2">
                    {quest.items
                      .filter((_, idx) => quest.groups?.mammals.includes(idx))
                      .map((item, idx) => (
                        <div 
                          key={idx} 
                          className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                        >
                          <span className="text-gray-900 dark:text-white">{item}</span>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                  <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-3 text-center">Птицы</h4>
                  <div className="space-y-2">
                    {quest.items
                      .filter((_, idx) => quest.groups?.birds.includes(idx))
                      .map((item, idx) => (
                        <div 
                          key={idx} 
                          className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                        >
                          <span className="text-gray-900 dark:text-white">{item}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleAnswer('classification', true)}
                className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md transform hover:scale-[1.02]"
              >
                Подтвердить классификацию
              </button>
            </div>
          )}
          
          {/* Memory Type */}
          {quest.type === 'memory' && quest.sequence && (
            <div className="text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Запомните последовательность:
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {quest.sequence.map((animal, index) => (
                  <div 
                    key={index} 
                    className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg shadow-md"
                  >
                    {animal}
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleAnswer('memory', true)}
                className="px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md transform hover:scale-[1.02]"
              >
                Я запомнил последовательность
              </button>
            </div>
          )}
          
          {/* Quiz Type */}
          {quest.type === 'quiz' && quest.options && (
            <div className="space-y-3">
              {quest.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.text, option.correct)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 shadow-sm border ${
                    selectedAnswer === option.text 
                      ? (option.correct 
                          ? 'bg-green-100 dark:bg-green-900/30 border-green-500' 
                          : 'bg-red-100 dark:bg-red-900/30 border-red-500')
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:shadow-md'
                  } ${
                    showFeedback && option.correct 
                      ? 'bg-green-100 dark:bg-green-900/30 border-green-500' 
                      : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span className="text-gray-900 dark:text-white">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {/* True/False Type */}
          {quest.type === 'truefalse' && quest.options && (
            <div className="space-y-4">
              {quest.options.map((option, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-900 dark:text-white font-medium mb-3">{option.text}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAnswer('true', option.correct && option.text.includes('Правда'))}
                      disabled={showFeedback}
                      className={`flex-1 py-2 rounded-lg transition-all duration-200 ${
                        selectedAnswer === 'true' 
                          ? (option.correct && option.text.includes('Правда') 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white')
                          : 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500'
                      }`}
                    >
                      Правда
                    </button>
                    <button
                      onClick={() => handleAnswer('false', option.correct && option.text.includes('Ложь'))}
                      disabled={showFeedback}
                      className={`flex-1 py-2 rounded-lg transition-all duration-200 ${
                        selectedAnswer === 'false' 
                          ? (option.correct && option.text.includes('Ложь') 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white')
                          : 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-500'
                      }`}
                    >
                      Ложь
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Image Guess Type */}
          {quest.type === 'imageGuess' && quest.imageUrl && quest.options && quest.correctAnswer && (
            <div className="text-center">
              <img 
                src={quest.imageUrl} 
                alt="Animal to guess" 
                className="mx-auto mb-6 rounded-lg shadow-lg border-2 border-amber-200 dark:border-amber-700 max-h-60 object-contain"
              />
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Какое это животное?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {quest.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.text, quest.correctAnswer === option.text)}
                    disabled={showFeedback}
                    className={`p-3 rounded-lg transition-all duration-200 shadow-sm border ${
                      selectedAnswer === option.text 
                        ? (quest.correctAnswer === option.text 
                            ? 'bg-green-100 dark:bg-green-900/30 border-green-500' 
                            : 'bg-red-100 dark:bg-red-900/30 border-red-500')
                        : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:shadow-md'
                    } ${
                      showFeedback && quest.correctAnswer === option.text 
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-500' 
                        : ''
                    }`}
                  >
                    <span className="text-gray-900 dark:text-white">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const percentage = Math.round((score / totalQuests) * 100);
    let message = '';
    let color = '';
    
    if (percentage === 100) {
      message = 'Отлично! Вы прошли все задания!';
      color = 'from-green-500 to-emerald-500';
    } else if (percentage >= 70) {
      message = 'Хорошо! Продолжайте тренироваться!';
      color = 'from-amber-500 to-orange-500';
    } else {
      message = 'Не расстраивайтесь! Попробуйте еще раз!';
      color = 'from-red-500 to-rose-500';
    }
    
    return (
      <div className="text-center py-8 animate-fadeIn">
        <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-8 mb-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Результат миниквеста</h2>
          
          <div className="flex justify-center mb-6">
            <div className={`bg-gradient-to-r ${color} rounded-full w-32 h-32 flex items-center justify-center shadow-lg`}>
              <div>
                <div className="text-3xl font-bold text-white">{score}/{totalQuests}</div>
                <div className="text-white text-sm">
                  {percentage}% правильных
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <p className="text-xl text-gray-900 dark:text-white font-medium">
              {message}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Вы ответили правильно на {score} из {totalQuests} вопросов
            </p>
          </div>
          
          {/* Detailed results */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Подробные результаты</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {userAnswers.map((correct, index) => (
                <div 
                  key={index} 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    correct 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={restartGame}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Играть снова
            </button>
            <button
              onClick={closeGame}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      {gameState === 'preview' && renderPreview()}
      {gameState === 'playing' && renderQuest()}
      {gameState === 'result' && renderResult()}
    </div>
  );
};

export default MiniQuest;