/**
 * KernelVersionToolbar component.
 * Rendered by KernelVersion.
 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Scroll from 'react-scroll';
import BookmarkToggle from '../BookmarkToggle';
import Kernel from '../../models/Kernel';
import Version from '../../models/Version';
import styles from './styles';
import appConfig from '../../app.config';

const useStyles = makeStyles(styles);

const KernelVersionToolbar = ({ kernel, version, handleShowWebViewer }) => {
  const classes = useStyles();

  const { builds, urls } = kernel;

  const toolbarButtons = [
    {
      text: 'Changes',
      handler: useCallback(() => handleShowWebViewer(urls.changes, 'Changes')),
    },
    {
      text: 'Checksums',
      handler: useCallback(() =>
        handleShowWebViewer(urls.checksums, 'Checksums (All)'),
      ),
    },
    {
      text: 'GPG Key',
      handler: useCallback(() => handleShowWebViewer(urls.gpgKey, 'GPG Key')),
    },
  ];

  const platforms = kernel.hasBuilds()
    ? builds.map(({ platform, buildStatus }) => ({
        platform,
        buildStatus,
      }))
    : [];

  if (!kernel.hasBuilds()) {
    return null;
  }

  return (
    <Fade in timeout={500}>
      <AppBar position="sticky" color="default">
        <Toolbar className={classes.toolbar}>
          <Box className={classes.platformChips}>
            {platforms.map(({ platform, buildStatus }) => (
              <Scroll.Link
                activeClass={classes.linkActive}
                key={`platform-chip-${platform}`}
                to={platform}
                spy
                hashSpy
                smooth
                offset={-70}
                duration={appConfig.smoothScrollDuration}
              >
                <Chip
                  label={platform}
                  icon={buildStatus ? <CheckIcon /> : <CloseIcon />}
                  variant="outlined"
                  size="small"
                  clickable
                />
              </Scroll.Link>
            ))}
          </Box>
          <Box>
            {toolbarButtons.map(({ text, handler }) => (
              <Button key={`toolbar-button-${text}`} onClick={handler}>
                {text}
              </Button>
            ))}
            <BookmarkToggle version={version} size="medium" />
          </Box>
        </Toolbar>
      </AppBar>
    </Fade>
  );
};

KernelVersionToolbar.propTypes = {
  kernel: PropTypes.instanceOf(Kernel).isRequired,
  version: PropTypes.instanceOf(Version).isRequired,
  handleShowWebViewer: PropTypes.func.isRequired,
};

export default KernelVersionToolbar;
