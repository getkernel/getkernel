import React from 'react';
import MainLayout from '../src/layouts/MainLayout';
import KernelList from '../src/components/KernelList';
import { FiltersProvider } from '../src/contexts';

const KernelsPage = () => (
  <MainLayout
    pageTitle="All Kernels"
    contentTitle="All Kernels"
    showShadow={false}
  >
    <FiltersProvider>
      <KernelList />
    </FiltersProvider>
  </MainLayout>
);

export default KernelsPage;
