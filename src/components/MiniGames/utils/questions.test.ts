import { shuffleArray, getRandomQuestions } from './questions';

describe('Question Selection Utilities', () => {
  // Mock questions data
  const mockQuestions = [
    { id: 1, question: 'Question 1', options: ['A', 'B', 'C'], correctAnswer: 0, hint: 'Hint 1' },
    { id: 2, question: 'Question 2', options: ['A', 'B', 'C'], correctAnswer: 1, hint: 'Hint 2' },
    { id: 3, question: 'Question 3', options: ['A', 'B', 'C'], correctAnswer: 2, hint: 'Hint 3' },
    { id: 4, question: 'Question 4', options: ['A', 'B', 'C'], correctAnswer: 0, hint: 'Hint 4' },
    { id: 5, question: 'Question 5', options: ['A', 'B', 'C'], correctAnswer: 1, hint: 'Hint 5' },
  ];

  test('shuffleArray should return array with same length', () => {
    const shuffled = shuffleArray(mockQuestions);
    expect(shuffled).toHaveLength(mockQuestions.length);
  });

  test('shuffleArray should return array with same elements', () => {
    const shuffled = shuffleArray(mockQuestions);
    // Check that all original elements are present
    mockQuestions.forEach(question => {
      expect(shuffled).toContainEqual(question);
    });
  });

  test('shuffleArray should randomize order', () => {
    // Run shuffle multiple times to check for different orders
    const results = [];
    for (let i = 0; i < 10; i++) {
      results.push(shuffleArray([...mockQuestions]).map(q => q.id));
    }
    
    // Check that we get different orders (this might fail occasionally due to randomness)
    let differentOrderFound = false;
    const firstOrder = results[0];
    for (let i = 1; i < results.length; i++) {
      if (JSON.stringify(results[i]) !== JSON.stringify(firstOrder)) {
        differentOrderFound = true;
        break;
      }
    }
    
    // Note: This test might occasionally fail due to randomness, but it's unlikely with 10 iterations
    expect(differentOrderFound).toBe(true);
  });

  test('getRandomQuestions should return correct number of questions', () => {
    const selected = getRandomQuestions(mockQuestions, 3);
    expect(selected).toHaveLength(3);
  });

  test('getRandomQuestions should not return duplicates', () => {
    // Use a larger set to test for duplicates
    const largeQuestionSet = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      question: `Question ${i + 1}`,
      options: ['A', 'B', 'C'],
      correctAnswer: i % 3,
      hint: `Hint ${i + 1}`
    }));
    
    const selected = getRandomQuestions(largeQuestionSet, 12);
    
    // Check for duplicates by comparing IDs
    const ids = selected.map(q => q.id);
    const uniqueIds = Array.from(new Set(ids));
    expect(ids).toEqual(uniqueIds);
  });

  test('getRandomQuestions should handle request for more questions than available', () => {
    const selected = getRandomQuestions(mockQuestions, 10);
    expect(selected).toHaveLength(mockQuestions.length);
  });

  test('getRandomQuestions should return empty array when no questions available', () => {
    const selected = getRandomQuestions([], 5);
    expect(selected).toHaveLength(0);
  });
});