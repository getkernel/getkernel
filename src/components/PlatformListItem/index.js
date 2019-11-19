/**
 * PlatformListItem component.
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';

const useStyles = makeStyles(styles);

const PlatformListItem = ({
  base_url,
  platform,
  status,
  binaries,
  log,
  handleShowWebViewer,
}) => {
  const classes = useStyles();

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const buildSucceeded = status === 'succeeded';
  const buildText = `Build ${buildSucceeded ? 'succeeded' : 'failed'}.`;
  const platformText = platform !== 'i386' ? platform.toUpperCase() : platform;

  const logUrl = base_url + log;

  const handleMenuClick = (e) => {
    setMenuAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleBuildLogsClick = () => {
    handleMenuClose();
    handleShowWebViewer(logUrl, `Build Logs for ${platformText}`);
  };

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              aria-label="build status"
              className={buildSucceeded ? classes.success : classes.fail}
            >
              {buildSucceeded ? <CheckIcon /> : <CloseIcon />}
            </Avatar>
          }
          action={
            <IconButton aria-label="more options" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={platformText}
          subheader={buildText}
        />
        <Menu
          id="vertical-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleBuildLogsClick}>Build logs</MenuItem>
        </Menu>
        <CardContent>
          <h1>{platform}</h1>
        </CardContent>
      </Card>
    </Grid>
  );
};

PlatformListItem.propTypes = {
  base_url: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  binaries: PropTypes.array.isRequired,
  log: PropTypes.string.isRequired,
  handleShowWebViewer: PropTypes.func.isRequired,
};

export default PlatformListItem;
