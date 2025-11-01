import { registerUser, loginUser, listenAuthState } from './authFunctions';

// Mock Firebase functions
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null);
    return jest.fn();
  })
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  doc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  getDoc: jest.fn(() => ({
    exists: jest.fn(() => true),
    data: jest.fn(() => ({}))
  })),
  serverTimestamp: jest.fn()
}));

describe('Auth Functions', () => {
  test('registerUser function exists', () => {
    expect(registerUser).toBeDefined();
  });

  test('loginUser function exists', () => {
    expect(loginUser).toBeDefined();
  });

  test('listenAuthState function exists', () => {
    expect(listenAuthState).toBeDefined();
  });
});