import jwt from 'jsonwebtoken';
import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { JWT_SECRET } from '../server';
import { User } from '../types/User';

export const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (error: Error | null, user: User | false) => {
        if (error || !user) {
            return res.status(400).json({ message: 'Authentication error' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token);
        res.json({ accessToken: token });
    })(req, res, next);
};
