import React from 'react';

import './../sass/views/Event.scss';
import removeIconUrl from './../assets/icons/remove_circle_outline_black_24dp.svg';

export default function Event({
  artistName,
  eventImageUrl,
  venue,
  date,
  ticketPrice,
  isStarred,
  removeArtist
}) {
  return (
    <article className='event-item'>
      <div className='event-star'>
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
      <div className='event-footer'>
        <button
          type='button'
          onClick={removeArtist}
        >
          Unfollow <img src={removeIconUrl} alt='remove artist icon' />
        </button>
      </div>
    </article>
  );
}
