import React from 'react';

import './../sass/views/Event.scss';

import UnfollowButton from './UnfollowButton.jsx';
import Star from './Star.jsx';

export default function Event({
  hasMultipleArtist,
  artistId,
  artistName,
  eventImageUrl,
  venue,
  date,
  ticketPrice,
  isStarred,
  removeArtist,
  toggleIsStarred
}) {

  // TODO useCallback for unfollow onClick

  return (
    <article className='event-item'>
      <Star isStarred={isStarred} toggleIsStarred={toggleIsStarred} />
      <header>
        <img
          src={eventImageUrl}
          alt={`Event image for ${artistName}'s upcoming event.`}
        />
      </header>
      <div className='event-body'>
        <ul>
          <li>Artist: {artistName}</li>
          <li>Venue: {venue}</li>
          <li>Date & Time: {date.toLocaleDateString()}</li>
          <li>Ticket Price: {ticketPrice} USD</li>
        </ul>
      </div>
      {!hasMultipleArtist &&
        <div className='event-footer'>
          <UnfollowButton onClick={() => removeArtist({ artistId, artistName })} />
        </div>
      }
    </article>
  );
}
