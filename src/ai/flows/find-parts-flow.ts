'use server';
/**
 * @fileOverview A flow for finding parts, manuals, videos, or technicians based on search criteria.
 *
 * - findParts - A function that handles the filtered search process.
 * - FindPartsInput - The input type for the findParts function.
 * - FindPartsOutput - The return type for the findParts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindPartsInputSchema = z.object({
  query: z.string().describe('The search query.'),
  category: z
    .string()
    .optional()
    .describe('The category (e.g., Appliance, HVAC, Automotive).'),
  brand: z.string().optional().describe('The brand of the item.'),
  partType: z
    .enum(['OEM', 'Aftermarket', 'Any'])
    .optional()
    .describe('The type of the part.'),
  searchTarget: z
    .enum(['Parts', 'Manuals', 'Videos', 'Technicians'])
    .describe('The type of item to search for.'),
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

const VideoSchema = z.object({
  name: z.string().describe('The title of the video.'),
  description: z.string().describe('A brief summary of the video content.'),
  url: z.string().url().describe('A URL to the video.'),
  experienceLevel: z
    .enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
    .describe('The recommended experience level for the DIY job.'),
});

const TechnicianSchema = z.object({
  name: z.string().describe('The name of the technician or company.'),
  specialty: z
    .string()
    .describe('The area of expertise (e.g., HVAC, Samsung Appliances).'),
  location: z.string().describe('The city and state or service area.'),
  contact: z
    .string()
    .describe('A contact method, like a phone number or website.'),
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
  videos: z
    .array(VideoSchema)
    .optional()
    .describe('A list of relevant DIY videos found, up to a maximum of 5.'),
  technicians: z
    .array(TechnicianSchema)
    .optional()
    .describe('A list of qualified technicians found, up to a maximum of 5.'),
});
export type FindPartsOutput = z.infer<typeof FindPartsOutputSchema>;

export async function findParts(
  input: FindPartsInput
): Promise<FindPartsOutput> {
  return findPartsFlow(input);
}

const PromptInputSchema = FindPartsInputSchema.extend({
  isPartsSearch: z.boolean(),
  isManualsSearch: z.boolean(),
  isVideosSearch: z.boolean(),
  isTechniciansSearch: z.boolean(),
});

const prompt = ai.definePrompt({
  name: 'findPartsPrompt',
  input: {schema: PromptInputSchema},
  output: {schema: FindPartsOutputSchema},
  prompt: `You are an expert parts, manuals, and services finder.
    Based on the user's request, find relevant items. Return a maximum of 5 results for the requested type.
    
    Search Request:
    - Query: {{{query}}}
    {{#if category}}- Category: {{{category}}}{{/if}}
    {{#if brand}}- Brand: {{{brand}}}{{/if}}
    {{#if partType}}- Part Type: {{{partType}}}{{/if}}
    {{#if filters}}- Additional Filters: {{#each filters}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}

    {{#if isPartsSearch}}
    Search for parts. For each part, provide its name, brand, an estimated price, whether it is OEM or Aftermarket, an estimated delivery time, and a source/URL.
    {{/if}}

    {{#if isManualsSearch}}
    Search for manuals. Return a list of manuals with their name, a brief description, and a valid URL.
    {{/if}}

    {{#if isVideosSearch}}
    Search for DIY videos related to installation, repair, or troubleshooting. For each video, provide its title, a brief description, a valid URL, and a recommended experience level (Beginner, Intermediate, Advanced, or Expert).
    {{/if}}

    {{#if isTechniciansSearch}}
    Search for certified or qualified technicians. For each technician, provide their name or company, specialty, service area/location, and a contact method (phone or website).
    {{/if}}

    If you cannot find any results, return empty arrays for all fields.
    `,
});

const findPartsFlow = ai.defineFlow(
  {
    name: 'findPartsFlow',
    inputSchema: FindPartsInputSchema,
    outputSchema: FindPartsOutputSchema,
  },
  async input => {
    const promptInput = {
      ...input,
      isPartsSearch: input.searchTarget === 'Parts',
      isManualsSearch: input.searchTarget === 'Manuals',
      isVideosSearch: input.searchTarget === 'Videos',
      isTechniciansSearch: input.searchTarget === 'Technicians',
    };
    const {output} = await prompt(promptInput);
    return output!;
  }
);