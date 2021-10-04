import React from 'react';

import './../sass/views/UnfollowButton.scss';
import removeIconUrl from './../assets/icons/remove_circle_outline_black_24dp.svg';

export default function UnfollowButton({
  onClick
}) {
  return (
    <button
      className='unfollow-button'
      type='button'
      onClick={onClick}
    >
      Unfollow <img src={removeIconUrl} alt='remove artist icon' />
    </button>
  );
}
