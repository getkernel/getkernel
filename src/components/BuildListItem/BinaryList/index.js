/**
 * BinaryList component.
 * Rendered by PlatformListItem.
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { fileDownload } from '../../../utils';
import { BUILD_VARIANT_ALL } from '../../../constants';
import styles from './styles';

const useStyles = makeStyles(styles);

const BinaryList = ({
  binaries,
  buildStatus,
  kernelUrl,
  selectedVariant,
  onBinaryIndicesChange,
}) => {
  const classes = useStyles();

  const [checkedBinaryIndices, setCheckedBinaryIndices] = useState([]);

  useEffect(() => {
    if (!selectedVariant) {
      setCheckedBinaryIndices([]);
      return;
    }

    const newChecked = [];
    binaries.forEach(({ fileName }, index) => {
      if (selectedVariant === BUILD_VARIANT_ALL) {
        newChecked.push(index);
        return;
      }

      if (
        fileName.includes(`${selectedVariant}_`) ||
        fileName.includes(`_${BUILD_VARIANT_ALL}`)
      ) {
        newChecked.push(index);
      }
    });
    setCheckedBinaryIndices(newChecked);
  }, [binaries, selectedVariant]);

  useEffect(() => {
    onBinaryIndicesChange(checkedBinaryIndices);
  }, [checkedBinaryIndices]); // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <List>
      {binaries.map(({ fileName, fileSize, lastModified }, index) => {
        const labelId = `checkbox-list-label-${fileName}`;

        return (
          <ListItem
            key={fileName}
            role={undefined}
            dense
            button
            onClick={() => handleToggleChecked(index)}
            disabled={!buildStatus}
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
            <ListItemText
              id={labelId}
              primary={
                <span>
                  <Typography variant="inherit" component="span">
                    {fileName}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    component="span"
                    className={classes.fileSize}
                  >
                    ({fileSize})
                  </Typography>
                </span>
              }
              secondary={moment(lastModified).format('L LT')}
            />
            <ListItemSecondaryAction>
              <Tooltip title={`Download ${fileName}`}>
                <span>
                  <IconButton
                    edge="end"
                    aria-label="deb package"
                    disabled={!buildStatus}
                    onClick={() =>
                      fileDownload(`${kernelUrl}/${fileName}`, fileName)
                    }
                  >
                    <img
                      src="/images/deb.svg"
                      width="24"
                      height="24"
                      alt="deb package"
                    />
                  </IconButton>
                </span>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

BinaryList.defaultProps = {
  selectedVariant: '',
};

BinaryList.propTypes = {
  binaries: PropTypes.array.isRequired,
  buildStatus: PropTypes.bool.isRequired,
  kernelUrl: PropTypes.string.isRequired,
  selectedVariant: PropTypes.string,
  onBinaryIndicesChange: PropTypes.func.isRequired,
};

export default BinaryList;
