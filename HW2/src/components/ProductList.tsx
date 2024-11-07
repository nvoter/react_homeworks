import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard.tsx';
import { Modal } from './Modal.tsx';
import '../styles/ProductList.css'

interface Product {
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    imageUrl?: string;
}

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch('/products.json')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Ошибка загрузки данных:', error));
    }, []);

    const handleCardClick = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div>
            <div className='product-list'>
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        name={product.name}
                        description={product.description}
                        category={product.category}
                        quantity={product.quantity}
                        unit={product.unit}
                        imageUrl={product.imageUrl}
                        onCardClick={() => handleCardClick(product)}
                    />
                ))}
            </div>

            <Modal isOpen={!!selectedProduct} onClose={closeModal}>
                {selectedProduct && (
                    <div>
                        <h2>{selectedProduct.name}</h2>
                        {selectedProduct.description ? <p><strong>Описание:</strong> {selectedProduct.description}</p> : <p> </p>}
                        {selectedProduct.category ? <p><strong>Категория:</strong> {selectedProduct.category}</p> : <p> </p>}
                        <p><strong>Количество:</strong> {selectedProduct.quantity} {selectedProduct.unit}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};