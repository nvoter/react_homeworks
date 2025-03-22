import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ name: '', email: '', password: '', confirmPassword: '', avatarUrl: '' });
  const [errors, setErrors] = useState({ name: false, email: false, password: false, confirmPassword: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: !formValues.name,
      email: !formValues.email,
      password: !formValues.password,
      confirmPassword: formValues.password !== formValues.confirmPassword,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err)) return;
    try {
      console.log(JSON.stringify({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      }));
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Регистрация успешна');
        navigate('/login');
      } else {
        toast.error(data.error || 'Ошибка регистрации');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя пользователя"
            name="name"
            fullWidth
            margin="normal"
            value={formValues.name}
            onChange={handleChange}
            error={errors.name}
            helperText={errors.name ? 'Обязательное поле' : ''}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formValues.email}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email ? 'Обязательное поле' : ''}
          />
          <TextField
            label="Пароль"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formValues.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password ? 'Обязательное поле' : ''}
          />
          <TextField
            label="Подтвердите пароль"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={formValues.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            helperText={errors.confirmPassword ? 'Пароли не совпадают' : ''}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Зарегистрироваться
          </Button>
        </form>
        <Button onClick={() => navigate('/login')} fullWidth sx={{ mt: 1 }}>
          Уже есть аккаунт? Войти
        </Button>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
