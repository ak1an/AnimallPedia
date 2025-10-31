# Firebase Integration

This directory contains the Firebase configuration for the AnimalPedia project.

## Configuration

The `config.ts` file initializes all Firebase services:

1. **Firebase App** - The main Firebase application instance
2. **Firebase Auth** - Authentication service for user management
3. **Firestore** - Database service for storing and retrieving data
4. **Analytics** - Analytics service for tracking user interactions

## Usage

To use Firebase services in your components:

```typescript
import { auth, db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';

// Example: Fetch data from Firestore
const fetchAnimals = async () => {
  const querySnapshot = await getDocs(collection(db, 'animals'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Example: Sign in anonymously
const handleSignIn = async () => {
  await signInAnonymously(auth);
};
```

## Services

- `app` - The main Firebase application instance
- `auth` - Firebase Authentication service
- `db` - Firestore database service
- `analytics` - Firebase Analytics service

## Environment

Firebase is configured to work in both browser and server environments. Analytics is only initialized in browser environments.