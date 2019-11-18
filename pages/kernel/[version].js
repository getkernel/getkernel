import React from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../../src/layouts/MainLayout';
import KernelVersion from '../../src/components/KernelVersion';
import { KernelsProvider } from '../../src/contexts';

const KernelVersionPage = (props) => {
  const {
    query: { version },
  } = useRouter();

  return (
    <MainLayout pageTitle={`Get Kernel ${version}`} contentTitle={version}>
      <KernelsProvider>
        <KernelVersion version={version} />
      </KernelsProvider>
    </MainLayout>
  );
};

export default KernelVersionPage;
