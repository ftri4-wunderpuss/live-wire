import React, { useCallback, useEffect, useState } from 'react';

import './../sass/containers/Feed.scss';

import Stack from '@mui/material/Stack';

import NavBar from './../views/NavBar.jsx';
import EventFilters from './../views/EventFilters.jsx';
import NoEvents from './../views/NoEvents.jsx';
import Event from './../views/Event.jsx';
import Splash from './../views/Splash.jsx';

export default function Feed({
  followedArtists,
  starredEvents,
  searchValue,
  setSearchValue,
  removeArtist,
  addEvent,
  removeEvent,
  openLogoutModal,
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
    if (starredEvents.find(eId => eId === eventId)) {
      // event is currently starred
      removeEvent(eventId);
    } else {
      addEvent(eventId);
    }
  }, [addEvent, removeEvent, starredEvents]);

  /* SIDE EFFECTS */

  useEffect(() => {

    // TODO trigger splash until this returns, to fix unfollow button not showing immediate feedback

    fetch('/api/events', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(async response => {
      const body = await response.json();

      setEvents(body.events);
    }).catch(error => {
      console.error(error);
      alert(error); // todo remove 
    });
  }, [followedArtists]);

  /* RENDER */

  // determine which events are starred and sort by starred events to top
  const starredEventsList = [];
  const notStarredEventsList = [];
  if (events) events.forEach(event => {
    event.date = new Date(event.date);
    if (starredEvents.find(sE => sE === event.eventId) !== undefined) {
      event.isStarred = true;
      starredEventsList.push(event);
    } else {
      event.isStarred = false;
      notStarredEventsList.push(event);
    }
  });
  // filter by chronological order within each subgroup: star vs non-star
  starredEventsList.sort((eA, eB) => {
    console.log(eA.date);
    console.log(eB.date);
    return eA.date - eB.date;
  });
  notStarredEventsList.sort((eA, eB) => eA.date - eB.date);

  const toRenderEventList = starredEventsList.concat(notStarredEventsList);

  return (
    <div id='feed'>
      <NavBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        openLogoutModal={openLogoutModal}
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
        <Stack
          direction="column"
          spacing={3}
          mt={3}
        >
          {
            events.length === 0
              ? <NoEvents />
              : toRenderEventList.map(eventInfo => {
                const artistLineup = eventInfo.artists.map(artistItem => artistItem.artistName).join(', ');

                return <Event
                  key={artistLineup + eventInfo.venue}
                  hasMultipleArtist={eventInfo.artists.length > 1}
                  artistId={eventInfo.artists[0].artistId}
                  artistName={artistLineup}
                  eventImageUrl={eventInfo.eventImageUrl}
                  venue={eventInfo.venue}
                  date={eventInfo.date}
                  ticketPrice={eventInfo.ticketPrice.toFixed(2)}
                  isStarred={eventInfo.isStarred}
                  removeArtist={removeArtist}
                  toggleIsStarred={() => toggleIsStarred(eventInfo.eventId)}
                />;
              })
          }
        </Stack>
      }
    </div>
  );
}
