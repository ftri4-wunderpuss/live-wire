import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './sass/shared.scss';

import { HashRouter } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';

import App from './containers/App.jsx';

const theme = createTheme({
  palette: {
    mode: 'dark' // STRETCH can be used to switch between light and dark theme
  },
});

ReactDOM.render(
  <HashRouter >
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </HashRouter>,
  document.getElementById('root')
);
