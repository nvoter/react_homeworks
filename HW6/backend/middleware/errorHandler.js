module.exports = (err, req, res, next) => {
  console.error('Ошибка:', err);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
  