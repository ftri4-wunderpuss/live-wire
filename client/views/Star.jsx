import React from 'react';

import './../sass/views/Star.scss';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Star({
  isStarred,
  toggleIsStarred
}) {
  return (
    <div className='event-star' onClick={toggleIsStarred}>
      {isStarred
        ? <StarIcon fontSize='large' sx={{ color: 'warning.main' }} />
        : <StarBorderIcon fontSize='large' />}
    </div>
  );
}
