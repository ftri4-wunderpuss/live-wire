import React from 'react';

import './../sass/views/FollowButton.scss';
import followIconUrl from './../assets/icons/add_circle_outline_black_24dp.svg';

export default function FollowButton({
  onClick
}) {
  return (
    <button
      className='follow-button'
      type='button'
      onClick={onClick}
    >
      Follow <img src={followIconUrl} alt='follow artist icon' />
    </button>
  );
}