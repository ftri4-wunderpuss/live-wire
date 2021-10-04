import React, { useCallback } from 'react';

import './../sass/views/SettingEditField.scss';

export default function SettingEditField({
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
    <div className='setting-edit-field'>
      {errorMessage && <p className='setting-edit-field-error'>{errorMessage}</p>}
      <input type='text' value={value} onChange={onChange} onKeyPress={handleKeyPress} />
    </div>
  );
}
