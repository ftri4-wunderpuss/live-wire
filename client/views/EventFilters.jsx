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
  dateFromFilterValue,
  dateToFilterValue,
  showStarredEvents,
  toggleShowStarredEvents,
  setLocationFilterValue,
  setDateFromFilterValue,
  setDateToFilterValue,
}) {

  const [value, setValue] = React.useState([null, null]);

  const onLocationFilterChange = useCallback(event => {
    setLocationFilterValue(event.target.value);
  }, [setLocationFilterValue]);

  const onDateFromFilterChange = useCallback(event => {
    setDateFromFilterValue(event.target.value);
  }, [setDateFromFilterValue]);

  const onDateToFilterChange = useCallback(event => {
    setDateToFilterValue(event.target.value);
  }, [setDateToFilterValue]);

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
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      {/* TODO add back <Button color="inherit" onClick={toggleShowStarredEvents}>{showStarredEvents ? 'Unsort Star' : 'Sort Star'}</Button>*/}
    </AppBar>
  );
}
