import React from 'react';
import MainLayout from '../src/layouts/MainLayout';
import KernelList from '../src/components/KernelList';
import { KernelsProvider, FiltersProvider } from '../src/contexts';

const Home = () => (
  <MainLayout>
    <KernelsProvider>
      <FiltersProvider>
        <KernelList />
      </FiltersProvider>
    </KernelsProvider>
  </MainLayout>
);

export default Home;
