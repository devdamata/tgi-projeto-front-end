import { createTheme, ThemeProvider } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#333',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#263238',
      paper: '#37474f',
    },
    text: {
      primary: '#ffffff',
    },
  },
});
