const { Category, Product } = require('../models');

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Поле name обязательно' });
    }

    const newCategory = await Category.create({ name });
    return res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }

    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Поле name обязательно' });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }

    category.name = name;
    await category.save();

    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }

    await category.destroy();
    return res.status(200).json({ message: 'Категория удалена успешно' });
  } catch (error) {
    next(error);
  }
};
