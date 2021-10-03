import React from 'react';
import FollowButton from './FollowButton.jsx'
import UnfollowButton from './UnfollowButton.jsx'
import './../sass/views/Artist.scss';

export default function Artist({
    addArtist,
    artistId,
    artistBio,
    artistImageURL,
    artistName,
    artistIsOnTour,
    isFollowed,
    removeArtist
  }) {

  return (
    <article className="artist-item">
      <header>
        <img src={artistImageURL}alt={`Event image for ${artistName}`}></img>
        </header>
        <h2>{artistName}</h2>
        <div className="artist-description">
          <p>{artistBio}</p>
        </div>
        <div className='artist-footer'>
        {isFollowed && <UnfollowButton onClick={addArtist(artistId)}/> }
        {!isFollowed && <FollowButton onClick={removeArtist(artistId)}/>}
        </div>
    </article> 

  )
} 


