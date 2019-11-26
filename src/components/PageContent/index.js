/**
 * PageContent component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

const useStyles = makeStyles(styles);

const PageContent = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

PageContent.propTypes = {
  children: PropTypes.object.isRequired,
};

export default PageContent;
