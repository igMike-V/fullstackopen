import { createTheme } from '@mui/material/styles';

const hospitalTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#2190ff',
          },
        },
      },
    },
  },
});

const occupationalHealthTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#7c19d2',
          '&:hover': {
            backgroundColor: '#8800ff',
          },
        },
      },
    },
  },
});

const healthCheckTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#d21928',
          '&:hover': {
            backgroundColor: '#ff051a',
          },
        },
      },
    },
  },
});



export { hospitalTheme, occupationalHealthTheme, healthCheckTheme}