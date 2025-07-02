"use server";

import { z } from "zod";
import {
  identifyPartFromImage,
  type IdentifyPartFromImageOutput,
} from "@/ai/flows/identify-part-from-image";
import {
  crossReferencePartNumbers,
  type CrossReferencePartNumbersOutput,
} from "@/ai/flows/cross-reference-part-numbers";
import { findParts, type FindPartsOutput } from "@/ai/flows/find-parts-flow";

// Helper to convert file to data URI
const fileToDataUri = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString("base64")}`;
};

const imageSearchSchema = z.object({
  photo: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required.")
    .refine(
      (file) => file.size < 4 * 1024 * 1024,
      "Image must be less than 4MB."
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png, and .webp formats are supported."
    ),
});

export type ImageSearchState = {
  data: IdentifyPartFromImageOutput | null;
  error: string | null;
};

export async function identifyPartAction(
  prevState: ImageSearchState,
  formData: FormData
): Promise<ImageSearchState> {
  const validatedFields = imageSearchSchema.safeParse({
    photo: formData.get("photo"),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors.photo?.[0] ?? "Invalid image.",
    };
  }
  
  try {
    const photoDataUri = await fileToDataUri(validatedFields.data.photo);
    const result = await identifyPartFromImage({ photoDataUri });
    return { data: result, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : "An unknown error occurred.";
    return { data: null, error: `AI identification failed: ${error}` };
  }
}

const partNumberSearchSchema = z.object({
  partNumber: z.string().min(1, "Part number is required."),
  category: z.string().optional(),
});

export type PartNumberSearchState = {
  data: CrossReferencePartNumbersOutput | null;
  error: string | null;
};

export async function crossReferenceAction(
  prevState: PartNumberSearchState,
  formData: FormData
): Promise<PartNumberSearchState> {
  const validatedFields = partNumberSearchSchema.safeParse({
    partNumber: formData.get("partNumber"),
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors.partNumber?.[0] ?? "Invalid part number.",
    };
  }

  try {
    const result = await crossReferencePartNumbers(validatedFields.data);
    return { data: result, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : "An unknown error occurred.";
    return { data: null, error: `AI cross-reference failed: ${error}` };
  }
}

const findPartsSchema = z.object({
  query: z.string().min(3, "Search query must be at least 3 characters."),
  category: z.string().optional(),
  brand: z.string().optional(),
  partType: z.enum(['OEM', 'Aftermarket', 'Any']).optional(),
  searchTarget: z.enum(['Parts', 'Manuals', 'Videos', 'Technicians']),
  filters: z.string().optional().transform(val => val ? val.split(',') : []),
});

export type FindPartsState = {
  data: FindPartsOutput | null;
  error: string | null;
};

export async function findPartsAction(
  prevState: FindPartsState,
  formData: FormData
): Promise<FindPartsState> {

  const rawFormData = {
    query: formData.get("query"),
    category: formData.get("category"),
    brand: formData.get("brand"),
    partType: formData.get("partType"),
    searchTarget: formData.get("searchTarget"),
    filters: formData.get("filters"),
  }
  
  const validatedFields = findPartsSchema.safeParse(rawFormData);
  
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const errorMessage = Object.values(fieldErrors).flat()[0] ?? "Invalid search criteria.";
    return {
      data: null,
      error: errorMessage,
    };
  }

  try {
    // We can't pass undefined to the flow, so we build the object carefully
    const inputData = {
      ...validatedFields.data,
      category: validatedFields.data.category || undefined,
      brand: validatedFields.data.brand || undefined,
      partType: validatedFields.data.partType || undefined,
      filters: validatedFields.data.filters?.length ? validatedFields.data.filters : undefined,
    }
    const result = await findParts(inputData);
    return { data: result, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : "An unknown error occurred.";
    return { data: null, error: `AI search failed: ${error}` };
  }
}