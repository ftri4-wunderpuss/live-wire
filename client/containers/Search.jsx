import React, { useState } from 'react';

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
  removeArtist
}) {
  /* STATE */

  const [artists, setArtists] = useState(undefined);

  /* SIDE EFFECTS */

  /* TODO useEffect queries API, creates aritstInfo object */

  /* RENDER */

  return (
    <div id="search">
      <NavBar searchValue={searchValue} setSearchValue={setSearchValue} />
      {artists === undefined && <Splash />}
      {artists && artists.length === 0
        ? <NoArtist />
        : artists.map(artistInfo =>
          <Artist
            key={artistInfo.artistName}
            artistId={artistInfo.artistId}
            artistName={artistInfo.artistName}
            artistBio={artistInfo.artistBio}
            artistImageURL={artistInfo.artistImageURL}
            artistIsOnTour={artistInfo.artistIsOnTour}
            isFollowed={followedArtists.find(artistInfo.artistId) !== undefined}
            addArtist={addArtist}
            removeArtist={() => removeArtist(artistInfo.artistId)}
          ></Artist>
        )
      }
    </div>
  );
}
