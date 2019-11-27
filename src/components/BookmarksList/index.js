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
    index: { items },
  } = useContext(KernelsContext);

  const bookmarkedVersions = useMemo(() => {
    return items
      .filter(({ versionName }) => bookmarks.includes(versionName))
      .map((entry) => ServerIndexObject.parse(entry).toVersion());
  }, [bookmarks, items]);

  return (
    <Grid container spacing={3}>
      {bookmarkedVersions.map((version, index) => (
        <KernelListItem
          key={version.toString()}
          version={version}
          index={index}
          animate
        />
      ))}
    </Grid>
  );
};

BookmarksList.propTypes = {
  bookmarks: PropTypes.array.isRequired,
};

export default BookmarksList;
