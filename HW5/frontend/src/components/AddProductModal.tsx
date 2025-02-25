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

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    category: 'Без категории',
    quantity: '',
    unit: '',
    price: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    quantity: false,
    unit: false,
    price: false,
  });
  const [categories, setCategories] = useState<string[]>([]); // Список категорий

  // Загрузка категорий с бэкенда
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
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

      // Добавляем новую категорию, если она не существует
      if (!categories.includes(finalCategory)) {
        const categoryResponse = await fetch('http://localhost:5000/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: finalCategory }),
        });

        if (categoryResponse.ok) {
          toast.success('Категория успешно добавлена');
          onClose();
        } else if (categoryResponse.status === 409) {
          toast.error('Категория с таким именем уже существует');
        } else {
          const errorData = await categoryResponse.json();
          toast.error(`Ошибка при добавлении категории: ${errorData.error || 'Неизвестная ошибка'}`);
        }
        // Обновляем список категорий
        setCategories((prev) => [...prev, finalCategory]);
      }

      // Добавляем новый продукт
      const productResponse = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        throw new Error('Не удалось добавить продукт');
      }

      toast.success('Продукт успешно добавлен');
      setFormValues({
        name: '',
        description: '',
        category: 'Без категории',
        quantity: '',
        unit: '',
        price: '',
        imageUrl: '',
      });
      onClose();
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
      toast.error('Не удалось добавить продукт');
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
      <DialogTitle>Добавить товар</DialogTitle>
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
            helperText={errors.quantity ? 'Обязательное поле. Значение не может быть отрицательным' : ''}
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
            helperText={errors.price ? 'Обязательное поле. Значение не может быть отрицательным' : ''}
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

export default AddProductModal;
