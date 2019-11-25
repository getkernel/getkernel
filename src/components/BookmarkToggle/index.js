/**
 * BookmarkToggle component.
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CheckIcon from '@material-ui/icons/Check';

const BookmarkToggle = ({
  bookmarks,
  version,
  handleAddBookmark,
  handleRemoveBookmark,
}) => {
  const router = useRouter();

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
          size="small"
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
  bookmarks: PropTypes.array,
  version: PropTypes.object.isRequired,
  handleAddBookmark: PropTypes.func.isRequired,
  handleRemoveBookmark: PropTypes.func.isRequired,
};

export default memo(BookmarkToggle);
