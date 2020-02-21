/**
 * WebViewerDialog component.
 * Rendered by MainLayout.
 */
import React, { useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GlobalContext, GlobalDispatchContext } from '../../contexts';
import { closeWebViewer, showSnackbar } from '../../actions';
import styles from './styles';

const useStyles = makeStyles(styles);

const WebViewerDialog = () => {
  const classes = useStyles();
  const theme = useTheme();

  const {
    webViewer: { open, url, title },
  } = useContext(GlobalContext);
  const dispatch = useContext(GlobalDispatchContext);

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    dispatch(closeWebViewer());
  };

  const handleCopyLink = () => {
    dispatch(showSnackbar('Copied to clipboard!'));
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle
        classes={{ root: classes.titleRoot }}
        id="max-width-dialog-title"
      >
        {title}
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogRoot }}>
        <iframe src={url} className={classes.iframe} title={title} />
      </DialogContent>
      <DialogActions>
        <CopyToClipboard text={url} onCopy={handleCopyLink}>
          <Button color="primary">Copy Link</Button>
        </CopyToClipboard>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WebViewerDialog;
