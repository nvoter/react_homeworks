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
import { toast } from 'react-toastify';
import { Product } from '../types/types'
import { getAuthHeaders } from '../utils/getAuthHeaders';
import { fetchData } from '../utils/fetchData';

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ open, onClose, product }) => {
  const [formValues, setFormValues] = useState({
    name: product.name,
    description: product.description,
    category: product.category || 'Без категории',
    quantity: product.quantity.toString(),
    unit: product.unit,
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

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
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
          setCategories(data.map((cat: { name: string }) => cat.name));
        } else {
          console.error('Ошибка при загрузке категорий:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setFormValues({
      name: product.name,
      description: product.description,
      category: product.category || 'Без категории',
      quantity: product.quantity.toString(),
      unit: product.unit,
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
        formValues.quantity.trim() === '' ||
        isNaN(quantityNumber) ||
        quantityNumber < 0,
      unit: formValues.unit.trim() === '',
      price:
        formValues.price.trim() === '' ||
        isNaN(priceNumber) ||
        priceNumber < 0,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((x) => x);
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const finalCategory = formValues.category.trim() || 'Без категории';

      if (!categories.includes(finalCategory)) {
        const categoryResponse = await fetchData('http://localhost:5001/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          },
          body: JSON.stringify({ name: finalCategory }),
        });

        if (!categoryResponse.ok) {
          throw new Error('Не удалось добавить категорию');
        }

        setCategories((prev) => [...prev, finalCategory]);
      }

      const productResponse = await fetchData(`http://localhost:5001/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          name: formValues.name,
          description: formValues.description,
          category: finalCategory,
          quantity: parseInt(formValues.quantity, 10),
          unit: formValues.unit,
          price: parseFloat(formValues.price),
          imageUrl: formValues.imageUrl || undefined,
        }),
      });

      if (!productResponse.ok) {
        throw new Error('Не удалось обновить продукт');
      }

      toast.success('Продукт успешно обновлен');
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error);
      toast.error('Не удалось обновить продукт');
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
            options={categories}
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
            value={formValues.unit}
            onChange={handleChange}
            error={errors.unit}
            helperText={errors.unit ? 'Обязательное поле' : ''}
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
