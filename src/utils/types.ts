import { z } from 'zod';
export const ZCreateApiRequest = z.object({
    fileName: z.string(),
    description: z.string(),
    authorId: z.string(),
    lang: z.enum(['javascript', 'typescript', 'markdown']),
    code: z.string(),
});
export type ICreateApiRequest = z.infer<typeof ZCreateApiRequest>;