import { createTheme, ThemeOptions } from '@mui/material/styles';
import { useMemo } from 'react';
import { useMediaQuery } from '@mui/material';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#94b6f7' : '#373e68',
    },
    secondary: {
      main: mode === 'light' ? '#b3cbfb' : '#181861',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#242424',
      paper: mode === 'light' ? '#ffffff' : '#242424',
    },
    text: {
      primary: mode === 'light' ? '#3a3a3a' : '#e0e0e0',
      secondary: mode === 'light' ? '#777777' : '#b2b2b2',
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 600,
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === 'light' 
            ? 'linear-gradient(135deg, #b3cbfb, #94b6f7)' 
            : 'linear-gradient(135deg, #373e68, #181861)',
          boxShadow: 'none',
        }
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
      styleOverrides: {
        root: {
          borderRadius: '25px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: mode === 'light' 
              ? '#94b6f7' 
              : '#181861',
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: mode === 'light' 
              ? '0 4px 20px #94b6f7' 
              : '0 4px 20px #181861',
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        body2: {
          color: mode === 'light' ? '#777777' : '#b2b2b2',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: mode === 'light' 
            ? 'linear-gradient(135deg, #b3cbfb, #94b6f7)' 
            : 'linear-gradient(135deg, #373e68, #181861)',
        }
      }
    }
  }
});

const useThemeMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode: 'light' | 'dark' = prefersDarkMode ? 'dark' : 'light';
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return theme;
};

export default useThemeMode;