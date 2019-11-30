/**
 * KernelVersion component.
 */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import KernelVersionToolbar from '../KernelVersionToolbar';
import BuildListItem from '../BuildListItem';
import {
  KernelsContext,
  KernelsDispatchContext,
  GlobalDispatchContext,
} from '../../contexts';
import { addKernelData, showWebViewer, setIsLoading } from '../../actions';
import Version from '../../models/Version';
import Kernel from '../../models/Kernel';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelVersion = ({ version }) => {
  const classes = useStyles();

  const { kernels } = useContext(KernelsContext);
  const kernelsDispatch = useContext(KernelsDispatchContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  const [selectedKernel, setSelectedKernel] = useState(new Kernel());

  const versionObj = new Version(version);

  useEffect(() => {
    const getKernelData = async () => {
      const res = await fetch(
        `${window.location.origin}/api/kernel/${version}`,
      );
      const json = await res.json();

      if (json.success) {
        kernelsDispatch(addKernelData(json.data));
      }
    };

    const kernelItem = version && kernels.find((k) => k.version === version);

    if (version && !kernelItem) {
      getKernelData();
      globalDispatch(setIsLoading(true));
    }

    if (kernelItem) {
      setSelectedKernel(Kernel.parse(kernelItem));
      globalDispatch(setIsLoading(false));
    }
  }, [kernels, kernelsDispatch, version]);

  const handleShowWebViewer = useCallback((url, title) => {
    globalDispatch(showWebViewer(url, title));
  });

  const { builds, kernelUrl } = selectedKernel;

  return (
    <div className={classes.root}>
      <KernelVersionToolbar
        kernel={selectedKernel}
        version={versionObj}
        handleShowWebViewer={handleShowWebViewer}
      />
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
