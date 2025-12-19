import { RegisterBody, LoginBody } from "../types";
import { Request, Response } from "express";
import UserModel from "../models/users.model";

export async function registerUser (req: Request<{}, {}, RegisterBody>, res: Response) {
    const { username, name, password, email } = req.body;
    if (!username || !name || !email || !password) {
        return res.status(400).json({error: "Missing required fields!"});
    } else {
        try {
            const userCreated = await UserModel.create(req.body);
            console.log("Hello");
            return res.status(201).json({user: userCreated});
        } catch (e) {
            if (e instanceof Error) {
                console.error("Error message:", e.message);
                return res.status(400).json({error: "Error when registering. " + e.message});
            } else {
                console.error("Unknown error:", e);
                return res.status(400).json({error: "Unknown error when registering"});
            }
        }
    }
}

export async function loginUser (req: Request<{}, {}, LoginBody>, res: Response) {
    const { username, password } = req.body;
    if (!username && !password) {
        return res.status(400).json({error: "Incorrect username or password"});
    } else {

    }
}