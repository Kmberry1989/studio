"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Header } from '@/components/layout/header';
import { Home } from 'lucide-react';
import { LoadingAnimation } from '@/components/loading-animation';

function HouseContent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
        <div className="flex-grow flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <LoadingAnimation />
                <p className="text-muted-foreground">Loading your house...</p>
            </div>
        </div>
    );
  }

  if (!user) {
    return null;
  }
  
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Home className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">My House</h1>
      </div>
      <p className="text-muted-foreground">
        Manage your home appliances here. This feature is coming soon!
      </p>
    </main>
  );
}


export default function HousePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <HouseContent />
        </div>
    )
}
