import React from 'react';

import './../sass/views/LandingPage.scss';

import GuestNavBar from './GuestNavBar.jsx';

export default function LandingPage({
  openLoginModal
}) {
  return (
    <div id="landing-page">
      <GuestNavBar openLoginModal={openLoginModal}/>
      <div id="promo-text">
        {/* TODO add promo text */}
        <p> TODO: PROMO TEXT </p>
      </div>
    </div>
  );
}
