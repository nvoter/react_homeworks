import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import EditProductModal from '../components/EditProductModal';
import { Product } from '../types/types'

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке продукта:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography variant="h5">Продукт не найден</Typography>;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
    }
  };

  const handleEditProductModalOnClose = () => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке продукта:', error);
      }
    };

    fetchProduct();
    setEditModalOpen(false);
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
        onClose={handleEditProductModalOnClose}
        product={product}
      />
    </Box>
  );
};

export default ProductDetailPage;