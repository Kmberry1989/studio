import { Header } from "@/components/layout/header";
import { SearchByImage } from "@/components/search-by-image";
import { SearchByPartNumber } from "@/components/search-by-part-number";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-8 pb-8 flex flex-col items-center">
        
        {/* Mascot */}
        <div className="mb-8">
            <Image
              src="https://i.imgur.com/XWGTfkV.png"
              alt="PartSnap Mascot"
              width={150}
              height={240}
              data-ai-hint="smiling man"
              className="drop-shadow-2xl"
            />
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
