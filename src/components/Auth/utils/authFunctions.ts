import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../../../firebase/config';

export async function registerUser(name: string, email: string, password: string) {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with display name
    await updateProfile(user, { displayName: name });

    // Create user document in Firestore with the same UID
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      email: email,
      avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWQ3_jRtkbXIBSAY3mMEf4rSxuk1kVxhTDfA&s",
      registrationDate: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });

    alert("Регистрация прошла успешно!");
  } catch (error: any) {
    console.error("Registration error:", error.code, error.message);
    switch (error.code) {
      case "auth/email-already-in-use":
        alert("Такой email уже зарегистрирован.");
        break;
      case "auth/invalid-email":
        alert("Введите корректный email.");
        break;
      case "auth/weak-password":
        alert("Пароль должен быть не менее 6 символов.");
        break;
      case "auth/operation-not-allowed":
        alert("Регистрация временно недоступна. Попробуйте позже.");
        break;
      case "auth/network-request-failed":
        alert("Ошибка сети. Проверьте подключение к интернету.");
        break;
      default:
        alert("Произошла ошибка при регистрации. Попробуйте снова.");
    }
    throw error; // Re-throw the error so it can be handled by the calling function
  }
}

export async function loginUser(email: string, password: string) {
  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Verify that the user document exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      // This shouldn't happen in a properly set up system, but just in case
      throw new Error("User document not found in Firestore");
    }

    // Update lastLogin timestamp
    await updateDoc(doc(db, "users", user.uid), {
      lastLogin: serverTimestamp(),
    });

    alert("Вы успешно вошли!");
  } catch (error: any) {
    console.error("Login error:", error.code, error.message);
    switch (error.code) {
      case "auth/user-not-found":
        alert("Пользователь с таким email не найден.");
        break;
      case "auth/wrong-password":
        alert("Неверный пароль.");
        break;
      case "auth/invalid-email":
        alert("Некорректный email.");
        break;
      case "auth/user-disabled":
        alert("Аккаунт заблокирован. Обратитесь к администратору.");
        break;
      case "auth/network-request-failed":
        alert("Ошибка сети. Проверьте подключение к интернету.");
        break;
      case "permission-denied":
        alert("Недостаточно прав для выполнения операции.");
        break;
      default:
        alert("Произошла ошибка авторизации. Попробуйте снова.");
    }
    throw error; // Re-throw the error so it can be handled by the calling function
  }
}

export async function updateAvatar(url: string) {
  const user = auth.currentUser;
  if (!user) throw new Error("Пользователь не авторизован");
  
  try {
    // Check if user document exists
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      // Create document if it doesn't exist
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName || "Пользователь",
        email: user.email || "",
        avatarUrl: url,
        registrationDate: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
    } else {
      // Update avatar URL if document exists
      await updateDoc(doc(db, "users", user.uid), { avatarUrl: url });
    }
  } catch (error) {
    console.error("Error updating avatar:", error);
    throw error;
  }
}

export function listenAuthState(callback: (user: any) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          callback(userData);
        } else {
          callback(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        callback(null);
      }
    } else {
      // User is signed out
      callback(null);
    }
  });
}