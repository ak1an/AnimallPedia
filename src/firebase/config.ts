// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcFCpB09KcJsUfC54jZj83oDjrnbRjyQ8",
  authDomain: "animallpedia.firebaseapp.com",
  projectId: "animallpedia",
  storageBucket: "animallpedia.firebasestorage.app",
  messagingSenderId: "911946213967",
  appId: "1:911946213967:web:9d7afe560956096117983a",
  measurementId: "G-DWFRPC0H6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication and get a reference to the service
// This will be used for user authentication (sign up, sign in, sign out, etc.)
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
// This will be used for database operations (reading, writing, updating data)
const db = getFirestore(app);

// Export all services for use in the application
// app: The main Firebase app instance
// analytics: Firebase Analytics service for tracking user interactions
// auth: Firebase Authentication service for user management
// db: Firestore database service for data storage and retrieval
export { app, analytics, auth, db };