import React, { useState, useEffect } from 'react';

import './../sass/containers/Search.scss';

import NavBar from './../views/NavBar.jsx';
import Artist from './../views/Artist.jsx';
import NoArtist from './../views/NoArtist.jsx';
import Splash from './../views/Splash.jsx';

export default function Search({
  followedArtists,
  searchValue,
  setSearchValue,
  addArtist,
  removeArtist,
  openLogoutModal
}) {
  /* STATE */

  const [artists, setArtists] = useState(undefined);

  /* SIDE EFFECTS */

  useEffect(() => {
    fetch('/api/artists/' + searchValue + 'fake', { // tODO remove fake
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(async response => {
      const body = await response.json();

      setArtists(body.artists);
    }).catch(error => {
      console.error(error);
      alert(error); // todo remove 
    });
  }, [searchValue]);

  /* RENDER */

  console.log({ followedArtists }); // ! remove

  return (
    <div id="search">
      <NavBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        openLogoutModal={openLogoutModal}
      />
      {artists === undefined && <Splash />}
      {artists && (
        artists.length === 0
          ? <NoArtist />
          : artists.map(artistInfo =>
            <Artist
              key={artistInfo.artistName}
              artistId={artistInfo.artistId}
              artistName={artistInfo.artistName}
              artistBio={artistInfo.artistBio}
              artistImageURL={artistInfo.artistImageURL}
              artistIsOnTour={artistInfo.artistIsOnTour}
              isFollowed={followedArtists.find(fA => fA.artistId === artistInfo.artistId) !== undefined}
              addArtist={addArtist}
              removeArtist={removeArtist}
            ></Artist>
          )
      )
      }
    </div>
  );
}
