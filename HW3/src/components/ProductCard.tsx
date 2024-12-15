import React from 'react';
import { Card, CardContent, CardMedia, Typography, Tooltip } from '@mui/material';

interface ProductCardProps {
  name: string;
  description?: string;
  category?: string;
  quantity: number;
  unit: string;
  imageUrl?: string;
  onCardClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  category,
  quantity,
  unit,
  imageUrl,
  onCardClick
}) => {
  return (
    <Tooltip title={description || 'Описание отсутствует'} arrow>
      <Card
        onClick={onCardClick}
        sx={{
          width: 200,
          height: 320,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={imageUrl || 'https://via.placeholder.com/200x140?text=No+Image'}
          alt={name}
        />
        <CardContent>
          <Typography variant="h6" component="div" noWrap>
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Количество: {quantity} {unit}
          </Typography>
        </CardContent>
      </Card>
    </Tooltip>
  );
};

export default ProductCard;