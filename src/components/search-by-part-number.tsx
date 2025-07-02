"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Refrigerator, AirVent, Car } from "lucide-react";
import { crossReferenceAction, type PartNumberSearchState } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { PartResultsPartNumber } from "./part-results-part-number";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Label } from "./ui/label";

const initialState: PartNumberSearchState = { data: null, error: null };

const categories = [
  { name: "Appliance", icon: Refrigerator },
  { name: "HVAC", icon: AirVent },
  { name: "Automotive", icon: Car },
];

export function SearchByPartNumber() {
  const [state, formAction] = useActionState(crossReferenceAction, initialState);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cross-Reference a Part Number</CardTitle>
        <CardDescription>
          Enter a part number to find compatible or equivalent parts. Selecting a category can improve results.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="partNumber">Part Number</Label>
            <Input id="partNumber" name="partNumber" placeholder="e.g., W10780048" required />
          </div>

          <div>
            <Label>Category (Optional)</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <input type="hidden" name="category" value={selectedCategory ?? ""} />
              {categories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedCategory(prev => prev === category.name ? null : category.name)}
                  className={cn(
                    "p-4 border rounded-lg flex flex-col items-center justify-center gap-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
                    selectedCategory === category.name
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-accent hover:text-accent-foreground bg-background"
                  )}
                >
                  <category.icon className="h-8 w-8" />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <SubmitButton className="w-full">
            Cross-Reference Part
          </SubmitButton>
        </form>

        {state.error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

        {state.data && <PartResultsPartNumber result={state.data} />}
      </CardContent>
    </Card>
  );
}
