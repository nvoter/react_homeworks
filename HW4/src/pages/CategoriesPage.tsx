import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/types';
import { deleteCategory, addCategory, updateCategory } from '../redux/categorySlice';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddCategoryModal from '../components/AddCategoryModal';
import EditCategoryModal from '../components/EditCategoryModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';

const CategoriesPage: React.FC = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const dispatch = useDispatch();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<null | { id: string; name: string }>(null);

  return (
    <Box sx={{ padding: 3, marginTop: '64px' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Управление категориями</Typography>
      <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
        Добавить категорию
      </Button>
      <List>
        {categories.map(category => (
          <ListItem key={category.id} secondaryAction={
            category.name !== 'Без категории' && (
              <>
                <IconButton edge="end" onClick={() => setEditCategory(category)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => dispatch(deleteCategory(category.id))}>
                  <DeleteIcon />
                </IconButton>
              </>
            )
          }>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
      {isAddModalOpen && (
         <AddCategoryModal
           open={isAddModalOpen}
           onClose={() => setAddModalOpen(false)}
           onSave={(name: string) => {
             dispatch(addCategory({ id: uuidv4(), name }));
             setAddModalOpen(false);
           }}
         />
      )}
      {editCategory && (
         <EditCategoryModal
           open={Boolean(editCategory)}
           onClose={() => setEditCategory(null)}
           category={editCategory}
           onSave={(updatedCategory) => {
             dispatch(updateCategory(updatedCategory));
             setEditCategory(null);
           }}
         />
      )}
    </Box>
  );
};

export default CategoriesPage;