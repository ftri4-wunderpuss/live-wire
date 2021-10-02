import React from 'react';

import './../sass/views/GuestNavBar.scss';

export default function GuestNavBar() {
  return (
    <div id='guest-nav-bar'>
      <img alt='page logo' />
      <nav>
        <ul>
          <li>Login</li>
          <li>Signup</li>
        </ul>
      </nav>
    </div>
  );
}
