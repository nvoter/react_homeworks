import React from 'react';
import { Switch, Typography, Stack } from '@mui/material';

interface ThemeSliderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeSlider: React.FC<ThemeSliderProps> = ({ darkMode, toggleTheme }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent={"center"} marginBottom={5}>
      <Typography>Light</Typography>
      <Switch checked={darkMode} onChange={toggleTheme} />
      <Typography>Dark</Typography>
    </Stack>
  );
};

export default ThemeSlider;