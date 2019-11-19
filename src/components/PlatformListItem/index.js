/**
 * PlatformListItem component.
 * Rendered by KernelVersion.
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
import Tooltip from '@material-ui/core/Tooltip';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { saveAs } from 'file-saver';
import styles from './styles';
import { BUILD_VARIANTS } from '../../constants';
import { buildChecksums } from '../../utils';

const useStyles = makeStyles(styles);

const PlatformListItem = ({
  version,
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
  const [checkedBinaryIndices, setCheckedBinaryIndices] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const buildSucceeded = status === 'succeeded';
  const buildText = `Build ${buildSucceeded ? 'succeeded' : 'failed'}.`;
  const platformText = platform !== 'i386' ? platform.toUpperCase() : platform;
  const logUrl = base_url + log;

  useEffect(() => {
    const newChecked = [];
    binaries.forEach(({ binary }, index) => {
      if (selectedVariant === 'all') {
        return newChecked.push(index);
      }

      if (binary.includes(`${selectedVariant}_`) || binary.includes('_all')) {
        newChecked.push(index);
      }
    });
    setCheckedBinaryIndices(newChecked);
  }, [selectedVariant]);

  const handleToggleChecked = (value) => {
    const currentIndex = checkedBinaryIndices.indexOf(value);
    const newChecked = [...checkedBinaryIndices];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedBinaryIndices(newChecked);
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
    const items = checkedBinaryIndices.map((index) => {
      const { binary } = binaries[index];
      return {
        url: base_url + binary,
        fileName: binary,
      };
    });

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

  const handleChecksumsDownload = () => {
    const { fileName, text } = buildChecksums(
      version,
      platform,
      binaries,
      checkedBinaryIndices
    );
    const contents = new Blob([text], { type: 'text/plain;charset=utf-8"' });

    saveAs(contents, fileName);
  };

  const mainButtons = [
    {
      button: {
        text: 'Checksums',
        variant: 'outlined',
        handler: handleChecksumsDownload,
        disabled: !(checkedBinaryIndices.length && buildSucceeded),
      },
      tooltip: 'Download Checksums for selected files',
    },
    {
      button: {
        text: 'Binaries',
        variant: 'contained',
        handler: handleBatchDownload,
        disabled: !(checkedBinaryIndices.length && buildSucceeded),
      },
      tooltip: 'Download selected files',
    },
  ];

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
            {binaries.map(({ binary }, index) => {
              const labelId = `checkbox-list-label-${binary}`;

              return (
                <ListItem
                  key={binary}
                  role={undefined}
                  dense
                  button
                  onClick={() => handleToggleChecked(index)}
                  disabled={!buildSucceeded}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checkedBinaryIndices.indexOf(index) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={binary} />
                  <ListItemSecondaryAction>
                    <Tooltip title={`Download ${binary}`}>
                      <span>
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
                      </span>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
          <div className={classes.buttons}>
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
            <div className={classes.buttonsRight}>
              {mainButtons.map(({ button, tooltip }) => (
                <Tooltip title={tooltip} key={`main-btn-${button.text}`}>
                  <span>
                    <Button
                      size="medium"
                      variant={button.variant}
                      color="primary"
                      onClick={button.handler}
                      disabled={button.disabled}
                    >
                      <DownloadIcon className={classes.icon} />
                      <Typography variant="button">{button.text}</Typography>
                    </Button>
                  </span>
                </Tooltip>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

PlatformListItem.propTypes = {
  version: PropTypes.string.isRequired,
  base_url: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  binaries: PropTypes.array.isRequired,
  log: PropTypes.string.isRequired,
  handleShowWebViewer: PropTypes.func.isRequired,
};

export default PlatformListItem;
