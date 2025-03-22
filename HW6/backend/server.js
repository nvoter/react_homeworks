const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User } = require('./models');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      (req) => req.cookies && req.cookies.accessToken
    ]),
    secretOrKey: JWT_SECRET,
    algorithms: ['HS256']
}, async (payload, done) => {
    try {
      const user = await User.findByPk(payload.id);
      if (user) {
         return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
}));

app.use(passport.initialize());

app.use('/api/auth', authRoutes);

const passportJWT = passport.authenticate('jwt', { session: false });
app.use('/api/products', passportJWT, productRoutes);
app.use('/api/categories', passportJWT, categoryRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
sequelize.sync().then(() => {
  console.log('Соединение с БД установлено успешно');
  app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
}).catch((err) => {
  console.error('Ошибка подключения к БД:', err);
});
