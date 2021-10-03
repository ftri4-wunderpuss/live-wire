import React, { useEffect, useState } from 'react';

import { MDCDialog } from '@material/dialog';

export default function Test() {

  const [dialog, setDialog] = useState(undefined);


  useEffect(() => {
    console.log(document.getElementById('test'));

    const dialog = new MDCDialog(document.getElementById('test'));
    dialog.escapeKeyAction = '';
    setDialog(dialog);
  }, []);

  return (
    <>
      <button onClick={() => dialog.open()}>Open</button>
      <div id='test' className="mdc-dialog">
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface"
            role="dialog"
            aria-modal="true"
            aria-labelledby="my-dialog-title"
            aria-describedby="my-dialog-content">

            <h2 className="mdc-dialog__title" id="my-dialog-title">Hello World</h2>

            <div className="mdc-dialog__content" id="my-dialog-content">
              <input type='text' placeholder='Test input' />
            </div>

            <div className="mdc-dialog__actions">
              <button type="button" className="mdc-button mdc-dialog__button"
                data-mdc-dialog-action="ok">
                <div className="mdc-button__ripple"></div>
                <span className="mdc-button__label">OK</span>
              </button>
            </div>

          </div>
        </div>
        <div className="mdc-dialog__scrim"></div>
      </div>
    </>
  );
}