const { Product, Category } = require('../models');

exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      quantity,
      price,
      unit,
      image_url,
      category,
    } = req.body;

    if (!name || !description || !quantity || !price || !category) {
      return res.status(400).json({
        error: 'Необходимо указать поля: name, description, quantity, price, category (строка)',
      });
    }

    const [foundCategory] = await Category.findOrCreate({
      where: { name: category },
      defaults: { name: category },
    });

    const newProduct = await Product.create({
      name,
      description,
      quantity,
      price,
      unit,
      image_url,
      category_id: foundCategory.id,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const transform = (product) => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category.name,
    quantity: product.quantity,
    unit: product.unit,
    price: product.price,
    image_url: product.image_url
  };
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    const options = {
      include: [{ model: Category, as: 'category' }],
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
    };

    const products = await Product.findAll(options);
    return res.status(200).json(products.map(transform));
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId, {
      include: [{ model: Category, as: 'category' }],
    });

    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    return res.status(200).json(transform(product));
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const {
      name,
      description,
      quantity,
      price,
      unit,
      image_url,
      category,
    } = req.body;

    if (!name || !description || !quantity || !price || !category) {
      return res.status(400).json({ error: 'Обязательные поля: name, description, quantity, price, category' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }

    const [foundCategory] = await Category.findOrCreate({
      where: { name: category },
      defaults: { name: category },
    });

    product.name = name;
    product.description = description;
    product.quantity = quantity;
    product.price = price;
    product.unit = unit;
    product.image_url = image_url;
    product.category_id = foundCategory.id;

    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }

    await product.destroy();
    return res.status(200).json({ message: 'Товар удалён успешно' });
  } catch (error) {
    next(error);
  }
};
