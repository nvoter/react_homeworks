import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSave = () => {
    if (name.trim() === '') {
      setError(true);
      return;
    }
    onSave(name);
    setName('');
    setError(false);
    onClose();
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