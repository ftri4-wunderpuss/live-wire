import React from 'react';

import './../sass/views/Splash.scss';

import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';


export default function Splash() {
  // TODO change to an animation of a metronome!
  return (
    <div className="splash">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <LinearProgress className='splashElement' sx={{ width: '80%' }} />
      </Backdrop>
    </div>
  );
}
