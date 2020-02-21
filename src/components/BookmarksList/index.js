/**
 * BookmarksList component.
 */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import KernelListItem from '../KernelListItem';
import { KernelsContext } from '../../contexts';
import ServerIndexObject from '../../models/ServerIndexObject';
import ExtraIndexObject from '../../models/ExtraIndexObject';

const BookmarksList = ({ bookmarks }) => {
  const {
    index: { items },
    extras,
  } = useContext(KernelsContext);

  const bookmarkedVersions = useMemo(() => {
    const regularItems = items
      .filter(({ versionName }) => bookmarks.includes(versionName))
      .map((item) => ServerIndexObject.parse(item).toVersion());

    // TODO: fetch extras first if not present
    const extraItems = [];
    extras.forEach(({ items: itemsCurrent }) => {
      itemsCurrent.forEach((item) => {
        const { versionSlug, tag } = item;
        const bookmarkStr = `${versionSlug}@${tag}`;
        if (bookmarks.includes(bookmarkStr)) {
          extraItems.push(ExtraIndexObject.parse(item).toVersion());
        }
      });
    });

    return [...regularItems, ...extraItems];
  }, [bookmarks, items, extras]);

  return (
    <Grid container spacing={3}>
      {bookmarkedVersions.map((version, index) => (
        <KernelListItem
          key={version.key}
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
