import React from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../../src/layouts/MainLayout';
import KernelVersion from '../../src/components/KernelVersion';
import { KernelsProvider } from '../../src/contexts';

const KernelVersionPage = (props) => {
  const {
    query: { version },
  } = useRouter();

  const pageTitle = `Get Kernel ${version}`;
  const contentTitle = `${version} Mainline Build`;

  return (
    <MainLayout pageTitle={pageTitle} contentTitle={contentTitle}>
      <KernelsProvider>
        <KernelVersion version={version} />
      </KernelsProvider>
    </MainLayout>
  );
};

export default KernelVersionPage;
