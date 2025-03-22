const express = require('express');
const checkAccess = require('../middleware/checkAccess');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.post('/', checkAccess, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', checkAccess, updateProduct);
router.delete('/:id', checkAccess, deleteProduct);

module.exports = router;
