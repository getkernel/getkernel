import React from 'react';
import MainLayout from '../src/layouts/MainLayout';
import Bookmarks from '../src/components/Bookmarks';
import { KernelsProvider } from '../src/contexts';

const BookmarksPage = () => {
  const pageTitle = 'Bookmarks';
  const contentTitle = 'Bookmarks';

  return (
    <MainLayout
      pageTitle={pageTitle}
      contentTitle={contentTitle}
      showShadow={false}
    >
      <KernelsProvider>
        <Bookmarks />
      </KernelsProvider>
    </MainLayout>
  );
};

export default BookmarksPage;
