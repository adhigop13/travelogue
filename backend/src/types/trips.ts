import { z } from "zod";
import { daySchemaZod } from "./days";
import {taskSchemaZod} from "./tasks";

//  For data sent to your API (new trips sent from frontend don't yet have _id)
export const createTripSchemaZod = z.object({
  tripName: z.string(),
  daysArray: z.array(z.string()),
});

// For data existing in the database or returning from your API
export const tripSchemaZod = createTripSchemaZod.extend({
  _id: z.string(), // Required for existing database records
  tripOwner: z.string(),
});

export const deleteTripSchemaZod = z.object({
  tripId: z.string(),
});


// 2. Extract the TypeScript type
// This is for compile-time validation
export type createTripType = z.infer<typeof createTripSchemaZod>;
export type TripType = z.infer<typeof tripSchemaZod>;
export type DeleteTripType = z.infer<typeof deleteTripSchemaZod>;



// for fully populated trip details
// 1. Fully populated Day (takes base day, replaces task IDs with task objects)
export const populatedDaySchemaZod = daySchemaZod.extend({
  tasksArray: z.array(taskSchemaZod), 
});

// 2. Fully populated Trip (takes base trip, replaces day IDs with populated day objects)
export const populatedTripSchemaZod = tripSchemaZod.extend({
  daysArray: z.array(populatedDaySchemaZod),
});
// 3. Extract the Populated TypeScript Type
export type PopulatedTrip = z.infer<typeof populatedTripSchemaZod>;