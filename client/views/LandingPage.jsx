import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import './../sass/views/LandingPage.scss';

import GuestNavBar from './GuestNavBar.jsx';

export default function LandingPage({
  openLoginModal,
  openSignUpModal,
}) {
  return (
    <>
      <GuestNavBar
        openLoginModal={openLoginModal}
        openSignUpModal={openSignUpModal}
      />
      <div id="landing-page" >
        <Paper
          id="promo-text"
          elevation={5}
        >
          <Typography variant="h4" component="h3" mb={3} color='secondary.dark'> Your curated live music listing</Typography>
          <Typography component='p' mb={2} color='secondary.light'>
            Always be in the know when your favorite bands come to town.
          </Typography>
          <Typography component='p' mb={2} color='secondary.light'>
            Search and follow all your favorite artists. Your feed
            will show all their upcoming concerts in your city.
          </Typography>
          <Typography component='p' mb={2} color='secondary.light'>
            Customize your feed settings and save your favorite events for quick access.
          </Typography>
          <Typography variant='h6' component='p' mt={3} color='secondary.dark'>
            Never miss a concert again!
          </Typography>
        </Paper>
      </div>
    </>
  );
}
