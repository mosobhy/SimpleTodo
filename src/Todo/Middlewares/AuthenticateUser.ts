import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'

dotenv.config()

const authenticateUser = (req: RequestWithUser, res: Response, next: NextFunction) => {

    let secretKey = process.env.JWT_SECRET_KEY 
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, String(secretKey), (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded as { username: string };
        next();
    });
}

export interface RequestWithUser extends Request {
    user?: { username: string };
}

export default authenticateUser;