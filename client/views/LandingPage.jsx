import React from 'react';
import Paper from '@mui/material/Paper';

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
          {/* TODO add promo text */}
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.</p>
        </Paper>
      </div>
    </>
  );
}
