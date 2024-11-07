import React, { ReactNode } from 'react';
import '../styles/Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <button className='modal-close-button' onClick={onClose}>✖</button>
                {children}
            </div>
        </div>
    );
};