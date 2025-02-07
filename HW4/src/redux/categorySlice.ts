import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  id: string;
  name: string;
}

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [
    { id: 'default', name: 'Без категории' },
  ],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<Category>) {
      if (!state.categories.find(cat => cat.name === action.payload.name)) {
        state.categories.push(action.payload);
      }
    },
    updateCategory(state, action: PayloadAction<Category>) {
      const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    deleteCategory(state, action: PayloadAction<string>) {
      state.categories = state.categories.filter((cat) => cat.id !== action.payload);
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;