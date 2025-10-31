import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { doc, collection, addDoc, serverTimestamp, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { selectRandomQuestions, isAnswerCorrect, calculatePercentage, QuizQuestion } from './quizUtils';
import { RootState } from '../../store';

const TOTAL_QUESTIONS = 12;
const TIME_PER_QUESTION = 10; // seconds

const Quiz: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [gameState, setGameState] = useState<'preview' | 'playing' | 'result'>('preview');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [savingResult, setSavingResult] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      // Time's up, move to next question
      handleNextQuestion();
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, gameState]);

  const startGame = () => {
    // Select a unique set of questions for this session using Fisher-Yates shuffle
    const selectedQuestions = selectRandomQuestions(TOTAL_QUESTIONS);
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setSelectedOption(null);
    setTimeLeft(TIME_PER_QUESTION);
    setGameState('playing');
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedOption !== null || showFeedback) return;
    
    setSelectedOption(optionIndex);
    
    const currentQuestion = questions[currentQuestionIndex];
    const correct = isAnswerCorrect(currentQuestion, optionIndex);
    setIsCorrect(correct);
    
    if (correct) {
      setCorrectAnswers(correctAnswers + 1);
    }
    
    setShowFeedback(true);
    
    // Move to next question after feedback
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setTimeLeft(TIME_PER_QUESTION);
      setShowFeedback(false);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setGameState('result');
    saveResult();
  };

  const saveResult = async () => {
    if (!user.isAuthenticated || !auth.currentUser) {
      return;
    }
    
    setSavingResult(true);
    setSaveError('');
    
    try {
      const resultData = {
        userId: user.uid,
        userName: user.name,
        avatarUrl: user.avatarUrl,
        date: serverTimestamp(),
        correctAnswers,
        totalQuestions: TOTAL_QUESTIONS
      };
      
      // Save to quiz history
      await addDoc(collection(db, 'quizResults'), resultData);
      
      // Update best score - one document per user
      if (user.uid) {
        const bestRef = doc(db, 'bestScores', user.uid);
        const bestSnap = await getDoc(bestRef);
        
        if (!bestSnap.exists()) {
          // Create new best score record
          await setDoc(bestRef, {
            ...resultData,
            achievedAt: serverTimestamp()
          });
        } else {
          // Update only if new score is better
          const best = bestSnap.data() as { correctAnswers: number };
          if (correctAnswers > best.correctAnswers) {
            await updateDoc(bestRef, {
              correctAnswers,
              date: serverTimestamp(),
              userName: user.name,
              avatarUrl: user.avatarUrl
            });
          }
        }
      }
    } catch (error: any) {
      console.error('Error saving quiz result:', error);
      setSaveError('Ошибка при сохранении результата');
    } finally {
      setSavingResult(false);
    }
  };

  const restartGame = () => {
    startGame();
  };

  const closeGame = () => {
    setGameState('preview');
  };

  const renderPreview = () => (
    <div className="text-center py-8">
      <div className="bg-gradient-to-r from-green-100 to-amber-100 dark:from-green-900/30 dark:to-amber-900/30 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Викторина по животным</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Проверьте свои знания о животных! Ответьте на {TOTAL_QUESTIONS} случайных вопросов за ограниченное время.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{TOTAL_QUESTIONS}</div>
            <div className="text-gray-600 dark:text-gray-400">Вопросов</div>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{TIME_PER_QUESTION}с</div>
            <div className="text-gray-600 dark:text-gray-400">На вопрос</div>
          </div>
        </div>
      </div>
      
      {!user.isAuthenticated ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 dark:text-yellow-200">
            Чтобы сохранить свой результат, пожалуйста, <a href="/login" className="font-medium underline">войдите</a> или <a href="/register" className="font-medium underline">зарегистрируйтесь</a>.
          </p>
        </div>
      ) : null}
      
      <button
        onClick={startGame}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-lg transform hover:scale-105 transition-transform"
      >
        Начать викторину
      </button>
    </div>
  );

  const renderGame = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="py-4">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Вопрос {currentQuestionIndex + 1} из {questions.length}</span>
            <span>{correctAnswers} правильных</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Timer */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eee"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray={`${(timeLeft / TIME_PER_QUESTION) * 100}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-900 dark:text-white">{timeLeft}</span>
            </div>
          </div>
        </div>
        
        {/* Question */}
        <div className="bg-gradient-to-r from-green-50 to-amber-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-6 mb-6 shadow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedOption !== null || showFeedback}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  showFeedback
                    ? index === currentQuestion.correctAnswer
                      ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                      : selectedOption === index
                      ? 'bg-red-100 dark:bg-red-900/30 border-2 border-red-500'
                      : 'bg-gray-100 dark:bg-gray-600'
                    : selectedOption === index
                    ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500'
                    : 'bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500'
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-3">
                    <span className="font-medium text-gray-900 dark:text-white">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span className="text-gray-900 dark:text-white">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Feedback */}
        {showFeedback && (
          <div className={`p-4 rounded-lg mb-6 text-center animate-fade-in ${isCorrect ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
            <p className={`font-medium ${isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
              {isCorrect ? 'Правильно! ' + currentQuestion.hint : 'Неправильно. ' + currentQuestion.hint}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderResult = () => {
    const percentage = calculatePercentage(correctAnswers, TOTAL_QUESTIONS);
    
    return (
      <div className="text-center py-8">
        <div className="bg-gradient-to-r from-green-100 to-amber-100 dark:from-green-900/30 dark:to-amber-900/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ваш результат</h2>
          
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray={`${percentage}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{correctAnswers}/{TOTAL_QUESTIONS}</span>
                <span className="text-lg text-gray-600 dark:text-gray-400">{percentage}%</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-xl text-gray-900 dark:text-white">
              {percentage >= 80 ? 'Отлично! Вы настоящий знаток животных!' :
               percentage >= 60 ? 'Хорошо! Продолжайте учиться о животных!' :
               'Не расстраивайтесь! Попробуйте еще раз!'}
            </p>
          </div>
          
          {saveError && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mb-6">
              <p className="text-red-800 dark:text-red-200">{saveError}</p>
            </div>
          )}
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={restartGame}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-lg transform hover:scale-105 transition-transform"
            >
              Играть снова
            </button>
            <button
              onClick={closeGame}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors shadow-lg transform hover:scale-105 transition-transform"
            >
              Закрыть
            </button>
          </div>
        </div>
        
        {!user.isAuthenticated && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200">
              Чтобы сохранить свой результат в списке лидеров, пожалуйста, <a href="/login" className="font-medium underline">войдите</a> или <a href="/register" className="font-medium underline">зарегистрируйтесь</a>.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {gameState === 'preview' && renderPreview()}
      {gameState === 'playing' && renderGame()}
      {gameState === 'result' && renderResult()}
    </div>
  );
};

export default Quiz;