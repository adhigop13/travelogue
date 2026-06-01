import { Request, Response } from 'express';
import TripModel from '../models/trips.model';
import UserModel from '../models/users.model';
import { daySchemaZod, taskSchemaZod, TripType } from '../types/index';
import { tripSchemaZod } from '../types/index';
import DayModel from '../models/days.model';
import { date } from 'zod';
import TaskModel from '../models/task.model';

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
        const {tripName, daysArray} = req.body;
        const isExistingTrip = await TripModel.findOne({tripName: tripName, tripOwner: res.locals.user.username});
        const isExistingUser = await UserModel.findOne({username: res.locals.user.username});
        if (isExistingTrip) {
            return res.status(409).json({error: "This trip already exists! Please try again with a new name..."})
        } 
        if (!isExistingUser) {
            return res.status(400).json({error: "Invalid user! Please provide valid user id..."})
        }
        const newlyCreatedTrip = await TripModel.create({
            tripName: tripName,
            daysArray: daysArray,
            tripOwner: res.locals.user.username
        })
        res.status(201).json({trip: newlyCreatedTrip});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function addNewDay(req: Request, res: Response) {
    try {
        const parseResult = daySchemaZod.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({error: "Malformed or invalid request"});
        }
        const {tripId, dayName, date, tasks} = req.body;
        
        const isExistingTrip = await TripModel.findOne({_id: tripId, tripOwner: res.locals.user.username})
        if (!isExistingTrip) {
            return res.status(404).json({error: "Trip does not exist!"})
        }
        // trip exists, check if day already exists with same date
        const isExistingDay = await DayModel.findOne({ tripId: tripId, date: date });
        if (isExistingDay) {
            return res.status(409).json({error: "A day with same date already exists in this trip! Please try with a different date"});
        }
        // trip exists, day doesn't exist in that trip. So can add
        const newlyCreatedDay = await DayModel.create({
            tripId: tripId,
            dayName: dayName,
            date: date,
            tasks: []
        })
        const updatedTrip = await TripModel.findByIdAndUpdate(tripId, { $push: { daysArray: newlyCreatedDay._id } }, { new: true });
        res.status(201).json({updatedTrip: updatedTrip});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export async function addNewTask(req: Request, res: Response) {
    try {
        const parseResult = taskSchemaZod.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({error: "Malformed or invalid request!"});
        }
        const {dayId, time, taskDescription, location, notes} = req.body;

        const isExistingDay = await DayModel.findOne({ _id: dayId});
        const tripId = isExistingDay?.tripId;
        console.log(res.locals.user.username)
        const isExistingTrip = await TripModel.findOne({_id: tripId, tripOwner: res.locals.user.username})
        if (!isExistingDay || !isExistingTrip) {
            return res.status(404).json({ error: "Trip / Day does not exist!"}) // if user tries to add task to another user's trip
        }

        const newlyCreatedTask = await TaskModel.create({
            dayId: dayId,
            time: time,
            taskDescription: taskDescription,
            location: location,
            notes: notes 
        });

        const updatedDay = await DayModel.findByIdAndUpdate(dayId, { $push: { tasksArray: newlyCreatedTask._id } }, { new: true });
        res.status(201).json({updatedDay: updatedDay});
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}