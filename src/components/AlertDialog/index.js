/**
 * AlertDialog component.
 */
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { GlobalContext, GlobalDispatchContext } from '../../contexts';
import { closeAlert, addDoNotAskItem, removeDoNotAskItem } from '../../actions';

const AlertDialog = () => {
  const { alert, doNotAskList } = useContext(GlobalContext);
  const dispatch = useContext(GlobalDispatchContext);

  const { id, open, title, text, successCallback, dismissCallback } = alert;

  const handleClose = () => {
    dispatch(closeAlert());
  };

  const handleAgree = () => {
    if (typeof successCallback === 'function') {
      successCallback();
    }
    handleClose();
  };

  const handleDisagree = () => {
    if (typeof dismissCallback === 'function') {
      dismissCallback();
    }
    handleClose();
  };

  const handleDoNotAsk = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(addDoNotAskItem(value));
    } else {
      dispatch(removeDoNotAskItem(value));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
        <FormControlLabel
          control={
            <Checkbox
              checked={doNotAskList.some((item) => item === id)}
              onChange={handleDoNotAsk}
              value={id}
              color="primary"
            />
          }
          label="Don't ask again"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree} color="primary">
          Disagree
        </Button>
        <Button onClick={handleAgree} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
