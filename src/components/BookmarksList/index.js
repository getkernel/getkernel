/**
 * BookmarksList component.
 */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import KernelListItem from '../KernelListItem';
import { GlobalDispatchContext, KernelsContext } from '../../contexts';
import { addBookmark, removeBookmark, showSnackbar } from '../../actions';

const BookmarksList = ({ bookmarks }) => {
  const [bookmarkedEntries, setBookmarkedEntries] = useState([]);

  const {
    index: { entries },
  } = useContext(KernelsContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  useEffect(() => {
    const newEntries = entries.filter(({ version_slug }) =>
      bookmarks.includes(version_slug)
    );

    setBookmarkedEntries(newEntries);
  }, [bookmarks]);

  const handleAddBookmark = (versionStr) => {
    globalDispatch(addBookmark(versionStr));
    globalDispatch(showSnackbar(`${versionStr} added to bookmarks.`));
  };

  const handleRemoveBookmark = (versionStr) => {
    globalDispatch(removeBookmark(versionStr));
    globalDispatch(showSnackbar(`${versionStr} removed from bookmarks.`));
  };

  return (
    <Grid container spacing={3}>
      {bookmarkedEntries.map((entry) => (
        <KernelListItem
          key={entry.version_slug}
          {...entry}
          bookmarks={bookmarks}
          handleAddBookmark={handleAddBookmark}
          handleRemoveBookmark={handleRemoveBookmark}
        />
      ))}
    </Grid>
  );
};

BookmarksList.propTypes = {
  bookmarks: PropTypes.array.isRequired,
};

export default BookmarksList;
