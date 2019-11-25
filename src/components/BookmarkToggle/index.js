/**
 * BookmarkToggle component.
 */
import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CheckIcon from '@material-ui/icons/Check';
import { GlobalContext, GlobalDispatchContext } from '../../contexts';
import { addBookmark, removeBookmark, showSnackbar } from '../../actions';

const BookmarkToggle = ({ version, size }) => {
  const router = useRouter();

  const { bookmarks } = useContext(GlobalContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  const isBookmarked =
    bookmarks && bookmarks.some((b) => b === version.toString());

  // Disable on saved bookmarks page.
  const disableBookmark = router.pathname === '/b/[encoded]';

  const handleBookmarkClick = () => {
    const versionStr = version.toString();
    if (isBookmarked) {
      handleRemoveBookmark(versionStr);
    } else {
      handleAddBookmark(versionStr);
    }
  };

  const handleAddBookmark = (versionStr) => {
    globalDispatch(addBookmark(versionStr));
    globalDispatch(showSnackbar(`${versionStr} added to bookmarks.`));
  };

  const handleRemoveBookmark = (versionStr) => {
    globalDispatch(removeBookmark(versionStr));
    globalDispatch(showSnackbar(`${versionStr} removed from bookmarks.`));
  };

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
          size={size || 'small'}
          onClick={handleBookmarkClick}
          aria-label="toggle bookmark"
          disabled={disableBookmark}
        >
          {disableBookmark ? (
            <CheckIcon />
          ) : isBookmarked ? (
            <BookmarkIcon />
          ) : (
            <BookmarkBorderIcon />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};

BookmarkToggle.propTypes = {
  version: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
};

export default memo(BookmarkToggle);
