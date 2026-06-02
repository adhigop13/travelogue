// export interface TripType {
//     _id: string;
//     tripName: string;
//     daysArray: string[];
//     tripOwner: string;
// }

import { z } from "zod";

// 1. Define the Zod schema
// This is for runtime validation
export const tripSchemaZod = z.object({
  _id: z.string().optional(),
  tripName: z.string(),
  daysArray: z.array(z.string()),
});

export const deleteTripSchemaZod = z.object({
  tripId: z.string(),
});

// 2. Extract the TypeScript type
// This is for compile-time validation
export type TripType = z.infer<typeof tripSchemaZod>;
export type DeleteTripType = z.infer<typeof deleteTripSchemaZod>;