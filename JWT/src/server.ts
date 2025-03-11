import express from 'express';
import passport from 'passport';
import { User, mockUser, validatePassword } from './types/User';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import authRouter from './routes/authRoutes';
import profileRouter from './routes/profileRoutes';
import dotenv from 'dotenv';

dotenv.config();
export const JWT_SECRET: string = process.env.JWT_SECRET || 'jwt_secret';

const app = express();
app.use(express.json());
app.use(passport.initialize());

let user: User | null = null;
(async () => {
  user = await mockUser();
})();

passport.use(new LocalStrategy(async (username, password, done) => {
  if (!user || username !== user.username) {
      return done(null, false, { message: 'Incorrect username' });
  }

  const isValidPassword = await validatePassword(user, password);
  if (!isValidPassword) {
    return done(null, false, { message: 'Incorrect password' });
  }

  return done(null, user);
}));

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
        secretOrKey: JWT_SECRET
    }, 
    (jwtPayload: { id: string }, done: any) => {
        if(jwtPayload.id === user?.id) {
            return done(null, user);
        }

        return done(null, false);
    }
));

app.use('/', authRouter);
app.use('/', profileRouter);

const port = 3000;
app.listen(port, () => console.log(`Server listens on http://localhost:${port}`));
