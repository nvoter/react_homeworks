import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';

interface Category {
  id: number;
  name: string;
}

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: Category;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ open, onClose, category }) => {
  const [name, setName] = useState(category.name);
  const [error, setError] = useState(false);

  useEffect(() => {
    setName(category.name);
  }, [category]);

  const handleSave = async () => {
    if (name.trim() === '') {
      setError(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/categories/${category.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        toast.success('Категория успешно обновлена');
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(`Ошибка при обновлении категории: ${errorData.error || 'Неизвестная ошибка'}`);
      }
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
      toast.error('Не удалось подключиться к серверу');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактировать категорию</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Название категории"
          fullWidth
          value={name}
          onChange={(e) => { setName(e.target.value); setError(false); }}
          error={error}
          helperText={error ? "Обязательное поле" : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryModal;
