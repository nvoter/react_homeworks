import React from 'react';
import '../styles/NavigationBar.css';
import { NavigationBarButton } from './NavigationBarButton.tsx';
import { MdMenu, MdShoppingCart, MdWarehouse, MdInfo, MdPerson, MdArrowBack } from 'react-icons/md';

interface NavigationBarProps {
    onMenuToggle: () => void;
    isMenuVisible: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ onMenuToggle, isMenuVisible }) => {
    return (
        <nav className='navigation-bar'>
            <NavigationBarButton Icon={isMenuVisible ? MdArrowBack : MdMenu} onClick={ onMenuToggle }/>
            <NavigationBarButton label="Товары" Icon={MdShoppingCart}/>
            <NavigationBarButton label="Склады" Icon={MdWarehouse}/>
            <NavigationBarButton label="О системе" Icon={MdInfo}/>
            <NavigationBarButton label="Профиль" Icon={MdPerson}/>
        </nav>
    )
}