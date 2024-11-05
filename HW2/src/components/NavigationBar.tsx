import React from 'react';
import '../styles/NavigationBar.css';
import { NavigationBarButton } from './NavigationBarButton.tsx';
import { MdMenu, MdShoppingCart, MdWarehouse, MdInfo, MdPerson } from 'react-icons/md';

export const NavigationBar: React.FC = () => {
    return (
        <nav className='navigation-bar'>
            <NavigationBarButton label="Меню" Icon={MdMenu}/>
            <NavigationBarButton label="Товары" Icon={MdShoppingCart}/>
            <NavigationBarButton label="Склады" Icon={MdWarehouse}/>
            <NavigationBarButton label="О системе" Icon={MdInfo}/>
            <NavigationBarButton label="Профиль" Icon={MdPerson}/>
        </nav>
    )
}