import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import './../sass/views/NavBar.scss';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: 20,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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

  const navigateToAccount = useCallback(() => {
    if (history.location.pathname !== '/account') history.push('/account');
  }, [history]);

  const navigateToFeed = useCallback(() => {
    if (history.location.pathname !== '/feed') history.push('/feed');
  }, [history]);

  return (
    <div id='nav-bar'>
      <AppBar position="static">
        <Toolbar>
          {/* TODO <img alt='page logo' /> */}
          <Typography
            id='nav-bar-logo'
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, minWidth: 100 }}
            onClick={navigateToFeed}
          >
            Live Wire
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Find artists..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </Search>
          <Button color="inherit" onClick={navigateToAccount}>Account</Button>
          <Button color="inherit" onClick={openLogoutModal}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
