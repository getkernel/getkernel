/**
 * KernelVersion component.
 */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import BuildObject from '../../models/BuildObject';
import { getKernel } from '../../api';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelVersion = ({ version, tag }) => {
  const classes = useStyles();

  const { kernels } = useContext(KernelsContext);
  const kernelsDispatch = useContext(KernelsDispatchContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  const [selectedKernel, setSelectedKernel] = useState(new Kernel());

  const versionObj = new Version(version);

  useEffect(() => {
    const getKernelData = async () => {
      const { success, data } = await getKernel(version, tag);

      if (success) {
        kernelsDispatch(addKernelData(data));
      }
    };

    const kernelItem =
      version &&
      kernels.find(
        (k) => k.version === version && (tag ? k.tag === tag : true),
      );

    if (version && !kernelItem) {
      getKernelData();
      globalDispatch(setIsLoading(true));
    }

    if (kernelItem) {
      setSelectedKernel(Kernel.parse(kernelItem));
      globalDispatch(setIsLoading(false));
    }
  }, [kernels, kernelsDispatch, version, tag]);

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
                build={BuildObject.parse(build)}
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

KernelVersion.defaultProps = {
  tag: null,
};

KernelVersion.propTypes = {
  version: PropTypes.string.isRequired,
  tag: PropTypes.string,
};

export default KernelVersion;
