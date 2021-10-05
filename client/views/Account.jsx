import React from 'react';

import './../sass/views/Account.scss';

import NavBar from './NavBar.jsx';
import Settings from '../containers/Settings.jsx';

export default function Account({
  searchValue,
  setSearchValue,
  user,
  settings,
  followedArtists,
  setUser,
  setSettings,
  removeArtist,
  openLogoutModal,
}) {
  return (
    <div id='account'>
      <NavBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        openLogoutModal={openLogoutModal}
      />
      <Settings
        user={user}
        settings={settings}
        followedArtists={followedArtists}
        setUser={setUser}
        setSettings={setSettings}
        removeArtist={removeArtist}
      />
    </div>
  );
}
