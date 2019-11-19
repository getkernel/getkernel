/**
 * GlobalSnackbar component.
 * Rendered by MainLayout.
 */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { GlobalContext, GlobalDispatchContext } from '../../contexts';
import { closeSnackbar } from '../../actions';
import styles from './styles';

const useStyles = makeStyles(styles);

const GlobalSnackbar = () => {
  const classes = useStyles();

  const {
    snackbar: { open, text },
  } = useContext(GlobalContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  const handleClose = (event, reason) => {
    globalDispatch(closeSnackbar());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'snackbar-message-id',
      }}
      message={<span id="snackbar-message-id">{text}</span>}
      action={[
        // <Button key="undo" color="secondary" size="small" onClick={handleClose}>
        //   UNDO
        // </Button>,
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

export default GlobalSnackbar;
