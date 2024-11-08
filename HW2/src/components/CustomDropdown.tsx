import React, { useState } from 'react';
import '../styles/CustomDropdown.css';

interface CustomDropdownProps {
    options: string[];
    defaultOption: string;
    onSelect: (option: string) => void;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, defaultOption, onSelect }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpened(false);
    };

    return (
        <div className='dropdown-menu'>
            <div className='dropdown-selected' onClick={() => setIsOpened(!isOpened)}>
                {selectedOption}
            </div>
            {isOpened && (
                <ul className='dropdown-options'>
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleSelect(option)}>
                            {option || 'Без категории'}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
