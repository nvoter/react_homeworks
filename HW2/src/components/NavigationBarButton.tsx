import react from 'react';
import { IconType } from 'react-icons';
import '../styles/NavigationBar.css';

interface NavigationBarButtonProps {
    label: string;
    Icon: IconType;
}

export const NavigationBarButton: React.FC<NavigationBarButtonProps> = ({ label, Icon }) => {
    return (
        <button className="navigation-bar-button">
            <Icon className="button-icon"/>
            <span>{ label }</span>
        </button>
    )
}