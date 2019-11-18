/**
 * KernelList component.
 */
import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import KernelListItem from '../KernelListItem';
import PageContent from '../PageContent';
import LoadingIndicator from '../LoadingIndicator';
import {
  KernelsContext,
  KernelsDispatchContext,
  FiltersContext,
  FiltersDispatchContext,
} from '../../contexts';
import {
  hydrateIndexData,
  setAvailableVersionsFilter,
  setSelectedVersionsFilter,
  setReleaseType,
} from '../../actions';
import { releaseTypes } from '../../reducers/filters.defaultState';
import { versionsFilter, releaseTypeFilter } from '../../selectors';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelList = () => {
  const classes = useStyles();

  const {
    index: { entries },
  } = useContext(KernelsContext);
  const {
    filtersSet,
    availableVersions,
    selectedVersions,
    releaseType,
  } = useContext(FiltersContext);
  const kernelsDispatch = useContext(KernelsDispatchContext);
  const filtersDispatch = useContext(FiltersDispatchContext);

  useEffect(() => {
    const getInitialData = async () => {
      const res = await fetch('http://localhost:3000/api/kernels');
      const json = await res.json();

      if (json.success) {
        kernelsDispatch(hydrateIndexData(json.data));
        filtersDispatch(setAvailableVersionsFilter(json.data));
      }
    };

    if (!entries.length) {
      getInitialData();
    }
  }, []);

  useEffect(() => {
    if (!filtersSet && availableVersions.length) {
      // Set default filters to latest two minor versions of the latest kernel
      const [filterOne, filterTwo] = availableVersions[0].minors;
      filtersDispatch(setSelectedVersionsFilter([filterOne, filterTwo]));
    }
  }, [availableVersions]);

  const filteredEntries = entries
    .filter(versionsFilter(selectedVersions))
    .filter(releaseTypeFilter(releaseType));

  if (!filteredEntries.length) {
    return <LoadingIndicator />;
  }

  return (
    <div className={classes.root}>
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
                      <Checkbox
                        checked={selectedVersions.indexOf(minor) > -1}
                      />
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
                onChange={(e) =>
                  filtersDispatch(setReleaseType(e.target.value))
                }
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
      <PageContent>
        <Grid container spacing={3}>
          {filteredEntries.map((entry) => (
            <KernelListItem key={entry.version_slug} {...entry} />
          ))}
        </Grid>
      </PageContent>
    </div>
  );
};

export default KernelList;
