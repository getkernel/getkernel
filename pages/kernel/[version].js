import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../../src/layouts/MainLayout';
import KernelVersion from '../../src/components/KernelVersion';
import { KernelsProvider } from '../../src/contexts';

const KernelVersionPage = ({ version }) => {
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

KernelVersionPage.getInitialProps = (context) => {
  const {
    query: { version },
  } = context;

  return { version };
};

KernelVersionPage.propTypes = {
  version: PropTypes.string.isRequired,
};

export default KernelVersionPage;
