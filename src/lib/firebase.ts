import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// This is a global variable that will be provided by the environment.
// We declare it here to inform TypeScript about it.
declare const __firebase_config: string;

let firebaseConfig: FirebaseOptions;

try {
  // In the collaborative environment, __firebase_config will be a JSON string.
  // We check if it exists and parse it.
  if (typeof __firebase_config !== 'undefined') {
    firebaseConfig = JSON.parse(__firebase_config);
  } else {
    // This fallback uses the original method of reading from process.env,
    // which is useful for local development outside of this environment.
    console.log("Global Firebase config not found, falling back to process.env");
    firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
  }
} catch (error) {
  console.error("Error parsing Firebase config:", error);
  // Provide a default empty config to prevent the app from crashing,
  // though Firebase will fail to initialize properly.
  firebaseConfig = {};
}

// Initialize Firebase
// We check if an app is already initialized to prevent re-initialization errors.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
