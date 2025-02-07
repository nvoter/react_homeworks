import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateProduct, deleteProduct } from '../redux/productSlice';
import { Box, Typography, Button } from '@mui/material';
import EditProductModal from '../components/EditProductModal';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) => state.products.products.find(p => p.id === id));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  if (!product) {
    return <Typography variant="h5">Продукт не найден</Typography>;
  }

  const handleUpdate = (updatedProduct: typeof product) => {
    dispatch(updateProduct(updatedProduct));
  };

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
    navigate('/');
  };

  return (
    <Box sx={{ padding: 3, marginTop: '64px' }}>
      <Typography variant="h4">{product.name}</Typography>
      <Typography variant="body1">{product.description}</Typography>
      <Typography variant="body2">Категория: {product.category}</Typography>
      <Typography variant="body2">Количество: {product.quantity}</Typography>
      <Typography variant="body2">Цена: {product.price}</Typography>
      <Box sx={{ marginTop: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => setEditModalOpen(true)}>Редактировать товар</Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>Удалить товар</Button>
      </Box>
      <EditProductModal 
        open={isEditModalOpen} 
        onClose={() => setEditModalOpen(false)} 
        product={product} 
        onSave={handleUpdate} 
      />
    </Box>
  );
};

export default ProductDetailPage;