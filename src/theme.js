import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  shadows: ['none'],
  palette: {
    type: 'light',
    primary: {
      main: '#FF403F',
    },
    secondary: {
      main: '#E0E0E0',
    },
    dark: {
      main: '#212121',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 400,
    },
  },
});

theme.shadows[1] = theme.shadows[0];
