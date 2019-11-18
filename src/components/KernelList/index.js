/**
 * KernelList component.
 */
import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import LoadingIndicator from '../LoadingIndicator';
import KernelListToolbar from '../KernelListToolbar';
import KernelListItem from '../KernelListItem';
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
} from '../../actions';
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
      <KernelListToolbar />
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
