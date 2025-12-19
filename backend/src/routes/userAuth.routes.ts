import express from 'express';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser } from '../controllers/users.controller';

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;