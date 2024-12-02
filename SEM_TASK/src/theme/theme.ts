import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#000FFF'
    },
    background: {
      default: '#F5F5F5',
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#00FFFF',
    },
    background: {
      default: '#262626',
    }
  }
});