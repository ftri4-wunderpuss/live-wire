import React, { useCallback, useState } from 'react';

import './../sass/containers/Settings.scss';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';


import UnfollowButton from './../views/UnfollowButton.jsx';
import EditButton from './../views/EditButton.jsx';
import SettingEditField from '../views/SettingEditField.jsx';
import { useHistory } from 'react-router-dom';

const { isValidName, isValidEmail, isValidPassword, isValidCityName } = require('./../../shared/validation');

function syncSettings(newSettings, history, setUser, setSettings) {
  fetch('/api/user', {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newSettings)
  }).then(async response => {
    const body = await response.json();

    if (response.status === 401) return history.push('/');
    if (response.status !== 200) throw body.error;

    setUser(body.user);
    setSettings(body.settings);
  }).catch(error => {
    console.error(error);
    alert(error); // todo remove
  });
}

export default function Settings({
  user,
  settings,
  followedArtists,
  setUser,
  setSettings,
  removeArtist,
}) {
  /* STATE */

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameFieldValue, setNameFieldValue] = useState(user.name);
  const [nameFieldError, setNameFieldError] = useState('');

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailFieldValue, setEmailFieldValue] = useState(user.email);
  const [emailFieldError, setEmailFieldError] = useState('');

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordFieldValue, setPasswordFieldValue] = useState('');
  const [passwordFieldError, setPasswordFieldError] = useState('');

  const [isEditingCity, setIsEditingCity] = useState(false);
  const [cityFieldValue, setCityFieldValue] = useState(settings.city);
  const [cityFieldError, setCityFieldError] = useState('');

  const history = useHistory();


  /* ACTIONS */

  // name input field
  const handleNameValueChange = useCallback(event => {
    setNameFieldValue(event.target.value);
  }, []);

  const handleNameSave = useCallback(() => {
    if (!isValidName(nameFieldValue)) {
      return setNameFieldError('Name can only be word characters without numbers.');
    }

    syncSettings({ name: nameFieldValue }, history, setUser, setSettings);

    // update immediately, although server response will cause further sync update
    setUser(user => ({
      ...user,
      name: nameFieldValue,
    }));

    setIsEditingName(false);
  }, [history, nameFieldValue, setSettings, setUser]);

  // email input field
  const handleEmailValueChange = useCallback(event => {
    setEmailFieldValue(event.target.value);
  }, []);

  const handleEmailSave = useCallback(() => {
    if (!isValidEmail(emailFieldValue)) {
      return setEmailFieldError('Email must be formatted correctly, example john@domain.com');
    }

    syncSettings({ email: emailFieldValue }, history, setUser, setSettings);

    // update immediately, although server response will cause further sync update
    setUser(user => ({
      ...user,
      email: emailFieldValue,
    }));

    setIsEditingEmail(false);
  }, [emailFieldValue, history, setSettings, setUser]);

  // password input field
  const handlePasswordValueChange = useCallback(event => {
    setPasswordFieldValue(event.target.value);
  }, []);

  const handlePasswordSave = useCallback(() => {
    if (!isValidPassword(passwordFieldValue)) {
      return setPasswordFieldError('Password must contain an upper-case, lower-case, and digit character and be at least 6 characters long.');
    }

    syncSettings({ password: passwordFieldValue }, history, setUser, setSettings);

    setIsEditingPassword(false);
  }, [history, passwordFieldValue, setSettings, setUser]);

  // city input field
  const handleCityValueChange = useCallback(event => {
    setCityFieldValue(event.target.value);
  }, []);

  const handleCitySave = useCallback(() => {
    if (!isValidCityName(cityFieldValue)) {
      return setCityFieldError('City name is not valid.');
    }

    // TODO handle server responding with invalid city error message
    syncSettings({ city: cityFieldValue }, history, setUser, setSettings);

    // update immediately, although server response will cause further sync update
    setSettings(settings => ({
      ...settings,
      city: cityFieldValue,
    }));

    setIsEditingCity(false);
  }, [cityFieldValue, history, setSettings, setUser]);

  // email notification toggle
  const handleEmailNotificationToggle = useCallback(event => {
    syncSettings({ receiveEmailNotifications: event.target.checked }, history, setUser, setSettings);

    // update immediately, although server response will cause further sync update
    setSettings(settings => ({
      ...settings,
      receiveEmailNotifications: event.target.checked,
    }));
  }, [history, setSettings, setUser]);


  /* RENDER */

  return (
    <Container maxWidth="sm">
      <Stack
        id='settings'
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <Paper
          id='account-settings'
          elevation={6}
          sx={{ width: 400 }}
        >
          <ul>
            {!isEditingName && <li>{user.name} <EditButton onClick={() => setIsEditingName(true)} /></li>}
            {isEditingName && <li>
              <SettingEditField
                id="name-input-field"
                placeholder="Name"
                value={nameFieldValue}
                onChange={handleNameValueChange}
                handleEnterKeydown={handleNameSave}
                errorMessage={nameFieldError}
              />
            </li>}

            {!isEditingEmail && <li>{user.email} <EditButton onClick={() => setIsEditingEmail(true)} /></li>}
            {isEditingEmail && <li>
              <SettingEditField
                id="email-input-field"
                placeholder="Email"
                value={emailFieldValue}
                onChange={handleEmailValueChange}
                handleEnterKeydown={handleEmailSave}
                errorMessage={emailFieldError}
              />
            </li>}

            {!isEditingPassword && <li onClick={() => setIsEditingPassword(true)}><a>Change password?</a></li>}
            {isEditingPassword && <li>
              <SettingEditField
                id="password-input-field"
                placeholder="Password"
                value={passwordFieldValue}
                onChange={handlePasswordValueChange}
                handleEnterKeydown={handlePasswordSave}
                errorMessage={passwordFieldError}
              />
            </li>}
          </ul>
        </Paper>

        <Paper
          id='filter-settings'
          elevation={6}
          sx={{ width: 400 }}
        >
          <ul>
            {!isEditingCity && <li>{settings.city} <EditButton onClick={() => setIsEditingCity(true)} /></li>}
            {isEditingCity && <li>
              <SettingEditField
                id="city-input-field"
                placeholder="Home City"
                value={cityFieldValue}
                onChange={handleCityValueChange}
                handleEnterKeydown={handleCitySave}
                errorMessage={cityFieldError}
              />
            </li>}
          </ul>
        </Paper>

        <Paper
          id='notification-settings'
          elevation={6}
          sx={{ width: 400 }}
        >
          <ul>
            <li>
              <input
                type="checkbox"
                id="email-notification"
                name="email-notification"
                checked={settings.receiveEmailNotifications}
                onChange={handleEmailNotificationToggle}
              />
              <label htmlFor="email-notification">Email Notification</label>
            </li>
            {/* STRETCH setup browser notifications */}
            <li><a>Activate Browser Notifications</a></li>
          </ul>
        </Paper>

        <Paper
          id='followed-artist-settings'
          elevation={6}
          sx={{ width: 400 }}
        >
          <ul>
            {followedArtists.map(artistListItem => (
              <li key={artistListItem.artistName}>
                {artistListItem.artistName}
                <UnfollowButton
                  onClick={() => removeArtist({ artistId: artistListItem.artistId, artistName: artistListItem.artistName })}
                />
              </li>
            ))}
          </ul>
        </Paper>

        {/* TODO add delete account component and hooks */}
      </Stack>
    </Container>
  );
}
