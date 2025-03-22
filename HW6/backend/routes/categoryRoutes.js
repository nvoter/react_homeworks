const express = require('express');
const checkAccess = require('../middleware/checkAccess');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

router.post('/', checkAccess, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', checkAccess, updateCategory);
router.delete('/:id', checkAccess, deleteCategory);

module.exports = router;
