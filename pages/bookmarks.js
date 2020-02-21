import React from 'react';
import MainLayout from '../src/layouts/MainLayout';
import Bookmarks from '../src/components/Bookmarks';

const BookmarksPage = () => {
  const pageTitle = 'Bookmarks';
  const contentTitle = 'Bookmarks';

  return (
    <MainLayout
      pageTitle={pageTitle}
      contentTitle={contentTitle}
      showShadow={false}
    >
      <Bookmarks />
    </MainLayout>
  );
};

export default BookmarksPage;
