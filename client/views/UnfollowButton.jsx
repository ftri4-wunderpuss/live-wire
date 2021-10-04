import React from 'react';

import './../sass/views/UnfollowButton.scss';

import Button from '@mui/material/Button';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function UnfollowButton({
  onClick
}) {
  return (
    <Button
      className='unfollow-button'
      type='button'
      onClick={onClick}
      variant="outlined"
      size="small"
      endIcon={<RemoveCircleIcon />}
    >Unfollow</Button>
  );
}
