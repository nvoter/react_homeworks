import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './types';
import { deleteCategory, Category } from './categorySlice';
import { Product } from '../types/types';

const checkCategoryDeletionMiddleware: Middleware<{}, RootState> = (storeAPI) => (next) => (action: any) => {
  if (action.type === deleteCategory.type) {
    const state = storeAPI.getState();
    const categoryIdToDelete: string = action.payload;
    const category = state.categories.categories.find((cat: Category) => cat.id === categoryIdToDelete);
    if (category) {
      if (category.name === 'Без категории') {
        alert("Категорию 'Без категории' удалить нельзя.");
        return;
      }
      const isUsed = state.products.products.some(
        (product: Product) => product.category === category.name
      );
      if (isUsed) {
        alert('Нельзя удалить категорию, так как она используется одним или несколькими товарами.');
        return;
      }
    }
  }
  return next(action);
};

export default checkCategoryDeletionMiddleware;