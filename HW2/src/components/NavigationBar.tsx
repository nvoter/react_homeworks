import React from 'react';
import '../styles/NavigationBar.css';
import { NavigationBarButton } from './NavigationBarButton.tsx';
import { MdMenu, MdShoppingCart, MdWarehouse, MdInfo, MdPerson } from 'react-icons/md';

interface NavigationBarProps {
    onMenuToggle: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ onMenuToggle }) => {
    return (
        <nav className='navigation-bar'>
            <NavigationBarButton label="" Icon={MdMenu} onClick={ onMenuToggle }/>
            <NavigationBarButton label="Товары" Icon={MdShoppingCart}/>
            <NavigationBarButton label="Склады" Icon={MdWarehouse}/>
            <NavigationBarButton label="О системе" Icon={MdInfo}/>
            <NavigationBarButton label="Профиль" Icon={MdPerson}/>
        </nav>
    )
}