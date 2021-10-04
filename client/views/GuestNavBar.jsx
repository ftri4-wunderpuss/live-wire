import React from 'react';

import './../sass/views/GuestNavBar.scss';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function GuestNavBar({
  openLoginModal,
  openSignUpModal,
}) {
  return (
    <div id='guest-nav-bar'>
      <AppBar position="static">
        <Toolbar>
          {/* TODO <img alt='page logo' /> */}
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} color='secondary.dark'>
            Live Wire
          </Typography>
          <Button color="inherit" onClick={openLoginModal}>Login</Button>
          <Button color="inherit" onClick={openSignUpModal}>Signup</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
