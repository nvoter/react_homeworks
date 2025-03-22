import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MdMenu, MdArrowBack } from 'react-icons/md';
import { useTheme } from '@mui/material/styles';
import { useSideMenu } from '../contexts/SideMenuContext';

const NavigationBar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const { isSideMenuVisible, toggleSideMenu } = useSideMenu();

  const navButtonStyle = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    borderRadius: '20px',
    px: 2,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        {location.pathname === '/' && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSideMenu}
          >
            {isSideMenuVisible ? <MdArrowBack /> : <MdMenu />}
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, ml: 2 }}>
          <Button component={RouterLink} to="/" sx={navButtonStyle}>
            Список товаров
          </Button>
          <Button component={RouterLink} to="/categories" sx={navButtonStyle}>
            Категории
          </Button>
          <Button component={RouterLink} to="/profile" sx={navButtonStyle}>
            Профиль
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;