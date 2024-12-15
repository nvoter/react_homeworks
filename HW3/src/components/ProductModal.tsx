import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box } from '@mui/material';
import { Product } from '../types/types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return (
    // диалог показался удобнее, тк в нем есть автоматическая поддержка закрытия по тапу вне области модалки
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: '1000px',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent
        dividers
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowY: 'auto',
          gap: 2,
          height: '100%',
        }}
      >
        <Box
          sx={{
            flex: '0 0 auto',
            height: '100%',
            width: '50%',
            position: 'sticky',
            top: 0,
            alignSelf: 'flex-start',
          }}
        >
          <Box
            component="img"
            src={product.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={product.name}
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" gutterBottom align="left">
            <strong>Описание:</strong> {product.description ? product.description : "Описание отсутствует"}
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            <strong>Категория:</strong> {product.category ? product.category : "Без категории"}
          </Typography>
          <Typography variant="body1" gutterBottom align="left">
            <strong>Количество:</strong> {product.quantity} {product.unit}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;