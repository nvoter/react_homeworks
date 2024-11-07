import React from 'react';
import '../styles/ProductCard.css';

interface ProductCardProps {
    name: string;
    description?: string;
    category?: string;
    quantity: number;
    unit: string;
    imageUrl?: string;
    onCardClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    name,
    description,
    category,
    quantity,
    unit,
    imageUrl,
    onCardClick
}) => {
    return (
        <div className='product-card' onClick={onCardClick}>
            <div className='product-image'>
                {imageUrl ? <img src={imageUrl} alt={name} /> : <div className='product-without-image'>No Image</div>}
            </div>
            <div className='product-info'>
                <h2 className='product-name'>{name}</h2>
                <div>
                    <p className='product-description'>
                        { description! }
                    </p>
                    <p className='product-category'>Категория: {category}</p>
                    <p className='product-quantity'>Количество: {quantity} {unit}</p>
                </div>
            </div>
        </div>
    );
};