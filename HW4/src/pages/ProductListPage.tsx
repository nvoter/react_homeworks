import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/types';
import { Box, Button, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import SideMenu from '../components/SideMenu';
import AddProductModal from '../components/AddProductModal';
import { deleteProduct } from '../redux/productSlice';

const ProductListPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    name: '',
    inStock: false,
    category: 'Все товары',
  });
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

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
    dispatch(deleteProduct(id));
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

      <AddProductModal open={isAddModalOpen} onClose={() => setAddModalOpen(false)} onSave={() => setAddModalOpen(false)} />
    </Box>
  );
};

export default ProductListPage;