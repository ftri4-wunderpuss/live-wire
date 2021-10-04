import React from 'react';

import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function FollowButton({
  onClick
}) {
  return (
    <Button
      className='follow-button'
      type='button'
      onClick={onClick}
      variant="outlined"
      size="small"
      endIcon={<AddCircleIcon />}
      color='success'
    >Follow</Button>
  );
}
