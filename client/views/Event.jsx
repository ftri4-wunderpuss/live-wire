import React from 'react';

import './../sass/views/Event.scss';

import UnfollowButton from './UnfollowButton.jsx';

export default function Event({
  hasMultipleArtist,
  artistName,
  eventImageUrl,
  venue,
  date,
  ticketPrice,
  isStarred,
  removeArtist,
  toggleIsStarred
}) {
  return (
    <article className='event-item'>
      <div className='event-star' onClick={toggleIsStarred}>
        <span className={isStarred ? 'active-star' : ''}>&#9733;</span>
      </div>
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
          <li>Date & Time: {date.toLocaleString()}</li>
          <li>Ticket Price: {ticketPrice} USD</li>
        </ul>
      </div>
      {!hasMultipleArtist &&
        <div className='event-footer'>
          <UnfollowButton onClick={removeArtist} />
        </div>
      }
    </article>
  );
}
