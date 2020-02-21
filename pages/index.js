import React from 'react';
import MainLayout from '../src/layouts/MainLayout';
import LatestReleases from '../src/components/LatestReleases';

const HomePage = () => (
  <MainLayout contentTitle="Latest Releases">
    <LatestReleases />
  </MainLayout>
);

export default HomePage;
