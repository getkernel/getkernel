import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import styles from '../styles/KernelList.style';
import { KernelsContext, DispatchContext } from '../contexts';

const useStyles = makeStyles(styles);

const KernelList = () => {
  const classes = useStyles();

  const { index, kernels } = useContext(KernelsContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const getInitialData = async () => {
      const res = await fetch('http://localhost:3000/api/kernels');
      const json = await res.json();

      if (json.success) {
        dispatch({ type: 'HYDRATE_INDEX_DATA', data: json.data });
      }
    };

    if (!index.length) {
      console.log('FETCH DATA');
      getInitialData();
    }
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {index.map(({ version_name, version_slug, last_modified }, i) => (
          <Grid item xs={3} key={version_name}>
            <Paper className={classes.paper}>
              <Link href="/kernel/[version]" as={`/kernel/${version_slug}`}>
                <a>{version_name}</a>
              </Link>
              <em>{last_modified}</em>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default KernelList;
