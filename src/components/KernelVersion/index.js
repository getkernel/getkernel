/**
 * KernelVersion component.
 */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';
import PageContent from '../PageContent';
import { KernelsContext, KernelsDispatchContext } from '../../contexts';
import { addKernelData } from '../../actions';
import LoadingIndicator from '../LoadingIndicator';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelVersion = ({ version }) => {
  const classes = useStyles();

  const { kernels } = useContext(KernelsContext);
  const dispatch = useContext(KernelsDispatchContext);

  const [selectedKernel, setSelectedKernel] = useState({});

  useEffect(() => {
    const getKernelData = async () => {
      const res = await fetch(`http://localhost:3000/api/kernel/${version}`);
      const json = await res.json();

      if (json.success) {
        dispatch(addKernelData(json.data));
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

  if (!(version && selectedKernel)) {
    return <LoadingIndicator />;
  }

  const { base_url, changes, gpg_key, files } = selectedKernel;

  return (
    <div className={classes.root}>
      <PageContent>
        <h2>Kernel version: {version}</h2>
      </PageContent>
    </div>
  );
};

KernelVersion.propTypes = {
  version: PropTypes.string,
};

export default KernelVersion;
