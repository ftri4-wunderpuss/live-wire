import React from 'react';

import './../sass/views/Splash.scss';

import LinearProgress from '@mui/material/LinearProgress';

export default function Splash() {
  // TODO change to an animation of a metronome!
  return (
    <div className="splash">
      <LinearProgress sx={{ width: '80%' }} />
    </div>
  );
}
