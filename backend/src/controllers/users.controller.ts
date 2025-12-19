import { RegisterBody, LoginBody } from "../types";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import UserModel from "../models/users.model";

export async function registerUser (req: Request<{}, {}, RegisterBody>, res: Response) {
    const { username, name, password, email } = req.body;
    if (!username || !name || !email || !password) {
        return res.status(400).json({error: "Missing required fields!"});
    } else {
        try {
            console.log(req.body);
            const userCreated = await UserModel.create(req.body);
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
    let userDetails;
    if (!username || !password) {
        return res.status(400).json({error: "Username and password cannot be blank!"});
    } else {
        const userDetails = await UserModel.findOne({username:req.body.username});   //Return null if not found
        if (!userDetails || req.body.password !== userDetails.password) {    //Need to change this later.
            return res.status(401).json({error: "Incorrect username or password!"});
        } else {    //Valid user. But need to change this later for pwd decryption
            const payload = {
                username: userDetails.username,
                name: userDetails.name,
                email: userDetails.email
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET!, {
                expiresIn: '1h' // Token expires in 1 hour
            });
            return res.status(201).json({
                message: "Login successful",
                token: token
            });
        }
    }
}