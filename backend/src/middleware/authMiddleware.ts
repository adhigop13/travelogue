// Middleware
import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

//Validate JWT
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, jwtSecret);
    res.locals.user = decoded; // attach user info here
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

export default authMiddleware;