/**
 * KernelVersion component.
 */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
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
import BuildListItem from '../BuildListItem';
import BookmarkToggle from '../BookmarkToggle';
import Version from '../../models/Version';
import Kernel from '../../models/Kernel';
import styles from './styles';
import appConfig from '../../app.config';

const useStyles = makeStyles(styles);

const KernelVersion = ({ version }) => {
  const classes = useStyles();

  const { kernels } = useContext(KernelsContext);
  const kernelsDispatch = useContext(KernelsDispatchContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  const [loading, setLoading] = useState(true);
  const [selectedKernel, setSelectedKernel] = useState(new Kernel());

  const versionObj = new Version(version);

  useEffect(() => {
    const getKernelData = async () => {
      const res = await fetch(`http://localhost:3000/api/kernel/${version}`);
      const json = await res.json();

      if (json.success) {
        kernelsDispatch(addKernelData(json.data));
      }
    };

    const kernelItem = version && kernels.find((k) => k.version === version);

    if (version && !kernelItem) {
      getKernelData();
    }

    if (kernelItem) {
      setSelectedKernel(Kernel.parse(kernelItem));
      setLoading(false);
    }
  }, [kernels, kernelsDispatch, version]);

  const handleShowWebViewer = (url, title) => {
    globalDispatch(showWebViewer(url, title));
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  const { kernelUrl, builds, urls } = selectedKernel;

  const toolbarButtons = [
    {
      text: 'Changes',
      handler: () => handleShowWebViewer(urls.changes, 'Changes'),
    },
    {
      text: 'Checksums',
      handler: () => handleShowWebViewer(urls.checksums, 'Checksums (All)'),
    },
    {
      text: 'GPG Key',
      handler: () => handleShowWebViewer(urls.gpgKey, 'GPG Key'),
    },
  ];

  const platforms = builds
    ? builds.map(({ platform, buildStatus }) => ({ platform, buildStatus }))
    : [];

  return (
    <div className={classes.root}>
      <Fade in timeout={500}>
        <AppBar position="sticky" color="default">
          <Toolbar className={classes.toolbar}>
            <div className={classes.platformChips}>
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
      </Fade>
      <PageContent>
        <Grid container spacing={3}>
          {builds &&
            builds.map((build, index) => (
              <BuildListItem
                key={build.platform}
                build={build}
                version={version}
                kernelUrl={kernelUrl}
                index={index}
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
