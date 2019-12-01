/**
 * BuildListItem component.
 * Rendered by KernelVersion.
 */
import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
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
import BuildObject from '../../models/BuildObject';
import styles from './styles';

const useStyles = makeStyles(styles);

const BuildListItem = ({
  version,
  kernelUrl,
  build,
  index: itemIndex,
  animate,
  handleShowWebViewer,
}) => {
  const classes = useStyles();

  const { platform, buildStatus, binaries, log } = build;

  const [selectedVariant, setSelectedVariant] = useState(build.variants[0]);
  const [checkedBinaries, setCheckedBinaries] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const buildText = `Build ${buildStatus ? 'succeeded' : 'failed'}.`;
  const platformText = platform !== 'i386' ? platform.toUpperCase() : platform;
  const logUrl = `${kernelUrl}/${log}`;

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

  const timeout = Math.min((itemIndex + 1) * 300, 1500);

  return (
    <Grid item id={platform} xs={12} md={12}>
      <Fade in={animate} timeout={timeout}>
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
              kernelUrl={kernelUrl}
              selectedVariant={selectedVariant}
              onBinaryIndicesChange={handleBinaryIndicesChange}
            />
            <MainActions
              version={version}
              kernelUrl={kernelUrl}
              platform={platform}
              buildStatus={buildStatus}
              variants={build.variants}
              checkedBinaries={checkedBinaries}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
            />
          </CardContent>
        </Card>
      </Fade>
    </Grid>
  );
};

BuildListItem.defaultProps = {
  animate: true,
};

BuildListItem.propTypes = {
  version: PropTypes.string.isRequired,
  kernelUrl: PropTypes.string.isRequired,
  build: PropTypes.instanceOf(BuildObject).isRequired,
  index: PropTypes.number.isRequired,
  animate: PropTypes.bool,
  handleShowWebViewer: PropTypes.func.isRequired,
};

export default memo(BuildListItem);
