/**
 * PageContent component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import styles from './styles';

const useStyles = makeStyles(styles);

const PageContent = ({ children }) => {
  const classes = useStyles();

  return (
    <Fade in timeout={250}>
      <div className={classes.root}>{children}</div>
    </Fade>
  );
};

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContent;
