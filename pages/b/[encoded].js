import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../../src/layouts/MainLayout';
import { KernelsProvider } from '../../src/contexts';
import BookmarkUtils from '../../src/utils/BookmarkUtils';
import BookmarksSaved from '../../src/components/BookmarksSaved';

const SavedBookmarksPage = ({ bookmarks }) => {
  const pageTitle = 'Saved Bookmarks';
  const contentTitle = 'Saved Bookmarks';

  return (
    <MainLayout pageTitle={pageTitle} contentTitle={contentTitle}>
      <KernelsProvider>
        <BookmarksSaved bookmarks={bookmarks} />
      </KernelsProvider>
    </MainLayout>
  );
};

SavedBookmarksPage.getInitialProps = (context) => {
  const {
    query: { encoded },
  } = context;

  const bookmarks = BookmarkUtils.decode(encoded);
  return { bookmarks };
};

SavedBookmarksPage.propTypes = {
  bookmarks: PropTypes.array.isRequired,
};

export default SavedBookmarksPage;
