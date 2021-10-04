import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import LandingPage from '../views/LandingPage.jsx';
import Feed from './Feed.jsx';
import Search from './Search.jsx';
import Account from './../views/Account.jsx';
import LoginModal from '../modals/LoginModal.jsx';
import SignUpModal from './../modals/SignUpModal.jsx';
import LogoutModal from '../modals/LogoutModal.jsx';

import useModal from '../hooks/useModal.js';
import useWindowResize from './../hooks/useWindowResize';

import backgroundImageUrl from './../assets/images/wallpaper/1490296.jpg';

import { validateArtistListItem, validateEventId } from '../../shared/frontEndStateValidation';

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

  // window size
  const [screenWidth, screenHeight] = useWindowResize();


  /* ACTIONS */

  useEffect(() => {
    // TODO figure out why webpack isn't behaving nice with direct imports in scss...
    document.body.style.background = `no-repeat center center fixed url(${backgroundImageUrl})`;
    // width is 1.6 the height

    // whenever width is more than 1.6 height, switch to 100% auto;
    const ratio = screenWidth / screenHeight;

    if (ratio > 1.6) {
      document.body.style.backgroundSize = `100% auto`;
    } else {
      document.body.style.backgroundSize = `auto 100%`;
    }

  }, [screenWidth, screenHeight]);

  // STRETCH debounce bellow functions in case of rapid user clicks.

  // login/signup actions
  const handleLoginRequest = useCallback((email, password) => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(async response => {
      const body = await response.json();

      if (response.status === 401) return setLoginModalError(body.error);

      // TODO validate server response with frontEndStateValidator

      setUser(body.user);
      setSettings(body.settings);
      setFollowedArtists(body.followedArtists);
      setStarredEvents(body.starredEvents);
      closeLoginModal();
    }).catch(error => {
      console.error(error);
      alert(error); // TODO remove
    });
  }, [closeLoginModal]);

  const handleRegisterUser = useCallback((name, email, password, city, receiveEmailNotifications = false) => {
    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, city, receiveEmailNotifications }),
    }).then(async response => {
      const body = await response.json();

      if (response.status === 401) return setSignupModalError(body.error);

      // TODO validate server response with frontEndStateValidator

      setUser(body.user);
      setSettings(body.settings);
      setFollowedArtists(body.followedArtists);
      setStarredEvents(body.starredEvents);

      closeSignUpModal();
    }).catch(error => {
      console.error(error);
      alert(error); // TODO remove
    });
  }, [closeSignUpModal]);

  const handleLogoutRequest = useCallback(() => {
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(async response => {
      const body = await response.json();

      if (response.status !== 200) throw body.error;

      setUser(undefined);
      setSettings(undefined);
      setFollowedArtists(undefined);
      setStarredEvents(undefined);
      closeLogoutModal();
    }).catch(error => {
      console.error(error);
      alert(error); // TODO remove
    });
  }, [closeLogoutModal]);


  // artist list
  const addArtist = useCallback(artist => {
    validateArtistListItem(artist);

    fetch('/api/artists/' + artist.artistId, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
    }).then(async response => {
      const body = await response.json();

      setFollowedArtists(body.followedArtists);
    }).catch(error => {
      console.error(error);
      alert(error); // TODO remove
    });

    // bellow happens immediately, and can later be updated with sync from server
    setFollowedArtists(followedArtists => {
      // add artist if it does not already exist
      if (!followedArtists.find(a => a.artistId === artist.artistId)) return [...followedArtists, artist];
      return followedArtists;
    });
  }, []);

  const removeArtist = useCallback(artist => {
    validateArtistListItem(artist);

    fetch('/api/artists/' + artist.artistId, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
      },
    }).then(async response => {
      const body = await response.json();

      setFollowedArtists(body.followedArtists);
    }).catch(error => {
      console.error(error);
      alert(error); // TODO remove
    });

    // bellow happens immediately, and can later be updated with sync from server
    setFollowedArtists(followedArtists => {
      // remove artist if he exists
      const index = followedArtists.findIndex(a => a.artistId === artist.artistId);

      if (index !== -1) return [...followedArtists.slice(0, index), ...followedArtists.slice(index + 1)];
      return followedArtists;
    });
  }, []);

  // event list
  const addEvent = useCallback(eventId => {
    validateEventId(eventId);

    fetch('/api/events/' + eventId, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
    }).then(async response => {
      const body = await response.json();

      setStarredEvents(body.starredEvents);
    }).catch(error => {
      console.error(error);
      alert(error); // TODO remove
    });

    // bellow happens immediately, and can later be updated with sync from server
    setStarredEvents(starredEvents => {
      // add event if it does not already exist
      if (!starredEvents.find(eId => eId === eventId)) return [...starredEvents, eventId];
      return starredEvents;
    });
  }, []);

  const removeEvent = useCallback(eventId => {
    validateEventId(eventId);

    fetch('/api/events/' + eventId, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
      },
    }).then(async response => {
      const body = await response.json();

      setStarredEvents(body.starredEvents);
    }).catch(error => {
      console.error(error);
      alert(error); // TODO remove
    });

    // bellow happens immediately, and can later be updated with sync from server
    setStarredEvents(starredEvents => {
      // remove event if it exists in the list
      const index = starredEvents.findIndex(eId => eId === eventId);
      if (index !== -1) return [...starredEvents.slice(0, index), ...starredEvents.slice(index + 1)];
      return starredEvents;
    });
  }, []);


  /* RENDER */

  return (
    <>
      <Switch>
        <Route exact path="/">
          <LandingPage
            openLoginModal={openLoginModal}
            openSignUpModal={openSignUpModal}
          />
          {user && <Redirect to='/feed' />}
        </Route>
        <Route path="/feed">
          {user
            ? <Feed
              followedArtists={followedArtists}
              starredEvents={starredEvents}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              removeArtist={removeArtist}
              addEvent={addEvent}
              removeEvent={removeEvent}
              openLogoutModal={openLogoutModal}
            />
            : <Redirect to="/" />}
        </Route>
        <Route path="/search">
          {user
            ? <Search
              followedArtists={followedArtists}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              addArtist={addArtist}
              removeArtist={removeArtist}
              openLogoutModal={openLogoutModal}
            />
            : <Redirect to="/" />}
        </Route>
        <Route path="/account">
          {user
            ? <Account
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
            : <Redirect to="/" />}
        </Route>
        <Route>
          {/* TODO 404 page */}
          <h1>Front-End 404</h1>
          <Link to="/">Go Back</Link>
        </Route>
      </Switch>

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
      <LogoutModal
        isOpen={isOpenLogoutModal}
        closeModal={closeLogoutModal}
        handleLogoutRequest={handleLogoutRequest}
      />
    </>
  );
}
