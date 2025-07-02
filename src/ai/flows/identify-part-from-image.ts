'use server';
/**
 * @fileOverview Flow for identifying a part number and potential matches from an image.
 *
 * - identifyPartFromImage - A function that handles the part identification process.
 * - IdentifyPartFromImageInput - The input type for the identifyPartFromImage function.
 * - IdentifyPartFromImageOutput - The return type for the identifyPartFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyPartFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a part, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyPartFromImageInput = z.infer<typeof IdentifyPartFromImageInputSchema>;

const IdentifyPartFromImageOutputSchema = z.object({
  partNumber: z.string().describe('The identified part number, if found.'),
  potentialMatches: z.array(z.string()).describe('Potential matches for the part.'),
});
export type IdentifyPartFromImageOutput = z.infer<typeof IdentifyPartFromImageOutputSchema>;

export async function identifyPartFromImage(input: IdentifyPartFromImageInput): Promise<IdentifyPartFromImageOutput> {
  return identifyPartFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyPartFromImagePrompt',
  input: {schema: IdentifyPartFromImageInputSchema},
  output: {schema: IdentifyPartFromImageOutputSchema},
  prompt: `You are an expert technician.  Based on the image, identify the part number and potential matches.  If you can't identify the part number, leave it blank. Provide an array of potential matches.

Image: {{media url=photoDataUri}}`,
});

const identifyPartFromImageFlow = ai.defineFlow(
  {
    name: 'identifyPartFromImageFlow',
    inputSchema: IdentifyPartFromImageInputSchema,
    outputSchema: IdentifyPartFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
