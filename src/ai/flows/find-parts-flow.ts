'use server';
/**
 * @fileOverview A flow for finding parts or manuals based on search criteria.
 *
 * - findParts - A function that handles the filtered search process.
 * - FindPartsInput - The input type for the findParts function.
 * - FindPartsOutput - The return type for the findParts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindPartsInputSchema = z.object({
  query: z.string().describe('The search query for the part or manual.'),
  category: z
    .string()
    .optional()
    .describe('The category (e.g., Appliance, HVAC, Automotive).'),
  brand: z.string().optional().describe('The brand of the item.'),
  partType: z
    .enum(['OEM', 'Aftermarket', 'Any'])
    .optional()
    .describe('The type of the part.'),
  isManualSearch: z
    .boolean()
    .describe('Whether to search for manuals instead of parts.'),
  filters: z
    .array(z.string())
    .optional()
    .describe('Additional filters to apply.'),
});
export type FindPartsInput = z.infer<typeof FindPartsInputSchema>;

const PartSchema = z.object({
  name: z.string().describe('The name of the part.'),
  partNumber: z.string().optional().describe('The part number.'),
  brand: z.string().describe('The brand of the part.'),
  price: z
    .string()
    .describe('The estimated price of the part (e.g., "$50.00").'),
  type: z
    .enum(['OEM', 'Aftermarket'])
    .describe('Whether the part is OEM or Aftermarket.'),
  delivery: z
    .string()
    .describe('Estimated delivery time (e.g., "2-3 business days").'),
  source: z.string().describe('A sample vendor or URL where the part can be found.'),
});

const ManualSchema = z.object({
  name: z.string().describe('The name or title of the manual.'),
  description: z.string().describe('A brief description of the manual.'),
  url: z.string().url().describe('A URL to the manual.'),
});

const FindPartsOutputSchema = z.object({
  parts: z
    .array(PartSchema)
    .optional()
    .describe('A list of parts found, up to a maximum of 5.'),
  manuals: z
    .array(ManualSchema)
    .optional()
    .describe('A list of manuals found, up to a maximum of 5.'),
});
export type FindPartsOutput = z.infer<typeof FindPartsOutputSchema>;

export async function findParts(
  input: FindPartsInput
): Promise<FindPartsOutput> {
  return findPartsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findPartsPrompt',
  input: {schema: FindPartsInputSchema},
  output: {schema: FindPartsOutputSchema},
  prompt: `You are an expert parts and manuals finder.
    Based on the user's request, find relevant parts or manuals. Return a maximum of 5 results.
    
    Search Request:
    - Query: {{{query}}}
    {{#if category}}- Category: {{{category}}}{{/if}}
    {{#if brand}}- Brand: {{{brand}}}{{/if}}
    {{#if partType}}- Part Type: {{{partType}}}{{/if}}
    {{#if filters}}- Additional Filters: {{#each filters}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}

    {{#if isManualSearch}}
    Search for manuals. Return a list of manuals with their name, a brief description, and a valid URL.
    {{else}}
    Search for parts. For each part, provide its name, brand, an estimated price, whether it is OEM or Aftermarket, an estimated delivery time, and a source/URL.
    {{/if}}

    If you cannot find any results, return empty arrays.
    `,
});

const findPartsFlow = ai.defineFlow(
  {
    name: 'findPartsFlow',
    inputSchema: FindPartsInputSchema,
    outputSchema: FindPartsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
