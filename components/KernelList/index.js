/**
 * KernelList component.
 */
import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import { KernelsContext, DispatchContext } from '../../contexts';
import { hydrateIndexData } from '../../actions/kernels.actions';
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
        {entries.map(({ version_name, version_slug, last_modified }, i) => (
          <Grid item xs={3} key={version_name}>
            <Paper className={classes.paper}>
              <Link href="/kernel/[version]" as={`/kernel/${version_slug}`}>
                <a>{version_name}</a>
              </Link>
              <p>
                <em>{last_modified}</em>
              </p>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default KernelList;
