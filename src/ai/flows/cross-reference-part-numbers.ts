// The crossReferencePartNumbers flow helps users find compatible or equivalent parts from different manufacturers based on a given part number.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CrossReferencePartNumbersInputSchema = z.object({
  partNumber: z.string().describe('The part number to cross-reference.'),
  category: z
    .string()
    .optional()
    .describe('The category of the part (e.g., appliance, HVAC, automotive).'),
});
export type CrossReferencePartNumbersInput = z.infer<
  typeof CrossReferencePartNumbersInputSchema
>;

const CrossReferencePartNumbersOutputSchema = z.object({
  compatibleParts: z
    .array(z.string())
    .describe('An array of compatible part numbers from different manufacturers.'),
  equivalentParts: z
    .array(z.string())
    .describe('An array of equivalent part numbers from different manufacturers.'),
  unavailableOriginalPart: z
    .boolean()
    .describe('Whether the original part is unavailable.'),
  alternativeVendors: z
    .array(z.string())
    .describe('Vendors that provide alternative parts for the original part.'),
});
export type CrossReferencePartNumbersOutput = z.infer<
  typeof CrossReferencePartNumbersOutputSchema
>;

export async function crossReferencePartNumbers(
  input: CrossReferencePartNumbersInput
): Promise<CrossReferencePartNumbersOutput> {
  return crossReferencePartNumbersFlow(input);
}

const crossReferencePartNumbersPrompt = ai.definePrompt({
  name: 'crossReferencePartNumbersPrompt',
  input: {
    schema: CrossReferencePartNumbersInputSchema,
  },
  output: {
    schema: CrossReferencePartNumbersOutputSchema,
  },
  prompt: `You are an expert in identifying compatible and equivalent parts from different manufacturers.

  Given the part number: {{{partNumber}}},

  Find compatible and equivalent parts from other manufacturers.

  Also, determine if the original part is unavailable and if so, list alternative vendors.

  Consider the part category: {{{category}}}

  Output in JSON format.  If you can't find any matches, populate compatibleParts and equivalentParts with empty arrays and unavailableOriginalPart with false.
  `,
});

const crossReferencePartNumbersFlow = ai.defineFlow(
  {
    name: 'crossReferencePartNumbersFlow',
    inputSchema: CrossReferencePartNumbersInputSchema,
    outputSchema: CrossReferencePartNumbersOutputSchema,
  },
  async input => {
    const {output} = await crossReferencePartNumbersPrompt(input);
    return output!;
  }
);
