"use client";

import { useState, useActionState, useEffect } from "react";
import { findPartsAction, type FindPartsState } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { SubmitButton } from "@/components/submit-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PartResultsAdvanced } from "./part-results-advanced";
import { Separator } from "./ui/separator";

const initialState: FindPartsState = { data: null, error: null };

const categories = ["Appliance", "HVAC", "Automotive", "Other"];
const categoryFilters = {
  "Appliance": ["Control Board", "Heating Element", "Motor", "Seal/Gasket", "Filter", "Shelf", "Drawer"],
  "HVAC": ["Compressor", "Fan Motor", "Capacitor", "Thermostat", "Igniter", "Filter"],
  "Automotive": ["Brake Pad", "Rotor", "Alternator", "Starter", "Spark Plug", "Oil Filter", "Sensor"],
  "Other": [],
};

export function AdvancedSearch() {
  const [state, formAction] = useActionState(findPartsAction, initialState);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categoryFilters | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchType, setSearchType] = useState('Parts');

  useEffect(() => {
    setSelectedFilters([]);
  }, [selectedCategory]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const currentFilters = selectedCategory ? categoryFilters[selectedCategory] : [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Search Criteria</CardTitle>
        <CardDescription>Fill out the form below to begin your search.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="searchType" className="font-semibold">I'm looking for...</Label>
            <RadioGroup
              defaultValue="Parts"
              name="searchTarget"
              className="flex flex-wrap gap-x-4 gap-y-2"
              onValueChange={setSearchType}
              value={searchType}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Parts" id="r-parts" />
                <Label htmlFor="r-parts">Parts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Manuals" id="r-manuals" />
                <Label htmlFor="r-manuals">Manuals</Label>
              </div>
               <div className="flex items-center space-x-2">
                <RadioGroupItem value="Videos" id="r-videos" />
                <Label htmlFor="r-videos">DIY Videos</Label>
              </div>
               <div className="flex items-center space-x-2">
                <RadioGroupItem value="Technicians" id="r-technicians" />
                <Label htmlFor="r-technicians">Technicians</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <Label htmlFor="query" className="font-semibold">Search Query</Label>
                  <Input id="query" name="query" placeholder="Don't know a part number? Describe it here." required />
              </div>

            {searchType === 'Parts' && (
              <div className="space-y-2">
                <Label htmlFor="partType" className="font-semibold">Part Type</Label>
                <Select name="partType">
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any">Any</SelectItem>
                    <SelectItem value="OEM">OEM</SelectItem>
                    <SelectItem value="Aftermarket">Aftermarket</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="category" className="font-semibold">Category</Label>
                <Select name="category" onValueChange={(value) => setSelectedCategory(value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="brand" className="font-semibold">Brand (Optional)</Label>
                <Input id="brand" name="brand" placeholder="e.g., Whirlpool, Ford, Trane" />
            </div>
          </div>
          
          {currentFilters.length > 0 && (
            <div className="space-y-2">
              <Label className="font-semibold">Refine by Type</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                {currentFilters.map((filter) => (
                  <div key={filter} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`filter-${filter}`} 
                      onCheckedChange={() => handleFilterChange(filter)}
                      checked={selectedFilters.includes(filter)}
                    />
                    <Label htmlFor={`filter-${filter}`} className="font-normal">{filter}</Label>
                  </div>
                ))}
              </div>
              <input type="hidden" name="filters" value={selectedFilters.join(',')} />
            </div>
          )}

          <SubmitButton className="w-full" loadingText="Searching with AI...">
            Search
          </SubmitButton>
        </form>

        {state.error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}
        
        <Separator />

        {state.data && <PartResultsAdvanced result={state.data} />}
      </CardContent>
    </Card>
  );
}
