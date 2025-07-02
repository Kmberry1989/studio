'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
<<<<<<< HEAD
import { onAuthStateChanged, GoogleAuthProvider, signInWithRedirect, signOut, type User } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
=======
import { onAuthStateChanged, User, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { LoadingAnimation } from '@/components/loading-animation';

// These are global variables provided by the environment.
declare const __initial_auth_token: string;
>>>>>>> 8407e6eed39c1a4f6d09e31b5ecb6bd3747fbce5

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect handles the initial authentication when the component mounts.
    const signIn = async () => {
      try {
        // The onAuthStateChanged listener below will catch the result of this sign-in.
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          // If a custom token is provided by the environment, use it to sign in.
          await signInWithCustomToken(auth, __initial_auth_token);
          console.log("Successfully signed in with custom token.");
        } else {
          // As a fallback, sign the user in anonymously.
          await signInAnonymously(auth);
          console.log("Successfully signed in anonymously.");
        }
      } catch (error) {
        console.error("Error during initial sign-in:", error);
        // Set loading to false even if sign-in fails, to not block the UI.
        setLoading(false);
      }
    };

    // Set up the listener for authentication state changes.
    // This will fire once the user is signed in, or if their state changes later.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Trigger the initial sign-in.
    signIn();

    // Cleanup the listener when the component unmounts.
    return () => unsubscribe();
  }, []); // The empty dependency array ensures this effect runs only once.

<<<<<<< HEAD
  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth) {
        console.error("Firebase is not configured. Please update your .env file.");
        return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logout = async () => {
    if (!isFirebaseConfigured || !auth) {
        console.error("Firebase is not configured. Please update your .env file.");
        return;
    }
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
=======
  // Display a loading animation while we wait for the initial auth state.
  if (loading) {
    return <LoadingAnimation />;
  }
>>>>>>> 8407e6eed39c1a4f6d09e31b5ecb6bd3747fbce5

  // Once loading is false, render the rest of the application.
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
