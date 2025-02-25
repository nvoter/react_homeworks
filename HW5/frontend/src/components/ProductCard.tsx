import React from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/types';

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card sx={{ width: 300, position: 'relative' }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="140"
          image={
            product.imageUrl ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&s'
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h6" noWrap>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Категория: {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Количество: {product.quantity} {product.unit}.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Цена: {product.price} руб.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ position: 'absolute', top: 0, right: 0 }}>
        <IconButton onClick={onDelete} color="error" size="small">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;