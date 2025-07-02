import { Header } from "@/components/layout/header";
import { SearchTabs } from "@/components/search-tabs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 pt-12 pb-8 flex flex-col items-center">
        <Image
          src="https://i.imgur.com/XWGTfkV.png"
          alt="PartSnap Mascot"
          width={150}
          height={240}
          data-ai-hint="smiling man"
          className="z-10 mb-[-60px] drop-shadow-2xl"
        />
        <SearchTabs />
      </main>
    </div>
  );
}
