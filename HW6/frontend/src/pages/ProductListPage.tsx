import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import SideMenu from '../components/SideMenu';
import AddProductModal from '../components/AddProductModal';
import { Product } from '../types/types';
import { getAuthHeaders } from '../utils/getAuthHeaders';

const ProductListPage: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    name: '',
    inStock: false,
    category: 'Все товары',
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products', {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Ошибка при загрузке товаров:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (filters.name) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.quantity > 0);
    }
    if (filters.category && filters.category !== 'Все товары') {
      filtered = filtered.filter((product) => product.category === filters.category);
    }
    setFilteredProducts(filtered);
  }, [products, filters]);

  const handleDeleteProduct = (id: string) => {
    fetch(`http://localhost:5001/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      }
    })
      .then((response) => {
        if (response.ok) {
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
          setFilteredProducts((prevFiltered) => prevFiltered.filter((product) => product.id !== id));
        } else {
          console.error('Ошибка при удалении продукта:', response.statusText);
        }
      })
      .catch((error) => console.error('Ошибка при удалении продукта:', error));
  };

  const handleAddProductModalOnClose = () => {
    setAddModalOpen(false);
    fetchProducts();
  };

  return (
    <Box sx={{ padding: 2, mt: '64px' }}>
      <SideMenu products={products} setFilters={setFilters} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
          Добавить товар
        </Button>
      </Box>

      {filteredProducts.length > 0 ? (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id}>
              <ProductCard product={product} onDelete={() => handleDeleteProduct(product.id)} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">Нет товаров</Typography>
      )}

      <AddProductModal open={isAddModalOpen} onClose={handleAddProductModalOnClose} />
    </Box>
  );
};

export default ProductListPage;