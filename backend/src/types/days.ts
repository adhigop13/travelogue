// import mongoose from "mongoose";

// export interface DayType {
//     dayName: String,
//     date: Date,
//     tasks: mongoose.Schema.Types.ObjectId
// }

import { z } from "zod";

export const daySchemaZod = z.object({
    tripId: z.string(),
    dayName: z.string(),
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
      message: "Invalid date format"
    }),
    tasksArray: z.array(z.string()).optional()
});


export type DayType = z.infer<typeof daySchemaZod>;
