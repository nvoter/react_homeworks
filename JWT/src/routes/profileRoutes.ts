import { Router } from 'express';
import { getProfile } from '../controllers/profileController';
import passport from 'passport';

const profileRouter = Router();

profileRouter.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);

export default profileRouter;
