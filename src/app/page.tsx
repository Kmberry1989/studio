import { Header } from "@/components/layout/header";
import { SearchByImage } from "@/components/search-by-image";
import { SearchByPartNumber } from "@/components/search-by-part-number";
import Image from "next/image";
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Car, Home as HomeIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-8 pb-8 flex flex-col items-center">
        
        {/* Mascot and Nav Links */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <Link href="/garage">
                <Card className="p-6 w-48 h-32 flex flex-col items-center justify-center text-center hover:bg-accent/50 transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <Car className="h-10 w-10 mb-2 text-primary"/>
                    <p className="text-lg font-semibold">Garage</p>
                </Card>
            </Link>

            <Image
              src="https://i.imgur.com/XWGTfkV.png"
              alt="PartSnap Mascot"
              width={150}
              height={240}
              data-ai-hint="smiling man"
              className="drop-shadow-2xl"
            />
            
            <Link href="/house">
                 <Card className="p-6 w-48 h-32 flex flex-col items-center justify-center text-center hover:bg-accent/50 transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <HomeIcon className="h-10 w-10 mb-2 text-primary"/>
                    <p className="text-lg font-semibold">House</p>
                </Card>
            </Link>
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
      </main>
    </div>
  );
}
