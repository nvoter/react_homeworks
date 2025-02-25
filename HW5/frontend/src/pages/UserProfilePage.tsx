import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const UserProfilePage: React.FC = () => {
  const user = {
    name: 'Иван Иванов',
    email: 'ivan.ivanov@example.com',
    group: 'Студент',
    avatarUrl: 'https://via.placeholder.com/150'
  };

  return (
    <Box sx={{ padding: 3, marginTop: '64px' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Профиль пользователя</Typography>
      <Avatar src={user.avatarUrl} sx={{ width: 100, height: 100, marginBottom: 2 }} />
      <Typography variant="h6">Имя: {user.name}</Typography>
      <Typography variant="body1">Email: {user.email}</Typography>
      <Typography variant="body1">Группа: {user.group}</Typography>
    </Box>
  );
};

export default UserProfilePage;