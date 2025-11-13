import { z } from 'zod';

export const HNHitSchema = z.object( {
    objectID: z.string(),
    created_at: z.string(),
    author: z.string().nullable(),
    title: z.string().nullable(),
    url: z.string().nullable().optional(),
    points: z.number().nullable(),
    num_comments: z.number().nullable(),
    story_text: z.string().nullable().optional(),
    story_title: z.string().nullable().optional(),
    story_url: z.string().nullable().optional(),
    parent_id: z.number().nullable().optional(),
    created_at_i: z.number(),
    _tags: z.array( z.string() ),
    _highlightResult: z.any().optional()
} );

export type HNHit = z.infer<typeof HNHitSchema>;

export const HNSearchResponseSchema = z.object( {
    hits: z.array( HNHitSchema ),
    nbHits: z.number(),
    page: z.number(),
    nbPages: z.number(),
    hitsPerPage: z.number(),
    exhaustiveNbHits: z.boolean(),
    exhaustiveTypo: z.boolean(),
    exhaustive: z.object( {
        nbHits: z.boolean(),
        typo: z.boolean()
    } ).optional(),
    query: z.string(),
    params: z.string(),
    processingTimeMS: z.number()
} );

export type HNSearchResponse = z.infer<typeof HNSearchResponseSchema>;
