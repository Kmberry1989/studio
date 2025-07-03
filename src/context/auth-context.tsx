'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signInWithCustomToken, signInAnonymously, GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { LoadingAnimation } from '@/components/loading-animation';

// These are global variables provided by the environment.
declare const __initial_auth_token: string;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  // Display a loading animation while we wait for the initial auth state.
  if (loading) {
    return <LoadingAnimation />;
  }

  // Once loading is false, render the rest of the application.
  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// ...existing code...
