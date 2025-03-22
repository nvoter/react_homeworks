const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User, RefreshToken } = require('../models');
const { Op } = require('sequelize');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
const ACCESS_TOKEN_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

const generateRefreshToken = () => {
  const token = crypto.randomBytes(64).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  return { token, tokenHash };
};

exports.register = async (req, res, next) => {
  try {
    console.log('***********************************');
    console.log(req.body);
    console.log('***********************************');
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Необходимо указать name, email и password' });
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ name }, { email }]
      }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Пользователь с таким именем или email уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({
      message: 'Пользователь зарегистрирован',
      user: { id: user.id, name: user.name, email: user.email, group: user.group }
    });
  } catch (error) {
    console.log('***********************************');
    console.log('error: ');
    console.log(error.message);
    console.log('***********************************');
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ error: 'Необходимо указать name и password' });
    }
    const user = await User.findOne({ where: { name } });
    if (!user) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }

    const accessToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email, group: user.group },
      JWT_SECRET,
      { algorithm: 'HS256', expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );

    const { token, tokenHash } = generateRefreshToken();
    await RefreshToken.create({ tokenHash, userId: user.id });

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', token, { httpOnly: true, secure: true });
    return res.json({ message: 'Успешный вход', accessToken, token });
  } catch (error) {
    console.log('***********************************');
    console.log('error: ');
    console.log(error.message);
    console.log('***********************************');
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
      await RefreshToken.destroy({ where: { tokenHash } });
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ message: 'Вы вышли из системы' });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: 'Нет refresh токена' });
    }
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const storedToken = await RefreshToken.findOne({ where: { tokenHash } });
    if (!storedToken) {
      return res.status(401).json({ error: 'Неверный refresh токен' });
    }
    const user = await User.findByPk(storedToken.userId);
    if (!user) {
      return res.status(401).json({ error: 'Пользователь не найден' });
    }
    const newAccessToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email, group: user.group, avatarUrl: user.avatarUrl },
      JWT_SECRET,
      { algorithm: 'HS256', expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );
    res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true });
    return res.json({ message: 'Новый access токен выдан', accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['name', 'email', 'group']
    });
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}