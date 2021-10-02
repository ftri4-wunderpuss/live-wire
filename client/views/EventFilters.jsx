import React, { useCallback } from 'react';

import './../sass/views/EventFilters.scss';

export default function EventFilters({
  locationFilterValue,
  dateFromFilterValue,
  dateToFilterValue,
  showStarredEvents,
  toggleShowStarredEvents,
  setLocationFilterValue,
  setDateFromFilterValue,
  setDateToFilterValue,
}) {
  const onLocationFilterChange = useCallback(event => {
    setLocationFilterValue(event.target.value);
  }, [setLocationFilterValue]);

  const onDateFromFilterChange = useCallback(event => {
    setDateFromFilterValue(event.target.value);
  }, [setDateFromFilterValue]);

  const onDateToFilterChange = useCallback(event => {
    setDateToFilterValue(event.target.value);
  }, [setDateToFilterValue]);

  return (
    <div id='event-filters' >
      <div id='input-filters'>
        <input
          id='location-filter'
          type='text'
          required minLength='1' size='30'
          value={locationFilterValue}
          onChange={onLocationFilterChange}
        />
        <input
          id='date-from-filter'
          type='text'
          required minLength='1' size='30'
          value={dateFromFilterValue}
          onChange={onDateFromFilterChange}
        />
        <input
          id='date-to-filter'
          type='text'
          required minLength='1' size='30'
          value={dateToFilterValue}
          onChange={onDateToFilterChange}
        />
      </div>
      <a onClick={toggleShowStarredEvents}>{showStarredEvents ? 'hide' : 'show'} starred</a>
    </div>
  );
}
