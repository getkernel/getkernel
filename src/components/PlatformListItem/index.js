/**
 * PlatformListItem component.
 * Rendered by KernelVersion.
 */
import React, { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import BinaryList from './BinaryList';
import MainActions from './MainActions';
import { buildVariants } from '../../utils';
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

  const variants = useMemo(() => {
    return [...buildVariants(binaries), BUILD_VARIANT_ALL];
  }, [binaries]);

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

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

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
          <MainActions
            version={version}
            baseUrl={baseUrl}
            platform={platform}
            buildStatus={buildStatus}
            variants={variants}
            checkedBinaries={checkedBinaries}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
          />
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
