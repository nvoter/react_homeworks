import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Box } from '@mui/material';
import { MdMenu, MdShoppingCart, MdWarehouse, MdInfo, MdPerson, MdArrowBack } from 'react-icons/md';
import NavigationBarButton from './NavigationBarButton';

interface NavigationBarProps {
  onMenuToggle: () => void;
  isMenuVisible: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onMenuToggle, isMenuVisible }) => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuToggle}>
          {isMenuVisible ? <MdArrowBack /> : <MdMenu />}
        </IconButton>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, marginLeft: 2 }}>
          <NavigationBarButton label="Товары" Icon={MdShoppingCart} />
          <NavigationBarButton label="Склады" Icon={MdWarehouse} />
          <NavigationBarButton label="О системе" Icon={MdInfo} />
          <NavigationBarButton label="Профиль" Icon={MdPerson} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;