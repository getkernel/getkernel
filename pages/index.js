import React from 'react';
import MainLayout from '../src/layouts/MainLayout';
import KernelList from '../src/components/KernelList';
import { FiltersProvider } from '../src/contexts';

const HomePage = () => (
  <MainLayout showShadow={false}>
    <FiltersProvider>
      <KernelList />
    </FiltersProvider>
  </MainLayout>
);

export default HomePage;
