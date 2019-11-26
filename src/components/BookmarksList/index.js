/**
 * BookmarksList component.
 */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import KernelListItem from '../KernelListItem';
import { KernelsContext } from '../../contexts';
import Version from '../../models/Version';

const BookmarksList = ({ bookmarks }) => {
  const {
    index: { entries },
  } = useContext(KernelsContext);

  const bookmarkedVersions = useMemo(() => {
    return entries
      .filter(({ version_name }) => bookmarks.includes(version_name))
      .map(
        ({ version_name, last_modified }) =>
          new Version(version_name, last_modified),
      );
  }, [bookmarks, entries]);

  return (
    <Grid container spacing={3}>
      {bookmarkedVersions.map((version) => (
        <KernelListItem key={version.toString()} version={version} />
      ))}
    </Grid>
  );
};

BookmarksList.propTypes = {
  bookmarks: PropTypes.array.isRequired,
};

export default BookmarksList;
