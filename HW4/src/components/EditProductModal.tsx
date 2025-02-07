import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Autocomplete,
} from '@mui/material';
import { Product } from '../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/types';
import { addCategory } from '../redux/categorySlice';
import { v4 as uuidv4 } from 'uuid';

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
  onSave: (product: Product) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ open, onClose, product, onSave }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const categoryOptions = categories.map((cat) => cat.name);

  const [formValues, setFormValues] = useState({
    name: product.name,
    description: product.description,
    category: product.category || 'Без категории',
    quantity: product.quantity.toString(),
    unit: product.unit.toString(),
    price: product.price.toString(),
    imageUrl: product.imageUrl || '',
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    quantity: false,
    unit: false,
    price: false,
  });

  useEffect(() => {
    setFormValues({
      name: product.name,
      description: product.description,
      category: product.category || 'Без категории',
      quantity: product.quantity.toString(),
      unit: product.unit.toString(),
      price: product.price.toString(),
      imageUrl: product.imageUrl || '',
    });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (value: string | null) => {
    setFormValues({
      ...formValues,
      category: value || '',
    });
  };

  const validate = () => {
    const quantityNumber = parseInt(formValues.quantity, 10);
    const priceNumber = parseFloat(formValues.price);
    const newErrors = {
      name: formValues.name.trim() === '',
      description: formValues.description.trim() === '',
      quantity:
        formValues.quantity.trim() === '' || (isNaN(quantityNumber) || quantityNumber < 0),
      unit: formValues.unit.trim() === '',
      price:
        formValues.price.trim() === '' || (isNaN(priceNumber) || priceNumber < 0),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((x) => x);
  };

  const handleSave = () => {
    if (validate()) {
      let finalCategory = formValues.category.trim() || 'Без категории';
      if (finalCategory !== 'Без категории' && !categoryOptions.includes(finalCategory)) {
        dispatch(addCategory({ id: uuidv4(), name: finalCategory }));
      }
      const updatedProduct: Product = {
        id: product.id,
        name: formValues.name,
        description: formValues.description,
        category: finalCategory,
        quantity: parseInt(formValues.quantity, 10),
        unit: formValues.unit,
        price: parseFloat(formValues.price),
        imageUrl: formValues.imageUrl || undefined,
      };
      onSave(updatedProduct);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: '800px' },
      }}
    >
      <DialogTitle>Редактировать товар</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Название товара"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            error={errors.name}
            helperText={errors.name ? 'Обязательное поле' : ''}
          />
          <TextField
            label="Описание"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            error={errors.description}
            helperText={errors.description ? 'Обязательное поле' : ''}
          />
          <Autocomplete
            freeSolo
            options={categoryOptions}
            value={formValues.category}
            onChange={(_, newValue) => handleCategoryChange(newValue)}
            onInputChange={(_, newInputValue) => handleCategoryChange(newInputValue)}
            renderInput={(params) => (
              <TextField {...params} label="Категория (необязательно)" />
            )}
          />
          <TextField
            label="Количество на складе"
            name="quantity"
            type="number"
            value={formValues.quantity}
            onChange={handleChange}
            error={errors.quantity}
            helperText={
              errors.quantity ? 'Обязательное поле и значение должно быть неотрицательным' : ''
            }
          />
          <TextField
            label="Единицы измерения"
            name="unit"
            type="string"
            value={formValues.unit}
            onChange={handleChange}
            error={errors.unit}
            helperText={
              errors.unit ? 'Обязательное поле' : ''
            }
          />
          <TextField
            label="Цена"
            name="price"
            type="number"
            value={formValues.price}
            onChange={handleChange}
            error={errors.price}
            helperText={
              errors.price ? 'Обязательное поле и значение должно быть неотрицательным' : ''
            }
            InputProps={{
              inputProps: { min: 0 },
              sx: {
                '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                  display: 'none',
                },
                '& input[type=number]': {
                  MozAppearance: 'textfield',
                },
              },
            }}
          />
          <TextField
            label="URL изображения"
            name="imageUrl"
            value={formValues.imageUrl}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;