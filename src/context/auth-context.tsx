"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FirebaseNotConfigured = () => (
    <div className="container mx-auto px-4 py-4">
        <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Firebase Not Configured</AlertTitle>
            <AlertDescription>
                <p>Your Firebase configuration is missing. Please create a Firebase project, enable Google Authentication, and add your credentials to the <strong>.env</strong> file in the root of this project.</p>
                <p className="mt-2 text-xs">Authentication features will be disabled until this is resolved.</p>
            </AlertDescription>
        </Alert>
    </div>
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth) {
        console.error("Firebase is not configured. Please update your .env file.");
        return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
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

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {!isFirebaseConfigured && <FirebaseNotConfigured />}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
