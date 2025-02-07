import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Category } from '../redux/categorySlice';

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: Category;
  onSave: (category: Category) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ open, onClose, category, onSave }) => {
  const [name, setName] = useState(category.name);
  const [error, setError] = useState(false);

  useEffect(() => {
    setName(category.name);
  }, [category]);

  const handleSave = () => {
    if (name.trim() === '') {
      setError(true);
      return;
    }
    onSave({ ...category, name });
    onClose();
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