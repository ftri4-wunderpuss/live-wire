import React, { useCallback, useState } from 'react';

import { Switch, Route, Redirect, Link } from 'react-router-dom';

import LandingPage from '../views/LandingPage.jsx';
import Feed from './Feed.jsx';
import Search from './Search.jsx';
import Account from './../views/Account.jsx';
import LoginModal from '../modals/LoginModal.jsx';
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, openSignUpModal, closeSignUpModal] = useModal(false);

  /* ACTIONS */

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

  // landing page

 


  /* SIDE EFFECTS */


  /* RENDER */

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage
          openLoginModal={openLoginModal}
          openSignUpModal={openSignUpModal}
        />
        {showLoginModal && <LoginModal
          isOpen={showLoginModal}
          setIsOpen={setShowLoginModal}
        />}
        {showSignUpModal && <SignUpModal
          isOpen={showSignUpModal}
          closeModal={closeSignUpModal}
          handleRegisterUser={handleRegisterUser}
          />}
      </Route>
      <Route path="/feed">
        {user
          ? <Feed
            starredEvents={starredEvents}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            removeArtist={removeArtist}
            addEvent={addEvent}
            removeEvent={removeEvent}
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
          />
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
