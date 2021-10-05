import React, { useCallback } from 'react';

import './../sass/views/SettingEditField.scss';

import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

export default function SettingEditField({
  id,
  placeholder,
  value,
  onChange,
  handleEnterKeydown,
  errorMessage
}) {

  const handleKeyPress = useCallback(event => {
    if (event.key === 'Enter') {
      handleEnterKeydown();
      event.preventDefault();
    }
  }, [handleEnterKeydown]);

  return (
    <FormControl
      error={errorMessage.length > 0}
      variant="standard"
    >
      <InputLabel htmlFor={id}>{placeholder}</InputLabel>
      <Input
        id={id}
        aria-describedby={id + "-error-text"}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      {errorMessage.length > 0 && <FormHelperText id={id + "-error-text"}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
