import React from 'react';
import './../sass/views/EditButton.scss';

import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

export default function EditButton({
  onClick
}) {
  return (
    <Button
      className='edit-button'
      type='button'
      onClick={onClick}
      endIcon={<EditIcon />}
    ></Button>
  );
}
