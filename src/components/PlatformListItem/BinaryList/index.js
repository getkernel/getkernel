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
  baseUrl,
  selectedVariant,
  onBinaryIndicesChange,
}) => {
  const classes = useStyles();

  const [checkedBinaryIndices, setCheckedBinaryIndices] = useState([]);

  useEffect(() => {
    if (!selectedVariant) {
      setCheckedBinaryIndices([]);
      return onBinaryIndicesChange([]);
    }

    const newChecked = [];
    binaries.forEach(({ file_name }, index) => {
      if (selectedVariant === BUILD_VARIANT_ALL) {
        return newChecked.push(index);
      }

      if (
        file_name.includes(`${selectedVariant}_`) ||
        file_name.includes(`_${BUILD_VARIANT_ALL}`)
      ) {
        newChecked.push(index);
      }
    });
    setCheckedBinaryIndices(newChecked);
    onBinaryIndicesChange(newChecked);
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

  return (
    <List>
      {binaries.map(({ file_name, file_size, last_modified }, index) => {
        const labelId = `checkbox-list-label-${file_name}`;

        return (
          <ListItem
            key={file_name}
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
                    {file_name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    component="span"
                    className={classes.fileSize}
                  >
                    ({file_size})
                  </Typography>
                </span>
              }
              secondary={moment(last_modified).format('L LT')}
            />
            <ListItemSecondaryAction>
              <Tooltip title={`Download ${file_name}`}>
                <span>
                  <IconButton
                    edge="end"
                    aria-label="deb package"
                    disabled={!buildStatus}
                    onClick={() => fileDownload(baseUrl + file_name, file_name)}
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
  );
};

BinaryList.propTypes = {
  binaries: PropTypes.array.isRequired,
  buildStatus: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string.isRequired,
  selectedVariant: PropTypes.string,
  onBinaryIndicesChange: PropTypes.func.isRequired,
};

export default BinaryList;
