import { Header } from "@/components/layout/header";
import { SearchTabs } from "@/components/search-tabs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SearchTabs />
      </main>
    </div>
  );
}
