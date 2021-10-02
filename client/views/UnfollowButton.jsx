import { render } from 'node-sass';
import React from 'react';

import removeIconUrl from './../assets/icons/remove_circle_outline_black_24dp.svg';

export default function UnfollowButton({
  onClick
}) {
  return (
    <button
      type='button'
      onClick={removeArtist}
    >
      Unfollow <img src={removeIconUrl} alt='remove artist icon' />
    </button>
  );
}