/**
 * BookmarkToggle component.
 */
import React, { useCallback, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CheckIcon from '@material-ui/icons/Check';
import { GlobalContext, GlobalDispatchContext } from '../../contexts';
import { addBookmark, removeBookmark, showSnackbar } from '../../actions';
import Version from '../../models/Version';

const BookmarkToggle = ({ version, size, bookmarkable }) => {
  const router = useRouter();

  const { bookmarks } = useContext(GlobalContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  const isBookmarked =
    bookmarks && bookmarks.some((b) => b === version.bookmark);

  // Disable on saved bookmarks page.
  const disableBookmark = router.pathname === '/b/[encoded]';

  let BookmarkButtonIcon = isBookmarked ? BookmarkIcon : BookmarkBorderIcon;
  if (disableBookmark) BookmarkButtonIcon = CheckIcon;

  const handleAddBookmark = useCallback((bookmark) => {
    globalDispatch(addBookmark(bookmark));
    globalDispatch(showSnackbar(`${bookmark} added to bookmarks.`));
  });

  const handleRemoveBookmark = useCallback((bookmark) => {
    globalDispatch(removeBookmark(bookmark));
    globalDispatch(showSnackbar(`${bookmark} removed from bookmarks.`));
  });

  const handleBookmarkClick = useCallback(() => {
    const { bookmark } = version;
    if (isBookmarked) {
      handleRemoveBookmark(bookmark);
    } else {
      handleAddBookmark(bookmark);
    }
  });

  if (!bookmarkable) {
    return <div />;
  }

  return (
    <Tooltip
      title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
      aria-label="toggle bookmark"
      disableFocusListener={disableBookmark}
      disableHoverListener={disableBookmark}
      disableTouchListener={disableBookmark}
    >
      <span>
        <IconButton
          size={size}
          onClick={handleBookmarkClick}
          aria-label="toggle bookmark"
          disabled={disableBookmark}
        >
          <BookmarkButtonIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};

BookmarkToggle.defaultProps = {
  bookmarkable: true,
  size: 'small',
};

BookmarkToggle.propTypes = {
  version: PropTypes.instanceOf(Version).isRequired,
  bookmarkable: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium']),
};

export default memo(BookmarkToggle);
