import React from 'react';
import { IconType } from 'react-icons';
import '../styles/NavigationBar.css';

interface NavigationBarButtonProps {
    label?: string;
    Icon: IconType;
    onClick?: () => void;
}

export const NavigationBarButton: React.FC<NavigationBarButtonProps> = ({ label, Icon, onClick }) => {
    return (
        <button className='navigation-bar-button' onClick={onClick}>
            <Icon className='button-icon'/>
            {label && <span>{ label }</span>}
        </button>
    )
}