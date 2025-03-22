module.exports = (req, res, next) => {
    if (!req.user || req.user.group !== 'admin') {
        return res.status(403).json({ error: 'Доступ запрещен. Требуются права администратора.' });
    }
    next();
};
