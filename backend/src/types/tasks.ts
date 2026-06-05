import { z } from 'zod';

export const taskSchemaZod = z.object({
    _id: z.string().optional(),
    dayId: z.string(),
    time: z.string(),
    location: z.string(),
    notes: z.string(),
})

export type TaskType = z.infer<typeof taskSchemaZod>;
