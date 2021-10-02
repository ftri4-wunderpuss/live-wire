import React, { useCallback } from 'react';

import './../sass/views/NavBar.scss';

export default function NavBar({
  searchValue,
  setSearchValue
}) {
  const onChange = useCallback(event => {
    setSearchValue(event.target.value);
  }, [setSearchValue]);

  return (
    <div id='nav-bar'>
      <img alt='page logo' />
      <input type='text' required minLength='1' size='30' value={searchValue} onChange={onChange} />
      <nav>
        <ul>
          <li>Account</li>
          <li>Logout</li>
        </ul>
      </nav>
    </div>
  );
}
