/**
 * KernelListToolbar component.
 */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
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
import {
  setSelectedVersions,
  setSelectedDistros,
  setReleaseType,
} from '../../actions';
import { releaseTypes } from '../../reducers/filters/defaultState';
import StringUtils from '../../utils/StringUtils';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelListToolbar = () => {
  const classes = useStyles();

  const {
    availableVersions,
    selectedVersions,
    availableDistros,
    selectedDistros,
    releaseType,
  } = useContext(FiltersContext);
  const filtersDispatch = useContext(FiltersDispatchContext);

  const handleReleaseTypeChange = (e) => {
    filtersDispatch(setReleaseType(e.target.value));
  };

  const handleVersionChange = (e) => {
    filtersDispatch(setSelectedVersions(e.target.value));
  };

  const handleDistroChange = (e) => {
    filtersDispatch(setSelectedDistros(e.target.value));
  };

  const disableVersionFilter = selectedDistros.length > 1;

  return (
    <Fade in timeout={500}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <FormGroup row>
            {/* Versions filter */}
            <FormControl
              className={classes.formControl}
              disabled={disableVersionFilter}
            >
              <InputLabel id="version-select-label">Version</InputLabel>
              <Select
                labelId="version-select-label"
                id="version-select"
                multiple
                value={selectedVersions}
                onChange={handleVersionChange}
                input={<Input />}
                renderValue={(selected) => selected.join(', ')}
              >
                {availableVersions.map(({ major, count, minors }) => [
                  <ListSubheader>{`v${major} (${count} items)`}</ListSubheader>,
                  minors.map((minor) => (
                    <MenuItem key={`${major}-${minor}`} value={minor}>
                      <Checkbox
                        checked={selectedVersions.indexOf(minor) > -1}
                      />
                      <ListItemText primary={minor} />
                    </MenuItem>
                  )),
                ])}
              </Select>
            </FormControl>

            {/* Distros filter */}
            <FormControl className={classes.formControl}>
              <InputLabel id="distro-label">Distro</InputLabel>
              <Select
                labelId="distro-label"
                id="distro-select"
                multiple
                value={selectedDistros}
                onChange={handleDistroChange}
                renderValue={(selected) => {
                  const [, ...rest] = selected;
                  if (rest.length === 0) {
                    return <span>All</span>;
                  }
                  return rest.join(', ');
                }}
              >
                <MenuItem value="" disabled>
                  All
                </MenuItem>
                {availableDistros.map(({ distro, count, minors }) => [
                  <ListSubheader>{`${StringUtils.toUpperFirst(
                    distro,
                  )} (${count} items)`}</ListSubheader>,
                  minors.map((minor) => {
                    const filterToken = `${distro}@${minor}`;
                    return (
                      <MenuItem key={filterToken} value={filterToken}>
                        <Checkbox
                          checked={selectedDistros.indexOf(filterToken) > -1}
                        />
                        <ListItemText primary={minor} />
                      </MenuItem>
                    );
                  }),
                ])}
              </Select>
            </FormControl>
          </FormGroup>

          {/* Release type filter */}
          <FormControl className={classes.formControl}>
            <InputLabel id="release-type-label">Release Type</InputLabel>
            <Select
              labelId="release-type-label"
              id="release-type-select"
              value={releaseType}
              onChange={handleReleaseTypeChange}
            >
              {releaseTypes.map(({ value, text }) => (
                <MenuItem value={value} key={`release-type-${value}`}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </Fade>
  );
};

export default KernelListToolbar;
