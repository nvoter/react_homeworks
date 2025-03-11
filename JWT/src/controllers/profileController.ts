import { Request, Response } from "express";
import { User } from '../types/User';

export const getProfile = (req: Request, res: Response) => {
    const user = req.user as User;
    res.json({ message: 'Profile', user });
};
