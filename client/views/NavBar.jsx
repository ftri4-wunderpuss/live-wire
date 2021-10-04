import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import './../sass/views/NavBar.scss';

export default function NavBar({
  searchValue,
  setSearchValue,
  openLogoutModal
}) {
  const history = useHistory();

  const onChange = useCallback(event => {
    setSearchValue(event.target.value);
  }, [setSearchValue]);

  const onKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      if (searchValue.length > 0) {
        // navigate to search page
        if (history.location.pathname !== '/search') history.push('/search');
      }
      event.preventDefault();
    }
  }, [history, searchValue]);

  return (
    <div id='nav-bar'>
      <img alt='page logo' />
      <input
        type='text'
        minLength='1'
        size='30'
        value={searchValue}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <nav>
        <ul>
          <li>Account</li>
          <li onClick={openLogoutModal}>Logout</li>
        </ul>
      </nav>
    </div>
  );
}
