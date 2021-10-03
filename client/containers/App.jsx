import React, { useCallback, useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import LandingPage from '../views/LandingPage.jsx';
import Feed from './Feed.jsx';
import Search from './Search.jsx';
import Account from './../views/Account.jsx';
import LoginModal from '../modals/LoginModal.jsx';
import SignUpModal from './../modals/SignUpModal.jsx';
import LogoutModal from '../modals/LogoutModal.jsx';

import useModal from '../hooks/useModal.js';

import { validateArtistListItem, validateEventId } from './../../shared/fontEndStateValidation';

/**
 * Stateful component. App maintains user, settings, followedArtists, starredEvents, and searchValue state.
 * 
 * App uses react-router Switch to determine which page to render.
 */
export default function App() {
  /* STATE */

  // app state
  const [user, setUser] = useState(undefined);
  const [settings, setSettings] = useState(undefined);
  const [followedArtists, setFollowedArtists] = useState(undefined);
  const [starredEvents, setStarredEvents] = useState(undefined);

  // globally controlled components
  const [searchValue, setSearchValue] = useState('');

  const [isOpenLoginModal, openLoginModal, closeLoginModal] = useModal(false);
  const [loginModalError, setLoginModalError] = useState('');

  const [isOpenSignUpModal, openSignUpModal, closeSignUpModal] = useModal(false);
  const [signupModalError, setSignupModalError] = useState('');

  const [isOpenLogoutModal, openLogoutModal, closeLogoutModal] = useModal(false);


  /* ACTIONS */

  // login/signup actions
  const handleLoginRequest = useCallback((email, password) => {
    // TODO handle AJAX login

    console.log({ email, password });
    closeLoginModal();
  }, [closeLoginModal]);

  const handleRegisterUser = useCallback((...args) => {
    // TODO handle AJAX login

    console.log({ args });
    closeSignUpModal();
  }, [closeSignUpModal]);

  const handleLogoutRequest = useCallback((...args) => {
    // TODO handle AJAX login

    console.log({ args });
    closeSignUpModal();
  }, [closeSignUpModal]);


  // artist list
  const addArtist = useCallback(artist => {
    validateArtistListItem(artist);

    setFollowedArtists(followedArtists => {
      // add artist if it does not already exist
      if (!followedArtists.find(a => a.artistId === artist.artistId)) return [...followedArtists, artist];
      return followedArtists;
    });
  }, []);

  const removeArtist = useCallback(artist => {
    validateArtistListItem(artist);

    setFollowedArtists(followedArtists => {
      // remove artist if he exists
      const index = followedArtists.findIndex(a => a.artistId === artist.artistId);
      if (index !== -1) return followedArtists.splice(index, 1);
      return followedArtists;
    });
  }, []);

  // event list
  const addEvent = useCallback(eventId => {
    validateEventId(eventId);

    setStarredEvents(starredEvents => {
      // add event if it does not already exist
      if (!starredEvents.find(eId => eId === eventId)) return [...starredEvents, eventId];
      return starredEvents;
    });
  }, []);

  const removeEvent = useCallback(eventId => {
    validateEventId(eventId);

    setStarredEvents(starredEvents => {
      // remove event if it exists in the list
      const index = starredEvents.findIndex(eId => eId === eventId);
      if (index !== -1) return starredEvents.splice(index, 1);
      return starredEvents;
    });
  }, []);


  /* SIDE EFFECTS */


  /* RENDER */

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage
          openLoginModal={openLoginModal}
          openSignUpModal={openSignUpModal}
        />
        <LoginModal
          isOpen={isOpenLoginModal}
          closeModal={closeLoginModal}
          errorMessage={loginModalError}
          handleLoginRequest={handleLoginRequest}
        />
        <SignUpModal
          isOpen={isOpenSignUpModal}
          closeModal={closeSignUpModal}
          errorMessage={signupModalError}
          handleRegisterUser={handleRegisterUser}
        />
      </Route>
      <Route path="/feed">
        {user
          ? <>
            <Feed
              starredEvents={starredEvents}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              removeArtist={removeArtist}
              addEvent={addEvent}
              removeEvent={removeEvent}
              openLogoutModal={openLogoutModal}
            />
            <LogoutModal
              isOpen={isOpenLogoutModal}
              closeModal={closeLogoutModal}
              handleLogoutRequest={handleLogoutRequest}
            />
          </>
          : <Redirect to="/" />}
      </Route>
      <Route path="/search">
        {user
          ? <>
            <Search
              followedArtists={followedArtists}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              addArtist={addArtist}
              removeArtist={removeArtist}
              openLogoutModal={openLogoutModal}
            />
            <LogoutModal
              isOpen={isOpenLogoutModal}
              closeModal={closeLogoutModal}
              handleLogoutRequest={handleLogoutRequest}
            />
          </>
          : <Redirect to="/" />}
      </Route>
      <Route path="/account">
        {user
          ? <>
            <Account
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              user={user}
              settings={settings}
              followedArtists={followedArtists}
              setUser={setUser}
              setSettings={setSettings}
              removeArtist={removeArtist}
              openLogoutModal={openLogoutModal}
            />
            <LogoutModal
              isOpen={isOpenLogoutModal}
              closeModal={closeLogoutModal}
              handleLogoutRequest={handleLogoutRequest}
            />
          </>
          : <Redirect to="/" />}
      </Route>
      <Route>
        {/* TODO 404 page */}
        <h1>Front-End 404</h1>
        <Link to="/">Go Back</Link>
      </Route>
    </Switch>
  );
}
