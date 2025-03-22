import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ name: '', password: '' });
  const [errors, setErrors] = useState({ name: false, password: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name || !formValues.password) {
      setErrors({ name: !formValues.name, password: !formValues.password });
      return;
    }
    try {
      console.log(formValues);
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Успешный вход');
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.token);
        navigate('/');
      } else {
        toast.error(data.error || 'Ошибка авторизации');
      }
    } catch (error) {
      toast.error('Ошибка подключения к серверу');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
          Вход в систему
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Войти
          </Button>
        </form>
        <Button onClick={() => navigate('/register')} fullWidth sx={{ mt: 1 }}>
          Регистрация
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
