import React from 'react';
import FollowButton from './FollowButton.jsx'
import UnfollowButton from './UnfollowButton.jsx'
import './../sass/views/Artist.scss';

export default function Artist({
    addArtist,
    artistId,
    artistDes,
    artistImageURL,
    artistName,
    artistOnTour,
    isFollowed,
    removeArtist
  }) {

  return (
    <article id="artist">
      <header>
        <img src={artistImageURL}alt={`Event image for ${artistName}`}></img>
        </header>
        <h3>{artistName}</h3>
        <div id="artist-des">
          <p>{artistDes}</p>
        </div>
        {isFollowed && <UnfollowButton onClick={addArtist(artistId)}/> }
        {!isFollowed && <FollowButton onClick={removeArtist(artistId)}/>}
        
       </article> 

  )
} 


