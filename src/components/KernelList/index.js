/**
 * KernelList component.
 */
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import KernelListItem from '../KernelListItem';
import {
  KernelsContext,
  DispatchContext,
  FiltersContext,
  FiltersDispatchContext,
} from '../../contexts';
import {
  hydrateIndexData,
  setAvailableVersionsFilter,
  setSelectedVersionsFilter,
} from '../../actions';
import PageContent from '../PageContent';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelList = () => {
  const classes = useStyles();

  const {
    index: { entries },
  } = useContext(KernelsContext);
  const { filtersSet, availableVersions, selectedVersions } = useContext(
    FiltersContext
  );
  const kernelsDispatch = useContext(DispatchContext);
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

  const filteredEntries = entries.filter(({ version_slug }) => {
    const [major, minor] = version_slug.split('.');
    let majorMinorString;
    if (minor && minor.includes('-')) {
      majorMinorString = `${major}.${minor.split('-')[0]}`;
    } else {
      majorMinorString = `${major}.${minor}`;
    }

    return selectedVersions.includes(majorMinorString);
  });

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Version</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
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
