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
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import KernelListItem from '../KernelListItem';
import { KernelsContext, DispatchContext } from '../../contexts';
import { hydrateIndexData } from '../../actions';
import PageContent from '../PageContent';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelList = () => {
  const classes = useStyles();

  const {
    index: { entries },
    kernels,
  } = useContext(KernelsContext);
  const dispatch = useContext(DispatchContext);

  const [availableVersions, setAvailableVersions] = useState([]);
  const [filterMajor, setFilterMajor] = useState([]);

  useEffect(() => {
    const getInitialData = async () => {
      const res = await fetch('http://localhost:3000/api/kernels');
      const json = await res.json();

      if (json.success) {
        dispatch(hydrateIndexData(json.data));
      }
    };

    if (!entries.length) {
      getInitialData();
    }
  }, []);

  useEffect(() => {
    const versions = [];
    entries.forEach(({ version_slug }) => {
      const versionShort = version_slug.split('.')[0];
      if (versionShort.includes('v')) {
        if (!versions.some(({ version }) => version === versionShort)) {
          return versions.push({
            version: versionShort,
            count: 1,
          });
        }
        versions.find(({ version }) => version === versionShort).count++;
      }
    });
    if (versions.length) {
      versions.sort((a, b) => b.version[1] - a.version[1]);
      setAvailableVersions(versions);
      setFilterMajor([versions[0].version]);
    }
  }, [entries]);

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Major</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={filterMajor}
              onChange={(e) => setFilterMajor(e.target.value)}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              // MenuProps={MenuProps}
            >
              {availableVersions.map(({ version, count }) => (
                <MenuItem key={version} value={version}>
                  <Checkbox checked={filterMajor.indexOf(version) > -1} />
                  <ListItemText
                    primary={version}
                    secondary={`${count} items`}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <PageContent>
        <Grid container spacing={3}>
          {entries
            .filter((e) => filterMajor.includes(e.version_slug.split('.')[0]))
            .map((entry) => (
              <KernelListItem key={entry.version_slug} {...entry} />
            ))}
        </Grid>
      </PageContent>
    </div>
  );
};

export default KernelList;
