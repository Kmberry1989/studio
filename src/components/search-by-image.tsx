"use client";

import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import { ImageUp, X } from "lucide-react";
import { identifyPartAction, type ImageSearchState } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { PartResultsImage } from "./part-results-image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState: ImageSearchState = { data: null, error: null };

export function SearchByImage() {
  const [state, formAction] = useFormState(identifyPartAction, initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  useEffect(() => {
    if(state.error) {
        // Clear preview if there was an error with the submission
        handleRemoveImage();
    }
  }, [state.error]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Identify a Part from an Image</CardTitle>
        <CardDescription>
          Upload a clear photo of the part, and our AI will attempt to identify it for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form action={formAction} className="space-y-4">
          <div
            className="w-full h-64 border-2 border-dashed border-border rounded-lg flex items-center justify-center relative bg-muted/50"
          >
            {imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  alt="Part preview"
                  fill={true}
                  style={{objectFit:"contain"}}
                  className="rounded-lg p-2"
                  data-ai-hint="mechanic part"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-card rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Remove image"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="text-center text-muted-foreground">
                <ImageUp className="mx-auto h-12 w-12" />
                <p className="mt-2">Drag & drop or click to upload</p>
                <p className="text-xs">PNG, JPG, WEBP up to 4MB</p>
              </div>
            )}
            <Input
              id="photo"
              name="photo"
              type="file"
              ref={fileInputRef}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleImageChange}
            />
          </div>
          
          <SubmitButton className="w-full">
            Identify Part
          </SubmitButton>
        </form>

        {state.error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

        {state.data && <PartResultsImage result={state.data} />}
      </CardContent>
    </Card>
  );
}
