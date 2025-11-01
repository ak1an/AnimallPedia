import { addReview } from './ReviewsPage';

// Mock Firebase functions
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(() => ({})),
  addDoc: jest.fn(() => Promise.resolve({ id: 'test-id' })),
  serverTimestamp: jest.fn()
}));

jest.mock('../../firebase/config', () => ({
  db: {},
  auth: {}
}));

describe('Reviews Utilities', () => {
  test('addReview function exists', () => {
    expect(addReview).toBeDefined();
  });

  test('addReview validates required fields', async () => {
    // Test with empty username
    const result1 = await addReview('', 'Great app!', 5);
    expect(result1.success).toBe(false);
    
    // Test with empty text
    const result2 = await addReview('John', '', 5);
    expect(result2.success).toBe(false);
    
    // Test with invalid rating
    const result3 = await addReview('John', 'Great app!', 0);
    expect(result3.success).toBe(false);
    
    // Test with valid inputs
    const result4 = await addReview('John', 'Great app!', 5);
    expect(result4.success).toBe(true);
  });
});