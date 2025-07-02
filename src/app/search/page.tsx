"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Header } from '@/components/layout/header';
import { Search as SearchIcon } from 'lucide-react';
import { AdvancedSearch } from '@/components/advanced-search';
import { LoadingAnimation } from '@/components/loading-animation';

function SearchPageContent() {
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
                <p className="text-muted-foreground">Loading...</p>
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
        <SearchIcon className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">Advanced Search</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Find parts or manuals using detailed criteria. Our AI will search for the best matches for you.
      </p>
      <AdvancedSearch />
    </main>
  );
}


export default function SearchPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <SearchPageContent />
        </div>
    )
}
