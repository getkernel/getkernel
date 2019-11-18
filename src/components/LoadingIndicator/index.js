/**
 * LoadingIndicator component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import styles from './styles';

const useStyles = makeStyles(styles);

const LoadingIndicator = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
};

export default LoadingIndicator;
