/**
 * BookmarksList component.
 */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import KernelListItem from '../KernelListItem';
import { KernelsContext } from '../../contexts';
import ServerIndexObject from '../../models/ServerIndexObject';

const BookmarksList = ({ bookmarks }) => {
  const {
    index: { entries },
  } = useContext(KernelsContext);

  const bookmarkedVersions = useMemo(() => {
    return entries
      .filter(({ versionName }) => bookmarks.includes(versionName))
      .map((entry) => ServerIndexObject.parse(entry).toVersion());
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
