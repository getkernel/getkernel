/**
 * BookmarksSaved component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import PageContent from '../PageContent';
import BookmarksList from '../BookmarksList';
import styles from './styles';

const useStyles = makeStyles(styles);

const BookmarksSaved = ({ bookmarks }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PageContent>
        <BookmarksList bookmarks={bookmarks} />
      </PageContent>
    </div>
  );
};

BookmarksSaved.propTypes = {
  bookmarks: PropTypes.array.isRequired,
};

export default BookmarksSaved;
