import { Request, Response } from 'express';
import Trip from '../models/trips.model';

export async function getTrips(req: Request, res: Response) {
    console.log("Endpoint hit!");
    try {
            console.log(res.locals.user.username)
            const trips = await Trip.find({tripOwner: res.locals.user.username});
            console.log("Trips found:", trips);
            res.status(200).json(trips);
    }
    catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}