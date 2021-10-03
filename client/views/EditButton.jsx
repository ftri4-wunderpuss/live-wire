import React from 'react';

import './../sass/views/EditButton.scss';
import editIconUrl from './../assets/icons/edit_black_24dp.svg';

export default function EditButton({
  onClick
}) {
  return (
    <button
      className='edit-button'
      type='button'
      onClick={onClick}
    ><img src={editIconUrl} alt='remove artist icon' /></button>
  );
}
