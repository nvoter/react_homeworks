import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import UserProfilePage from './pages/UserProfilePage';
import useThemeMode from './theme/theme';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SideMenuProvider } from './contexts/SideMenuContext';

const App: React.FC = () => {
  const theme = useThemeMode();

  return (
    <Provider store={store}>
      <SideMenuProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </SideMenuProvider>
    </Provider>
  );
};

export default App;