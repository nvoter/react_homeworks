import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import useThemeMode from './theme/theme';
import NavigationBar from './components/NavigationBar';
import ProductList from './components/ProductList';

function App() {
  const theme = useThemeMode();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavigationBar onMenuToggle={toggleMenu} isMenuVisible={isMenuVisible} />
      <ProductList isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} />
    </ThemeProvider>
  );
}

export default App;
