import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import useTextField from '../hooks/useTextField';

export default function LoginModal({
  isOpen,
  handleClose
}) {
  /* STATE */
  const [email, onEmailChange] = useTextField('');
  const [password, onPasswordChange] = useTextField('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  /* RENDER */

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Login
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter credentials below
          </DialogContentText>
          <TextField
            id="name-field"
            label="Your name"
            variant="standard"
            required
            value={email}
            onChange={onEmailChange}
          />
          <TextField
            id="password-field"
            label="Password"
            variant="standard"
            required
            value={password}
            onChange={onPasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Login
          </Button>
          <Button onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
