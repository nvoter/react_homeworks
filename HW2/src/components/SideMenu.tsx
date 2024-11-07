import React from 'react';
import '../styles/SideMenu.css';
import { Product } from './ProductList';

interface SideMenuProps {
    products: Product[];
    isVisible: boolean;
    onClose: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ products, isVisible }) => {
    const categoriesSet = new Set(products.map(product => product.category));
    const categories = Array.from(categoriesSet);
    
    return (
        <div className={isVisible ? 'side-menu' : 'hidden'}>
            <input type='text' placeholder='Поиск по названию товара' className='input-field'/>
            <div className='checkbox' id='nonZeroFilter'>
                <input type='checkbox' id='nonZeroFilter' />
                <label htmlFor='nonZeroFilter'>В наличии</label>
            </div>
            <div id='dropdownMenu'>
                <label htmlFor='dropdownMenu'>Категория</label>
                <select className='dropdown'>
                    <option value=''>Все товары</option>
                    {categories.map(category =>
                        <option value={ category }>{ category ? category : 'Без категории' }</option>
                    )}
                </select>
            </div>
        </div>
    );
};