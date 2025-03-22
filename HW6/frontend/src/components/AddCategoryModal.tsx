import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { getAuthHeaders } from '../utils/getAuthHeaders';
import { fetchData } from '../utils/fetchData';

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSave = async () => {
    if (name.trim() === '') {
      setError(true);
      return;
    }

    try {
      const response = await fetchData('http://localhost:5001/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        toast.success('Категория успешно добавлена');
        setName('');
        setError(false);
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(`Ошибка при добавлении категории: ${errorData.error || 'Неизвестная ошибка'}`);
      }
    } catch (error) {
      console.error('Ошибка при добавлении категории:', error);
      toast.error('Не удалось подключиться к серверу');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавить категорию</DialogTitle>
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

export default AddCategoryModal;
