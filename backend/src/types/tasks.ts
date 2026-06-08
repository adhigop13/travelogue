import { z } from 'zod';

export const createTaskSchemaZod = z.object({
    dayId: z.string(),
    time: z.string(),
    location: z.string(),
    notes: z.string(),
})
export const taskSchemaZod = createTaskSchemaZod.extend({
    _id: z.string()
})

export type createTaskType = z.infer<typeof createTaskSchemaZod>;
export type TaskType = z.infer<typeof taskSchemaZod>;
