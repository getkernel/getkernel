/**
 * MainActions component.
 * Rendered by PlatformListItem.
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { saveAs } from 'file-saver';
import {
  buildChecksums,
  buildVariants,
  batchDownload,
  calculateDownloadSize,
} from '../../../../utils';
import { BUILD_VARIANT_ALL } from '../../../../constants';
import styles from './styles';

const useStyles = makeStyles(styles);

const MainActions = ({
  version,
  baseUrl,
  platform,
  buildStatus,
  binaries,
  checkedBinaries,
  selectedVariant,
  onVariantChange,
}) => {
  const classes = useStyles();
  const variants = [...buildVariants(binaries), BUILD_VARIANT_ALL];

  useEffect(() => {
    onVariantChange(variants[0]);
  }, []);

  const handleVariantChange = (event, value) => {
    onVariantChange(value);
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
  );
};

MainActions.propTypes = {
  version: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  platform: PropTypes.string.isRequired,
  buildStatus: PropTypes.bool.isRequired,
  binaries: PropTypes.array.isRequired,
  checkedBinaries: PropTypes.array.isRequired,
  selectedVariant: PropTypes.string,
  onVariantChange: PropTypes.func.isRequired,
};

export default MainActions;