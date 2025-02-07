import React, { useState } from 'react';
import {
  Drawer,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Product } from '../types/types';
import { useSideMenu } from '../contexts/SideMenuContext';

interface SideMenuProps {
  products: Product[];
  setFilters: React.Dispatch<
    React.SetStateAction<{
      name: string;
      inStock: boolean;
      category: string;
    }>
  >;
}

const SideMenu: React.FC<SideMenuProps> = ({ products, setFilters }) => {
  const { isSideMenuVisible, closeSideMenu } = useSideMenu();
  const categories = Array.from(
    new Set(products.map((product) => product.category || 'Без категории'))
  );
  const [name, setName] = useState('');
  const [inStock, setInStock] = useState(false);
  const [category, setCategory] = useState('Все товары');

  const handleFilter = () => {
    setFilters({ name, inStock, category });
    closeSideMenu();
  };

  const handleReset = () => {
    setName('');
    setInStock(false);
    setCategory('Все товары');
    setFilters({ name: '', inStock: false, category: 'Все товары' });
    closeSideMenu();
  };

  const commonInputStyles = {
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'text.primary' },
    '& .MuiInputLabel-root': { color: 'text.primary' },
    '&.Mui-focused .MuiInputLabel-root': { color: 'text.primary' },
    '& .MuiInputBase-input': { color: 'text.primary' },
  };

  return (
    <Drawer anchor="left" open={isSideMenuVisible} onClose={closeSideMenu}>
      <Box sx={{ width: 250, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Фильтры</Typography>
          <IconButton onClick={closeSideMenu}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TextField
          label="Название товара"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={commonInputStyles}
          InputProps={{
            endAdornment: name && (
              <IconButton onClick={() => setName('')}>
                <CloseIcon />
              </IconButton>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              sx={{ color: 'text.primary', '&.Mui-checked': { color: 'text.primary' } }}
            />
          }
          label="В наличии"
        />
        <Autocomplete
          options={['Все товары', ...categories]}
          value={category}
          onChange={(_, newValue) => setCategory(newValue || 'Все товары')}
          renderInput={(params) => (
            <TextField {...params} label="Категория" variant="outlined" sx={commonInputStyles} />
          )}
        />
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleFilter} fullWidth>
            Применить
          </Button>
          <Button variant="contained" color="primary" onClick={handleReset} fullWidth>
            Сброс
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SideMenu;