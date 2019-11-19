/**
 * PlatformListItem component.
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import styles from './styles';
import { BUILD_VARIANTS } from '../../constants';

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

  const buildVariants = [...BUILD_VARIANTS[platform], 'all'];
  const [selectedVariant, setSelectedVariant] = useState(buildVariants[0]);
  const [checkedBinaries, setCheckedBinaries] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const buildSucceeded = status === 'succeeded';
  const buildText = `Build ${buildSucceeded ? 'succeeded' : 'failed'}.`;
  const platformText = platform !== 'i386' ? platform.toUpperCase() : platform;
  const logUrl = base_url + log;

  useEffect(() => {
    const newChecked = [];
    binaries.forEach(({ binary }) => {
      if (selectedVariant === 'all') {
        return newChecked.push(binary);
      }

      if (binary.includes(`${selectedVariant}_`) || binary.includes('_all')) {
        newChecked.push(binary);
      }
    });
    setCheckedBinaries(newChecked);
  }, [selectedVariant]);

  const handleToggleChecked = (value) => {
    const currentIndex = checkedBinaries.indexOf(value);
    const newChecked = [...checkedBinaries];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedBinaries(newChecked);
  };

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

  const handleVariantChange = (event, value) => {
    setSelectedVariant(value);
  };

  const handleFileDownload = (url, fileName) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    if (fileName.endsWith('.deb')) {
      anchor.type = 'application/x-debian-package';
    }
    anchor.hidden = true;
    anchor.click();
    anchor.remove();
  };

  const handleBatchDownload = () => {
    const items = checkedBinaries.map((binary) => ({
      url: base_url + binary,
      fileName: binary,
    }));

    startBatchDownload(items);
  };

  const startBatchDownload = (items) => {
    if (items.length) {
      const item = items.shift();
      handleFileDownload(item.url, item.fileName);
      return setTimeout(() => {
        startBatchDownload(items);
      }, 1000);
    }
  };

  return (
    <Grid item xs={12} md={12}>
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
          <List>
            {binaries.map(({ binary, sha1, sha256 }) => {
              const labelId = `checkbox-list-label-${binary}`;

              return (
                <ListItem
                  key={binary}
                  role={undefined}
                  dense
                  button
                  onClick={() => handleToggleChecked(binary)}
                  disabled={!buildSucceeded}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checkedBinaries.indexOf(binary) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={binary} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="deb package"
                      disabled={!buildSucceeded}
                      onClick={() =>
                        handleFileDownload(base_url + binary, binary)
                      }
                    >
                      <img src="/images/deb.svg" width="24" height="24" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
        <CardActions>
          <ToggleButtonGroup
            size="small"
            value={selectedVariant}
            exclusive
            onChange={handleVariantChange}
            aria-label="build variants"
          >
            {buildVariants &&
              buildVariants.map((variant) => (
                <ToggleButton
                  key={`${platform}-${variant}`}
                  value={variant}
                  disabled={!buildSucceeded}
                >
                  {variant}
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={handleBatchDownload}
            disabled={!checkedBinaries.length}
          >
            <DownloadIcon className={classes.icon} />
            <Typography variant="button">Download Binaries</Typography>
          </Button>
        </CardActions>
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
