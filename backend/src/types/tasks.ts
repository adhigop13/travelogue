import { z } from 'zod';

export const taskSchemaZod = z.object({
    DayId: z.string(),
    time: z.string(),
    taskDescription: z.string(),
    location: z.string(),
    notes: z.string()
})

export type TaskType = z.infer<typeof taskSchemaZod>;
