import React, { useCallback, useState } from 'react';

import './../sass/containers/Settings.scss';

import UnfollowButton from './../views/UnfollowButton';
import EditButton from './../views/EditButton';
import SettingEditField from '../views/SettingEditField';

const { isValidName, isValidEmail, isValidPassword, isValidCityName } = require('./../../shared/validation');

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


  /* ACTIONS */

  // name input field
  const handleNameValueChange = useCallback(event => {
    setNameFieldValue(event.target.value);
  }, []);

  const handleNameSave = useCallback(() => {
    if (!isValidName(nameFieldValue)) {
      return setNameFieldError('Name can only be word characters without numbers.');
    }

    setUser(user => ({
      ...user,
      name: nameFieldValue,
    }));

    // TODO send AJAX request

    setIsEditingName(false);
  }, [nameFieldValue, setUser]);

  // email input field
  const handleEmailValueChange = useCallback(event => {
    setEmailFieldValue(event.target.value);
  }, []);

  const handleEmailSave = useCallback(() => {
    if (!isValidEmail(emailFieldValue)) {
      return setEmailFieldError('Email must be formatted correctly, example john@domain.com');
    }

    setUser(user => ({
      ...user,
      email: emailFieldValue,
    }));

    // TODO send AJAX request

    setIsEditingEmail(false);
  }, [emailFieldValue, setUser]);

  // password input field
  const handlePasswordValueChange = useCallback(event => {
    setPasswordFieldValue(event.target.value);
  }, []);

  const handlePasswordSave = useCallback(() => {
    if (!isValidPassword(passwordFieldValue)) {
      return setPasswordFieldError('Password must contain an upper-case, lower-case, and digit character and be at least 6 characters long.');
    }

    // TODO send AJAX request
  }, [passwordFieldValue]);

  // city input field
  const handleCityValueChange = useCallback(event => {
    setCityFieldValue(event.target.value);
  }, []);

  const handleCitySave = useCallback(() => {
    if (!isValidCityName(cityFieldValue)) {
      return setCityFieldError('Password must contain an upper-case, lower-case, and digit character and be at least 6 characters long.');
    }

    setSettings(settings => ({
      ...settings,
      city: cityFieldValue,
    }));

    // TODO send AJAX request
  }, [cityFieldValue, setSettings]);

  // email notification toggle
  const handleEmailNotificationToggle = useCallback(event => {
    setSettings(settings => ({
      ...settings,
      receiveEmailNotifications: event.target.checked,
    }));

    // TODO send AJAX request
  }, [setSettings]);

  /* RENDER */

  return (
    <div id='settings'>
      <div id='account-settings'>
        <ul>
          {!isEditingName && <li>{user.name} <EditButton onClick={() => isEditingName(true)} /></li>}
          {isEditingName && <li>
            <SettingEditField
              value={nameFieldValue}
              onChange={handleNameValueChange}
              handleEnterKeydown={handleNameSave}
              errorMessage={nameFieldError}
            />
          </li>}

          {!isEditingEmail && <li>{user.email} <EditButton onClick={() => setIsEditingEmail(true)} /></li>}
          {isEditingEmail && <li>
            <SettingEditField
              value={emailFieldValue}
              onChange={handleEmailValueChange}
              handleEnterKeydown={handleEmailSave}
              errorMessage={emailFieldError}
            />
          </li>}

          {!isEditingPassword && <li onClick={() => setIsEditingPassword(true)}><a>Change password?</a></li>}
          {isEditingPassword && <li>
            <SettingEditField
              value={passwordFieldValue}
              onChange={handlePasswordValueChange}
              handleEnterKeydown={handlePasswordSave}
              errorMessage={passwordFieldError}
            />
          </li>}
        </ul>
      </div>

      <div id='filter-settings'>
        <ul>
          {!isEditingCity && <li>{settings.city} <EditButton onClick={() => setIsEditingCity(true)} /></li>}
          {isEditingCity && <li>
            <SettingEditField
              value={cityFieldValue}
              onChange={handleCityValueChange}
              handleEnterKeydown={handleCitySave}
              errorMessage={cityFieldError}
            />
          </li>}
        </ul>
      </div>

      <div id='notification-settings'>
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
      </div>

      <div id='followed-artist-settings'>
        <ul>
          {followedArtists.map(artistListItem => (
            <li key={artistListItem.artistName}>
              {artistListItem.artistName}
              <UnfollowButton
                onClick={() => removeArtist(artistListItem.artistId)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
