return (
  <Paper>
    <Typography variant="h4" component="h3">
      Account Settings
    </Typography>
    {/*
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
        */}

    <Typography variant="h4" component="h3">
      Filters
    </Typography>

    {/*}
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
    */}

    <Typography variant="h4" component="h3">
      Notifications
    </Typography>
    {/*}
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
    {/*<li><a>Activate Browser Notifications</a></li>
  </ul>
  */}


    <Typography variant="h4" component="h3">
      Followed Artists
    </Typography>
    {/*}
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
      */}

    {/* TODO add delete account component and hooks */}

  </Paper >
);