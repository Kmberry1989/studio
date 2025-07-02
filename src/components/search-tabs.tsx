"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchByImage } from "@/components/search-by-image";
import { SearchByPartNumber } from "@/components/search-by-part-number";

export function SearchTabs() {
  return (
    <Tabs defaultValue="image" className="w-full max-w-3xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="image">Search by Image</TabsTrigger>
        <TabsTrigger value="part-number">Search by Part Number</TabsTrigger>
      </TabsList>
      <TabsContent value="image">
        <SearchByImage />
      </TabsContent>
      <TabsContent value="part-number">
        <SearchByPartNumber />
      </TabsContent>
    </Tabs>
  );
}
