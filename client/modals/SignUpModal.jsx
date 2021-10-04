import React, { useCallback, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTextField from '../hooks/useTextField.js';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

import usePasswordTextField from '../hooks/usePasswordTextField.js';

const { isValidName, isValidEmail, isValidPassword, isValidCityName } = require('../../shared/validation.js');

export default function SignUpModal({
  isOpen,
  closeModal,
  errorMessage,
  handleRegisterUser,
}) {
  /* STATE */

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [error, setError] = useState('');
  const [name, onNameChange] = useTextField('');
  const [email, onEmailChange] = useTextField('');
  const [cityName, onCityNameChange] = useTextField('');

  const [password1, showPassword1, onPasswordChange1, handleClickShowPassword1] = usePasswordTextField('');
  const [password2, showPassword2, onPasswordChange2, handleClickShowPassword2] = usePasswordTextField('');


  /* ACTION */

  const onSubmit = useCallback(() => {
    //conditionals, validation passes, then invoke handlRegisterUser, else change error state
    if (!isValidName(name)) return setError('Invalid Name: PLease omit numbers and special characters');
    if (!isValidEmail(email)) return setError('Invalid email address');
    if (password1 !== password2) return setError('Passwords don\'t match');
    if (!isValidCityName(cityName)) return setError('Invalid city name');
    if (!isValidPassword(password1))
      return setError(`Password should contain: /n
          at least one upper case character \n 
          at least one lower case character \n
          at least one number \n
          and be at least 6 characters long`
      );
    return handleRegisterUser(name, email, password1, cityName);
  }, [email, handleRegisterUser, name, password1, password2, cityName]);


  /* RENDER */

  const isPassword1Valid = password1.length === 0 || isValidPassword(password1);
  const isPassword2Valid = password2.length === 0 || isValidPassword(password2);
  const isEmailValid = email.length === 0 || isValidEmail(email);
  const isCityNameValid = cityName.length === 0 || isValidCityName(cityName);
  const isNameValid = name.length === 0 || isValidName(name);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Sign Up
      </DialogTitle>
      <DialogContent>
        {(error.length > 0 || errorMessage.length > 0) &&
          <DialogContentText sx={{ color: 'error.main' }} >
            {error.length > 0 && error}
            {errorMessage.length > 0 && errorMessage}
          </DialogContentText>
        }

        <Stack
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            width: 400,
          }}
          spacing={3}
        >

          <FormControl
            error={!isNameValid}
            variant="standard"
          >
            <InputLabel htmlFor="name-field">Name</InputLabel>
            <Input
              id="name-field"
              aria-describedby="name-error-text"
              required
              value={name}
              onChange={onNameChange}
            />
            {!isNameValid && <FormHelperText id="name-error-text">Name must only be word characters without numbers</FormHelperText>}
          </FormControl>

          <FormControl
            error={!isEmailValid}
            variant="standard"
          >
            <InputLabel htmlFor="email-field">Email</InputLabel>
            <Input
              id="email-field"
              aria-describedby="email-error-text"
              value={email}
              onChange={onEmailChange}
            />
            {!isEmailValid && <FormHelperText id="email-error-text">Invalid email</FormHelperText>}
          </FormControl>

          <FormControl
            error={!isCityNameValid}
            variant="standard"
          >
            <InputLabel htmlFor="cityName-field">Home City</InputLabel>
            <Input
              id="cityName-field"
              aria-describedby="city-error-text"
              value={cityName}
              onChange={onCityNameChange}
            />
            {!isCityNameValid && <FormHelperText id="city-error-text">Invalid City Name</FormHelperText>}
          </FormControl>


          <FormControl
            error={!isPassword1Valid}
            variant="standard"
          >
            <InputLabel htmlFor="password-field-1">Password</InputLabel>
            <Input
              id="password-field-1"
              variant="standard"
              type={showPassword1 ? 'text' : 'password'}
              value={password1}
              onChange={onPasswordChange1}
              aria-describedby="password-1-error-text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                  >
                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!isPassword1Valid && <FormHelperText id="password-1-error-text">Password must include upper-case, lower-case, number digit, and be at least 6 characters long</FormHelperText>}
          </FormControl>

          <FormControl
            error={!isPassword2Valid}
            variant="standard"
          >
            <InputLabel htmlFor="password-field-2">Re-enter Password</InputLabel>
            <Input
              id="password-field-2"
              variant="standard"
              type={showPassword2 ? 'text' : 'password'}
              value={password2}
              onChange={onPasswordChange2}
              aria-describedby="password-2-error-text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!isPassword2Valid && <FormHelperText id="password-2-error-text">Password must include upper-case, lower-case, number digit, and be at least 6 characters long</FormHelperText>}
          </FormControl>

          {/* STRETCH add checkbox for email notification */}

        </Stack>

      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>
          Submit
        </Button>
        <Button onClick={closeModal}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
