import React from 'react';
import ReactDOM from 'react-dom';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';

import 'normalize.css';
import './sass/shared.scss';

import Test from './Test.jsx';

const theme = createTheme({
  palette: {
    mode: 'dark' // STRETCH can be used to switch between light and dark theme
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Test />
  </ThemeProvider>,
  document.getElementById('root')
);
