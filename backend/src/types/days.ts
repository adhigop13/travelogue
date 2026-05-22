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
    date: z.string(),
    tasks: z.array(z.string())
})

export type DayType = z.infer<typeof daySchemaZod>;
