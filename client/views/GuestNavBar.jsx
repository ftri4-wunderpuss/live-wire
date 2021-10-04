import React from 'react';

import './../sass/views/GuestNavBar.scss';

export default function GuestNavBar({
  openLoginModal,
  openSignUpModal,
}) {
  return (
    <div id='guest-nav-bar'>
      <img alt='page logo' />
      <nav>
        <ul>
          <li onClick={openLoginModal}>Login</li>
          <li onClick={openSignUpModal}>Signup</li>
        </ul>
      </nav>
    </div>
  );
}
