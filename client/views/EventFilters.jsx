import React, { useCallback } from 'react';

import './../sass/views/EventFilters.scss';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export default function EventFilters({
  locationFilterValue,
  showStarredEvents,
  toggleShowStarredEvents,
  setLocationFilterValue,
  toFromDates,
  setToFromDates,
}) {
  /*
  const onLocationFilterChange = useCallback(event => {
    setLocationFilterValue(event.target.value);
  }, [setLocationFilterValue]);

  const onDateFromFilterChange = useCallback(event => {
    setDateFromFilterValue(event.target.value);
  }, [setDateFromFilterValue]);

  const onDateToFilterChange = useCallback(event => {
    setDateToFilterValue(event.target.value);
  }, [setDateToFilterValue]);
  */

  const onDateRangeChange = useCallback((newDateRange) => {
    setToFromDates(newDateRange);
  }, [setToFromDates]);

  // TODO actually sort by date rangers
  // TODO fix styling of search fields

  return (
    <AppBar id='event-filters' position="sticky">
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
      >
        <DateRangePicker
          startText="From"
          endText="To"
          value={toFromDates}
          onChange={onDateRangeChange}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} size="small" />
              <TextField {...endProps} size="small" />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      {/* TODO add back <Button color="inherit" onClick={toggleShowStarredEvents}>{showStarredEvents ? 'Unsort Star' : 'Sort Star'}</Button>*/}
    </AppBar>
  );
}
