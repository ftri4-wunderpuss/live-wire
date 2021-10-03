import React from 'react';

import './../sass/views/LandingPage.scss';

import GuestNavBar from './GuestNavBar.jsx';

export default function LandingPage({
  openLoginModal,
  openSignUpModal,
}) {
  return (
    <div id="landing-page">
      <GuestNavBar
        openLoginModal={openLoginModal}
        openSignUpModal={openSignUpModal}
      />
      <div id="promo-text">
        {/* TODO add promo text */}
        <p> TODO: PROMO TEXT </p>
      </div>
    </div>
  );
}
