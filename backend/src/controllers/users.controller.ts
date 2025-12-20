import { RegisterBody, LoginBody } from "../types";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import UserModel from "../models/users.model";
import { hashPwd, compareHashes } from "../helpers/pwd_hash";

export async function registerUser (req: Request<{}, {}, RegisterBody>, res: Response) {
    const { username, name, password, email } = req.body;
    if (!username || !name || !email || !password) {
        return res.status(400).json({error: "Missing required fields!"});
    } else {
        try {
            const isExistingUserId = await UserModel.findOne({username: req.body.username});
            const isExistingUserEmail = await UserModel.findOne({email: req.body.email});
            if (isExistingUserId) {
                return res.status(409).json({error: "Username already taken"});
            }
            if (isExistingUserEmail) {
                return res.status(409).json({error: "Email already taken."});
            }

            const hashedPwd = await hashPwd(password);
            const userCreated = await UserModel.create({
                username: username,
                name: name,
                email: email,
                password: hashedPwd,
            });
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
        if (!userDetails) {
            return res.status(401).json({error: "Invalid email or password."});
        }
        else {
            const hashedPwdOnDB = userDetails.password;
            const isSamePwd = await compareHashes(password, hashedPwdOnDB);
            if (!isSamePwd) {
                return res.status(401).json({error: "Invalid email or password."});
            }
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