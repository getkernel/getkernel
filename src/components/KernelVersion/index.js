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
import PageContent from '../PageContent';
import {
  KernelsContext,
  KernelsDispatchContext,
  GlobalDispatchContext,
} from '../../contexts';
import { addKernelData, showWebViewer } from '../../actions';
import LoadingIndicator from '../LoadingIndicator';
import styles from './styles';
import PlatformListItem from '../PlatformListItem';

const useStyles = makeStyles(styles);

const KernelVersion = ({ version }) => {
  const classes = useStyles();

  const { kernels } = useContext(KernelsContext);
  const kernelsDispatch = useContext(KernelsDispatchContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  const [selectedKernel, setSelectedKernel] = useState({});

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
  }, [kernels, version]);

  const handleShowWebViewer = (url, title) => {
    globalDispatch(showWebViewer({ url, title }));
  };

  if (!(version && selectedKernel)) {
    return <LoadingIndicator />;
  }

  const { base_url, changes, gpg_key, files } = selectedKernel;

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <Button onClick={() => handleShowWebViewer(changes, 'Changes')}>
            Changes
          </Button>
          <Button onClick={() => handleShowWebViewer(gpg_key, 'GPG Key')}>
            GPG Key
          </Button>
        </Toolbar>
      </AppBar>
      <PageContent>
        <Grid container spacing={3}>
          {files &&
            files.map((file) => (
              <PlatformListItem
                key={file.platform}
                {...file}
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
  version: PropTypes.string,
};

export default KernelVersion;
