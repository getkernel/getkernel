/**
 * KernelList component.
 */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import LoadingIndicator from '../LoadingIndicator';
import KernelListToolbar from '../KernelListToolbar';
import KernelListItem from '../KernelListItem';
import { KernelsContext, FiltersContext } from '../../contexts';
import { versionsFilter, releaseTypeFilter } from '../../selectors';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelList = () => {
  const classes = useStyles();

  const {
    index: { entries },
  } = useContext(KernelsContext);
  const { filtersSet, selectedVersions, releaseType } = useContext(
    FiltersContext
  );

  const filteredEntries = entries
    .filter(versionsFilter(selectedVersions))
    .filter(releaseTypeFilter(releaseType));

  if (!filtersSet && !filteredEntries.length) {
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
