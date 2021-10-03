import React, { useCallback, useState } from 'react';

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
import { useTheme } from '@mui/material/styles';
import useTextField from '../hooks/useTextField.js';

const { isValidName, isValidEmail, isValidPassword } = require('../../shared/validation.js');

export default function SignUpModal ({
    isOpen,
    closeModal,
    handleRegisterUser, 
    errorMessage 
}) {
  

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [error, setError] = useState('');
  const [name, onNameChange] = useTextField('');
  const [email, onEmailChange] = useTextField('');
  const [password1, onPassword1Change] = useTextField('');
  const [password2, onPassword2Change] = useTextField('');

  const onSubmit = useCallback(() => {
    //conditionals, validation passes, then invoke handlRegisterUser, else change error state
    if (isValidName(name) === false) return setError('Invalid Name: PLease omit numbers and special characters'); 
    if (isValidEmail(email) === false) return setError('Invalid Email Address');
    if (password1 !== password2)  return setError('Passwords don\'t match'); 
    if (isValidPassword(password1) === false) 
        return setError(`Password should contain: /n
          at least one upper case character \n 
          at least one lower case character \n
          at least one number \n
          and be at least 6 characters long` 
        );
    return handleRegisterUser(name, email, password1);
  }, [email, handleRegisterUser, name, password1, password2]);



  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">
          Sign Up
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              Enter your name, email address, and choose a password
              {error.length > 0 && error}
              {errorMessage.length > 0 && errorMessage}
          </DialogContentText>
          <FormControl
              error={name.length > 0 && !isValidName(name)}
              variant="standard"
            >
              <InputLabel htmlFor="name-field">Name</InputLabel>
              <Input
                id="name-field"
                required 
                value={name}
                onChange={onNameChange}
              />
           </FormControl>
           <FormControl
              error={email.length > 0 && !isValidEmail(email)}
              variant="standard"
            >
              <InputLabel htmlFor="email-field">Email</InputLabel>
              <Input
                id="email-field"
                required 
                value={email}
                onChange={onEmailChange}
              />
           </FormControl>
           <FormControl
              error={password1.length > 0 && !isValidPassword(password1)}
              variant="standard"
            >
              <InputLabel htmlFor="password1-field">Password</InputLabel>
              <Input
                id="password1-field"
                required 
                value={password1}
                onChange={onPassword1Change}
              />
           </FormControl>
           <FormControl
              error={password2.length > 0 && !isValidPassword(password2)}
              variant="standard"
            >
              <InputLabel htmlFor="password2-field">Re-Enter Password</InputLabel>
              <Input
                id="password2-field"
                required 
                value={password2}
                onChange={onPassword2Change}
              />
           </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSubmit}>
            Submit
          </Button>
          <Button onClick={closeModal}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}
