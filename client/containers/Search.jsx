import React from 'react';
import NavBar from './../views/NavBar.jsx';
import Artist from './../views/Artist.jsx'
import NoArtist from './../views/NoArtist.jsx';
import './../sass/containers/Search.scss';


export default function Search({
    followedArtists,
    searchValue,
    setSearchValue,
    addArtist,
    removeArtist
}) {

const [artists, setArtists] = useState(undefined);


return (
  <div id="search">
      <NavBar searchValue={searchValue} setSearchValue={setSearchValue}/>
    {artists && artists.length === 0 ? <NoArtist/> : artists.map(artistInfo => {
        <Artist></Artist>
    }  )}


  </div>
)

};


