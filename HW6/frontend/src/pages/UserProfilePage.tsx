import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '../utils/getAuthHeaders';
import { fetchData } from '../utils/fetchData';

interface UserProfile {
  name: string;
  email: string;
  group: string;
}

const UserProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await fetchData('http://localhost:5001/api/auth/profile', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Ошибка при получении данных профиля');
      }
    } catch (error) {
      console.error('Ошибка при получении данных профиля:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetchData('http://localhost:5001/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });
      if (response.ok) {
        localStorage.removeItem('accessToken');
        navigate('/login');
      } else {
        console.error('Ошибка при выходе из аккаунта');
      }
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта:', error);
    }
  };

  return (
    <Box sx={{ padding: 3, marginTop: '64px' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Профиль пользователя</Typography>
      <Avatar
        src="https://via.placeholder.com/150"
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      {profile ? (
        <>
          <Typography variant="h6">Имя: {profile.name}</Typography>
          <Typography variant="body1">Email: {profile.email}</Typography>
          <Typography variant="body1">Группа: {profile.group}</Typography>
        </>
      ) : (
        <Typography variant="body1">Загрузка данных...</Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
        Выйти из аккаунта
      </Button>
    </Box>
  );
};

export default UserProfilePage;
