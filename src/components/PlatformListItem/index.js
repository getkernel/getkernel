/**
 * PlatformListItem component.
 * Rendered by KernelVersion.
 */
import React, { useState, memo } from 'react';
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
import Typography from '@material-ui/core/Typography';
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
import BinaryList from './components/BinaryList';
import {
  buildChecksums,
  buildVariants,
  batchDownload,
  calculateDownloadSize,
} from '../../utils';
import { BUILD_VARIANT_ALL } from '../../constants';
import styles from './styles';

const useStyles = makeStyles(styles);

const PlatformListItem = ({
  version,
  base_url: baseUrl,
  platform,
  build_status: buildStatus,
  binaries,
  log,
  handleShowWebViewer,
}) => {
  const classes = useStyles();

  const variants = [...buildVariants(binaries), BUILD_VARIANT_ALL];
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [checkedBinaries, setCheckedBinaries] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const buildText = `Build ${buildStatus ? 'succeeded' : 'failed'}.`;
  const platformText = platform !== 'i386' ? platform.toUpperCase() : platform;
  const logUrl = baseUrl + log;

  const handleBinaryIndicesChange = (indices) => {
    const items = indices.map((index) => binaries[index]);
    setCheckedBinaries(items);
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

  const handleBatchDownload = () => {
    batchDownload(checkedBinaries, baseUrl);
  };

  const handleChecksumsDownload = () => {
    const { fileName, text } = buildChecksums(
      checkedBinaries,
      version,
      platform
    );
    const contents = new Blob([text], { type: 'text/plain;charset=utf-8"' });
    saveAs(contents, fileName);
  };

  const getDownloadSize = () => {
    const size = calculateDownloadSize(checkedBinaries);
    return size ? ` (${size})` : '';
  };

  const mainButtons = [
    {
      button: {
        text: 'Checksums',
        variant: 'outlined',
        handler: handleChecksumsDownload,
        disabled: !(checkedBinaries.length && buildStatus),
      },
      tooltip: 'Download Checksums for selected files',
    },
    {
      button: {
        text: `Binaries${getDownloadSize()}`,
        variant: 'contained',
        handler: handleBatchDownload,
        disabled: !(checkedBinaries.length && buildStatus),
      },
      tooltip: 'Download selected files',
    },
  ];

  return (
    <Grid item id={platform} xs={12} md={12}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              aria-label="build status"
              className={buildStatus ? classes.success : classes.fail}
            >
              {buildStatus ? <CheckIcon /> : <CloseIcon />}
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
          <BinaryList
            binaries={binaries}
            buildStatus={buildStatus}
            baseUrl={baseUrl}
            selectedVariant={selectedVariant}
            onBinaryIndicesChange={handleBinaryIndicesChange}
          />
          <div className={classes.buttons}>
            <ToggleButtonGroup
              size="small"
              value={selectedVariant}
              exclusive
              onChange={handleVariantChange}
              aria-label="build variants"
            >
              {variants &&
                variants.map((variant) => (
                  <ToggleButton
                    key={`${platform}-${variant}`}
                    value={variant}
                    disabled={!buildStatus}
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
  build_status: PropTypes.bool.isRequired,
  binaries: PropTypes.array.isRequired,
  log: PropTypes.string.isRequired,
  handleShowWebViewer: PropTypes.func.isRequired,
};

export default memo(PlatformListItem);
