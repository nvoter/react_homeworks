import React from 'react';
import '../styles/SideMenu.css';
import { Product } from './ProductList';
import { CustomDropdown } from './CustomDropdown';

interface SideMenuProps {
    products: Product[];
    isVisible: boolean;
    onClose: () => void;
    handleCategorySelect: (category: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ products, isVisible, handleCategorySelect }) => {
    const categoriesSet = new Set(products.map(product => product.category));
    const categories = Array.from(categoriesSet);

    return (
        <div className={isVisible ? 'side-menu' : 'hidden'}>
            <input type='text' placeholder='Поиск товара' className='input-field'/>
            <div className='checkbox' id='nonZeroFilter'>
                <input type='checkbox' id='nonZeroFilter' />
                <label htmlFor='nonZeroFilter'>В наличии</label>
            </div>
            <CustomDropdown
                options={['Все товары', ...categories]}
                defaultOption='Все товары'
                onSelect={handleCategorySelect}
            />
        </div>
    );
};