/**
 * KernelList component.
 */
import React, { useContext, useMemo, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import LoadingIndicator from '../LoadingIndicator';
import KernelListToolbar from '../KernelListToolbar';
import KernelListItem from '../KernelListItem';
import { KernelsContext, FiltersContext } from '../../contexts';
import { versionsFilter, releaseTypeFilter } from '../../selectors';
import ServerIndexObject from '../../models/ServerIndexObject';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelList = () => {
  const classes = useStyles();

  const {
    index: { entries },
  } = useContext(KernelsContext);
  const { filtersSet, selectedVersions, releaseType } = useContext(
    FiltersContext,
  );

  const filteredVersions = useMemo(
    () =>
      entries
        .map((entry) => ServerIndexObject.parse(entry).toVersion())
        .filter(versionsFilter(selectedVersions))
        .filter(releaseTypeFilter(releaseType)),
    [entries, selectedVersions, releaseType],
  );

  if (!(filtersSet && filteredVersions.length)) {
    return (
      <div className={classes.root}>
        <KernelListToolbar />
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <KernelListToolbar />
      <PageContent>
        <Grid container spacing={3}>
          {filteredVersions.map((version) => (
            <KernelListItem key={version.toString()} version={version} />
          ))}
        </Grid>
      </PageContent>
    </div>
  );
};

export default memo(KernelList);
