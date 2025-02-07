import { ProductState } from './productSlice';
import { CategoryState } from './categorySlice';

export interface RootState {
  products: ProductState;
  categories: CategoryState;
}