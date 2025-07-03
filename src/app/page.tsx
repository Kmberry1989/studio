"use client";

import { useState } from 'react';
import { Header } from "@/components/layout/header";
import { SearchByImage } from "@/components/search-by-image";
import { SearchByPartNumber } from "@/components/search-by-part-number";
import { ExpandedGarage } from "@/components/expanded-garage";
import { ExpandedHouse } from "@/components/expanded-house";
import Image from "next/image";
import { Card } from '@/components/ui/card';
import { Car, Home as HomeIcon } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export default function Home() {
  const { user, signInWithGoogle, loading } = useAuth();
  const [expandedView, setExpandedView] = useState<'garage' | 'house' | null>(null);

  const handleCardClick = (section: 'garage' | 'house') => {
    if (user) {
      setExpandedView(section);
    } else if (!loading) {
      signInWithGoogle();
    }
  };

  const renderContent = () => {
    if (expandedView === 'garage') {
      return <ExpandedGarage onClose={() => setExpandedView(null)} />;
    }
    if (expandedView === 'house') {
      return <ExpandedHouse onClose={() => setExpandedView(null)} />;
    }
    return (
      <>
        {/* Mascot and Nav Links */}
        <div className="flex flex-row items-center justify-center gap-4 md:gap-8 mb-12">
            <Card 
                onClick={() => handleCardClick('garage')}
                className="p-4 w-32 h-28 md:p-6 md:w-48 md:h-32 flex flex-col items-center justify-center text-center hover:bg-accent/50 transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
                <Car className="h-8 w-8 md:h-10 md:w-10 mb-2 text-primary"/>
                <p className="text-base md:text-lg font-semibold">Garage</p>
            </Card>

            <div className="w-[100px] h-[160px] md:w-[150px] md:h-[240px] relative shrink-0">
              <Image
                src="https://i.imgur.com/XWGTfkV.png"
                alt="PartSnap Mascot"
                fill
                sizes="(max-width: 768px) 100px, 150px"
                className="drop-shadow-2xl object-contain"
                data-ai-hint="smiling man"
              />
            </div>
            
            <Card 
                onClick={() => handleCardClick('house')}
                className="p-4 w-32 h-28 md:p-6 md:w-48 md:h-32 flex flex-col items-center justify-center text-center hover:bg-accent/50 transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
                <HomeIcon className="h-8 w-8 md:h-10 md:w-10 mb-2 text-primary"/>
                <p className="text-base md:text-lg font-semibold">House</p>
            </Card>
        </div>


        {/* Search Cards */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 w-full max-w-7xl">
            <div className="w-full max-w-md">
                <SearchByImage />
            </div>
            
            <div className="w-full max-w-md">
                <SearchByPartNumber />
            </div>
        </div>
      </>
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-12 pb-12 flex flex-col items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
}
