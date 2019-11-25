/**
 * InfoPanel component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

const useStyles = makeStyles(styles);

const InfoPanel = ({ title, text, icon: Icon, children }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.titleArea}>
        <Icon />
        <Typography variant="h6">{title}</Typography>
      </div>
      <Typography variant="body2">{text}</Typography>
      {children && <div className={classes.contentArea}>{children}</div>}
    </Paper>
  );
};

InfoPanel.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  children: PropTypes.object,
};

export default InfoPanel;
