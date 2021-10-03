import React from 'react';

import './../sass/views/LandingPage.scss';

import GuestNavBar from './GuestNavBar.jsx';

export default function LandingPage() {
  return (
    <div id="landing-page">
      <GuestNavBar />
      <div id="promo-text">
        {/* TODO add promo text */}
        <p> TODO: PROMO TEXT </p>
      </div>
    </div>
  );
}
