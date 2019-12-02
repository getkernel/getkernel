import React from 'react';
import MainLayout from '../src/layouts/MainLayout';
import LatestKernels from '../src/components/LatestKernels';

const HomePage = () => (
  <MainLayout contentTitle="Latest Kernels" showShadow={false}>
    <LatestKernels />
  </MainLayout>
);

export default HomePage;
