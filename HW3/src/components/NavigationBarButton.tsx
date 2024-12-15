import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { IconType } from 'react-icons';

interface NavigationBarButtonProps {
  label: string;
  Icon: IconType;
  onClick?: () => void;
}

const NavigationBarButton: React.FC<NavigationBarButtonProps> = ({ label, Icon, onClick }) => {
  return (
    <Tooltip title={label} arrow>
      <Button
        startIcon={<Icon />}
        onClick={onClick}
        sx={{
          color: 'text.primary',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '25px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
          }
        }}
      >
        {label}
      </Button>
    </Tooltip>
  );
};

export default NavigationBarButton;