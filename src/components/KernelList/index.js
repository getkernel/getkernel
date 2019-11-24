/**
 * KernelList component.
 */
import React, { useContext, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import LoadingIndicator from '../LoadingIndicator';
import KernelListToolbar from '../KernelListToolbar';
import KernelListItem from '../KernelListItem';
import {
  GlobalContext,
  KernelsContext,
  FiltersContext,
  GlobalDispatchContext,
} from '../../contexts';
import { addBookmark, removeBookmark, showSnackbar } from '../../actions';
import { versionsFilter, releaseTypeFilter } from '../../selectors';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelList = () => {
  const classes = useStyles();

  const { bookmarks } = useContext(GlobalContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  const {
    index: { entries },
  } = useContext(KernelsContext);
  const { filtersSet, selectedVersions, releaseType } = useContext(
    FiltersContext
  );

  const filteredEntries = entries
    .filter(versionsFilter(selectedVersions))
    .filter(releaseTypeFilter(releaseType));

  if (!(filtersSet && filteredEntries.length)) {
    return (
      <div className={classes.root}>
        <KernelListToolbar />
        <LoadingIndicator />
      </div>
    );
  }

  const handleAddBookmark = (versionStr) => {
    globalDispatch(addBookmark(versionStr));
    globalDispatch(showSnackbar(`${versionStr} added to bookmarks.`));
  };

  const handleRemoveBookmark = (versionStr) => {
    globalDispatch(removeBookmark(versionStr));
    globalDispatch(showSnackbar(`${versionStr} removed from bookmarks.`));
  };

  return (
    <div className={classes.root}>
      <KernelListToolbar />
      <PageContent>
        <Grid container spacing={3}>
          {filteredEntries.map((entry) => (
            <KernelListItem
              key={entry.version_slug}
              {...entry}
              bookmarks={bookmarks}
              handleAddBookmark={handleAddBookmark}
              handleRemoveBookmark={handleRemoveBookmark}
            />
          ))}
        </Grid>
      </PageContent>
    </div>
  );
};

export default memo(KernelList);
