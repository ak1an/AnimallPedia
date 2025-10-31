import { app, auth, db } from './config';

/**
 * Test file for Firebase configuration
 * Verifies that Firebase services are properly initialized
 */

describe('Firebase Configuration', () => {
  test('Firebase app is initialized', () => {
    expect(app).toBeDefined();
    expect(app.name).toBe('[DEFAULT]');
  });

  test('Firebase Auth is initialized', () => {
    expect(auth).toBeDefined();
    expect(auth.app).toBe(app);
  });

  test('Firestore is initialized', () => {
    expect(db).toBeDefined();
    expect(db.app).toBe(app);
  });
});