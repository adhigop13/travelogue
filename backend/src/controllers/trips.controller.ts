import { Request, Response } from 'express';
import TripModel from '../models/trips.model';
import UserModel from '../models/users.model';
import { TripType } from '../types/index';
import { tripSchemaZod } from '../types/index';

export async function getTrips(req: Request, res: Response) {
    console.log("Received trips!");
    try {
            console.log(res.locals.user.username)
            const tripOwner: string = res.locals.user.username;
            const trips = await TripModel.find({tripOwner: tripOwner});
            console.log("Trips found:", trips);
            res.status(200).json(trips);
    }
    catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function createTrip(req: Request, res: Response) {
    try {
        const parseResult = tripSchemaZod.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({error: "Malformed or invalid request"});
        } 
        const {tripName, daysArray, tripOwner} = req.body;
        const isExistingTrip = await TripModel.findOne({tripName: tripName});
        const isExistingUser = await UserModel.findOne({username: tripOwner});
        if (isExistingTrip) {
            return res.status(409).json({error: "This trip already exists! Please try again with a new name..."})
        } 
        if (!isExistingUser) {
            return res.status(400).json({error: "Invalid user! Please provide valid user id..."})
        }
        const newlyCreatedTrip = await TripModel.create({
            tripName: tripName,
            daysArray: daysArray,
            tripOwner: tripOwner
        })
        res.status(201).json({trip: newlyCreatedTrip});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}