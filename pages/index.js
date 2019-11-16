import React from 'react';
import MainLayout from '../src/layouts/MainLayout';
import KernelList from '../src/components/KernelList';
import { KernelsProvider } from '../src/contexts';

const Home = () => (
  <MainLayout>
    <KernelsProvider>
      <KernelList />
    </KernelsProvider>
  </MainLayout>
);

export default Home;
