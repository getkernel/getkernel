/**
 * KernelListToolbar component.
 */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { FiltersContext, FiltersDispatchContext } from '../../contexts';
import { setSelectedVersionsFilter, setReleaseType } from '../../actions';
import { releaseTypes } from '../../reducers/filters/defaultState';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelListToolbar = () => {
  const classes = useStyles();

  const { availableVersions, selectedVersions, releaseType } = useContext(
    FiltersContext
  );
  const filtersDispatch = useContext(FiltersDispatchContext);

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <FormGroup row>
          <FormControl className={classes.formControl}>
            <InputLabel id="version-select-label">Version</InputLabel>
            <Select
              labelId="version-select-label"
              id="version-select"
              multiple
              value={selectedVersions}
              onChange={(e) =>
                filtersDispatch(setSelectedVersionsFilter(e.target.value))
              }
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              // MenuProps={MenuProps}
            >
              {availableVersions.map(({ version, count, minors }) => [
                <ListSubheader>
                  {version} ({`${count} items`})
                </ListSubheader>,
                minors.map((minor) => (
                  <MenuItem key={`${version}-${minor}`} value={minor}>
                    <Checkbox checked={selectedVersions.indexOf(minor) > -1} />
                    <ListItemText primary={minor} />
                  </MenuItem>
                )),
              ])}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="release-type-label">Release Type</InputLabel>
            <Select
              labelId="release-type-label"
              id="release-type-select"
              value={releaseType}
              onChange={(e) => filtersDispatch(setReleaseType(e.target.value))}
            >
              {releaseTypes.map(({ value, text }) => (
                <MenuItem value={value} key={`release-type-${value}`}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormGroup>
      </Toolbar>
    </AppBar>
  );
};

export default KernelListToolbar;
