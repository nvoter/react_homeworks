const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); 
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

const app = express();

app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
sequelize
  .sync()
  .then(() => {
    console.log('Соединение с БД установлено успешно');
    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Ошибка подключения к БД:', err);
  });
