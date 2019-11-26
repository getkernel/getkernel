/**
 * KernelVersion component.
 */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Scroll from 'react-scroll';
import PageContent from '../PageContent';
import {
  KernelsContext,
  KernelsDispatchContext,
  GlobalDispatchContext,
} from '../../contexts';
import { addKernelData, showWebViewer } from '../../actions';
import LoadingIndicator from '../LoadingIndicator';
import PlatformListItem from '../PlatformListItem';
import BookmarkToggle from '../BookmarkToggle';
import Version from '../../models/Version';
import styles from './styles';
import appConfig from '../../app.config';

const useStyles = makeStyles(styles);

const KernelVersion = ({ version }) => {
  const classes = useStyles();

  const { kernels } = useContext(KernelsContext);
  const kernelsDispatch = useContext(KernelsDispatchContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  const [selectedKernel, setSelectedKernel] = useState({});

  const versionObj = new Version(version);

  useEffect(() => {
    const getKernelData = async () => {
      const res = await fetch(`http://localhost:3000/api/kernel/${version}`);
      const json = await res.json();

      if (json.success) {
        kernelsDispatch(addKernelData(json.data));
      }
    };

    const kernel = version && kernels.find((k) => k.version === version);

    if (version && !kernel) {
      getKernelData();
    }

    if (kernel) {
      setSelectedKernel(kernel);
    }
  }, [kernels, kernelsDispatch, version]);

  const handleShowWebViewer = (url, title) => {
    globalDispatch(showWebViewer(url, title));
  };

  if (!(version && selectedKernel)) {
    return <LoadingIndicator />;
  }

  const { base_url, changes, checksums, gpg_key, files } = selectedKernel;

  const toolbarButtons = [
    {
      text: 'Changes',
      handler: () => handleShowWebViewer(changes, 'Changes'),
    },
    {
      text: 'Checksums',
      handler: () => handleShowWebViewer(checksums, 'Checksums (All)'),
    },
    {
      text: 'GPG Key',
      handler: () => handleShowWebViewer(gpg_key, 'GPG Key'),
    },
  ];

  const platforms = files
    ? files.map(({ platform, build_status }) => ({ platform, build_status }))
    : [];

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Toolbar className={classes.toolbar}>
          <div className={classes.platformChips}>
            {platforms.map(({ platform, build_status }) => (
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
                  icon={build_status ? <CheckIcon /> : <CloseIcon />}
                  variant="outlined"
                  size="small"
                  clickable
                />
              </Scroll.Link>
            ))}
          </div>
          <div>
            {toolbarButtons.map(({ text, handler }) => (
              <Button key={`toolbar-button-${text}`} onClick={handler}>
                {text}
              </Button>
            ))}
            <BookmarkToggle version={versionObj} size="medium" />
          </div>
        </Toolbar>
      </AppBar>
      <PageContent>
        <Grid container spacing={3}>
          {files &&
            files.map((file) => (
              <PlatformListItem
                key={file.platform}
                {...file}
                version={version}
                base_url={base_url}
                handleShowWebViewer={handleShowWebViewer}
              />
            ))}
        </Grid>
      </PageContent>
    </div>
  );
};

KernelVersion.propTypes = {
  version: PropTypes.string.isRequired,
};

export default KernelVersion;
