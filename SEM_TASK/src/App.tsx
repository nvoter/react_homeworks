import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ArticleList from './components/ArticleList';
import { lightTheme, darkTheme } from './theme/theme';
import ThemeSlider from './components/ThemeSlider';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <ThemeSlider darkMode={darkMode} toggleTheme={toggleTheme}/>
      <ArticleList />
    </ThemeProvider>
  );
};

export default App;