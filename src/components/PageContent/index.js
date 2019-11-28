/**
 * PageContent component.
 */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import LoadingIndicator from '../LoadingIndicator';
import { GlobalContext } from '../../contexts';
import styles from './styles';

const useStyles = makeStyles(styles);

const PageContent = ({ children }) => {
  const classes = useStyles();

  const { isLoading } = useContext(GlobalContext);

  return (
    <Fade in timeout={250}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Box className={classes.root}>{children}</Box>
      )}
    </Fade>
  );
};

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContent;
