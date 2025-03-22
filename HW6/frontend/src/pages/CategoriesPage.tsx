import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddCategoryModal from '../components/AddCategoryModal';
import EditCategoryModal from '../components/EditCategoryModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { getAuthHeaders } from '../utils/getAuthHeaders';
import { fetchData } from '../utils/fetchData';

interface Category {
  id: number;
  name: string;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<null | Category>(null);

  const fetchCategories = async () => {
    try {
      const response = await fetchData('http://localhost:5001/api/categories', {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Ошибка при загрузке категорий:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await fetchData(`http://localhost:5001/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });

      if (response.ok) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        toast.success('Категория успешно удалена');
      } else {
        const errorData = await response.json();
        toast.error(`Ошибка при удалении категории: ${errorData.error || 'Неизвестная ошибка'}`);
      }
    } catch (error) {
      console.error('Ошибка при удалении категории:', error);
      toast.error('Не удалось подключиться к серверу');
    }
  };

  const handleAddCategoryModalOnClose = () => {
    fetchCategories();
    setAddModalOpen(false);
  };

  const handleEditCategoryModalOnClose = () => {
    fetchCategories();
    setEditCategory(null);
  };

  return (
    <Box sx={{ padding: 3, marginTop: '64px' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Управление категориями</Typography>
      <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
        Добавить категорию
      </Button>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category.id}
            secondaryAction={
              category.name !== 'Без категории' && (
                <>
                  <IconButton edge="end" onClick={() => setEditCategory(category)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDeleteCategory(category.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )
            }
          >
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
      {isAddModalOpen && (
        <AddCategoryModal
          open={isAddModalOpen}
          onClose={handleAddCategoryModalOnClose}
        />
      )}
      {editCategory && (
        <EditCategoryModal
          open={Boolean(editCategory)}
          onClose={handleEditCategoryModalOnClose}
          category={editCategory}
        />
      )}
    </Box>
  );
};

export default CategoriesPage;
