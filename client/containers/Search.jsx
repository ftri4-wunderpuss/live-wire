import React, { useState } from 'react';
import NavBar from './../views/NavBar.jsx';
import Artist from './../views/Artist.jsx'
import NoArtist from './../views/NoArtist.jsx';
import Splash from './../views/Splash.jsx'
import './../sass/containers/Search.scss';


export default function Search({
    followedArtists,
    searchValue,
    setSearchValue,
    addArtist,
    removeArtist
}) {

const [artists, setArtists] = useState(undefined);

/* TODO useEffect queries API, creates aritstInfo object */

return (
  <div id="search">
      <NavBar searchValue={searchValue} setSearchValue={setSearchValue}/>
    {artists === undefined && <Splash/>}
    {artists && artists.length === 0 
      ? <NoArtist/> 
      : artists.map(artistInfo => {
          <Artist
            key={artistInfo.artistName}
            artistDes={artistInfo.artistDes}
            artistImageURL={artistInfo.artistImageURL}
            artistName={artistInfo.artistName}
            artistOnTour={artistInfo.artistOnTour}
            isFollowed={followedArtists.find(artistInfo.artistId) !== undefined}
            addArtist={addArtist}
            artistId={artistInfo.artistId}
            removeArtist={removeArtist}
          ></Artist>
      })
    }


  </div>
)

}


