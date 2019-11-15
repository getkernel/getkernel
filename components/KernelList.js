import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import styles from '../styles/KernelList.style';

const useStyles = makeStyles(styles);

const KernelList = ({ kernels }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {kernels.data.map(
          ({ version_name, version_slug, last_modified }, i) => (
            <Grid item xs={3} key={version_name}>
              <Paper className={classes.paper}>
                <Link href="/kernel/[version]" as={`/kernel/${version_slug}`}>
                  <a>{version_name}</a>
                </Link>
                <em>{last_modified}</em>
              </Paper>
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
};

export default KernelList;
