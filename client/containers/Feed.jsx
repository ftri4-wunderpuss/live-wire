import React, { useCallback, useState } from 'react';

import './../sass/containers/Feed.scss';

import NavBar from './../views/NavBar.jsx';
import EventFilters from './../views/EventFilters.jsx';
import NoEvents from './../views/NoEvents.jsx';
import Event from './../views/Event.jsx';
import Splash from './../views/Splash.jsx';

export default function Feed({
  starredEvents,
  searchValue,
  setSearchValue,
  removeArtist,
  addEvent,
  removeEvent,
}) {
  /* STATE */

  // Event controlled state
  const [events, setEvents] = useState(undefined); // undefined if no AJAX request, empty is no events exist

  // EventFilters controlled state
  const [locationFilterValue, setLocationFilterValue] = useState('');
  // TODO consider what value html date fields take and what this initial value should be
  const [dateFromFilterValue, setDateFromFilterValue] = useState('');
  const [dateToFilterValue, setDateToFilterValue] = useState('');
  const [showStarredEventsFirst, setShowStarredEventsFirst] = useState(true);

  /* ACTIONS */

  const toggleShowStarredEvents = useCallback(() => {
    setShowStarredEventsFirst(showStarredEvents => !showStarredEvents);
  }, [setShowStarredEventsFirst]);

  const toggleIsStarred = useCallback(eventId => {
    if (starredEvents.find(eventId)) {
      // event is currently starred
      removeEvent(eventId);
    } else {
      addEvent(eventId);
    }
  }, [addEvent, removeEvent]);

  /* SIDE EFFECTS */

  // TODO make request for events array from backend

  /* RENDER */

  return (
    <div id='feed'>
      <NavBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <EventFilters
        locationFilterValue={locationFilterValue}
        dateFromFilterValue={dateFromFilterValue}
        dateToFilterValue={dateToFilterValue}
        showStarredEvents={showStarredEventsFirst}
        toggleShowStarredEvents={toggleShowStarredEvents}
        setLocationFilterValue={setLocationFilterValue}
        setDateFromFilterValue={setDateFromFilterValue}
        setDateToFilterValue={setDateToFilterValue}
      />
      {events === undefined && <Splash />}
      {events &&
        (
          events.length === 0
            ? <NoEvents />
            : events.map(eventInfo => {
              const artistLineup = eventInfo.artists.map(artistItem => artistItem.artistId).join(', ');

              return <Event
                key={artistLineup + eventInfo.venue}
                hasMultipleArtist={eventInfo.artists.length > 1}
                artistName={artistLineup}
                eventImageUrl={eventInfo.eventImageUrl}
                venue={eventInfo.venue}
                date={eventInfo.date}
                ticketPrice={eventInfo.ticketPrice.toFixed(2)}
                isStarred={starredEvents.find(eventInfo.eventId) !== undefined}
                removeArtist={() => {
                  if (eventInfo.artists.length === 1) removeArtist(eventInfo.artists[0].artistId);
                }}
                toggleIsStarred={() => toggleIsStarred(eventInfo.eventId)}
              />;
            })
        )
      }
    </div>
  );
}
