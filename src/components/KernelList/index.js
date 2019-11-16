/**
 * KernelList component.
 */
import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import KernelListItem from '../KernelListItem';
import { KernelsContext, DispatchContext } from '../../contexts';
import { hydrateIndexData } from '../../actions';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelList = () => {
  const classes = useStyles();

  const {
    index: { entries },
    kernels,
  } = useContext(KernelsContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const getInitialData = async () => {
      const res = await fetch('http://localhost:3000/api/kernels');
      const json = await res.json();

      if (json.success) {
        dispatch(hydrateIndexData(json.data));
      }
    };

    if (!entries.length) {
      getInitialData();
    }
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {entries
          .filter((e) => e.version_name.startsWith('v5'))
          .map((entry) => (
            <KernelListItem key={entry.version_slug} {...entry} />
          ))}
      </Grid>
    </div>
  );
};

export default KernelList;
