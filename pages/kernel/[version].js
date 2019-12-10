import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../../src/layouts/MainLayout';
import KernelVersion from '../../src/components/KernelVersion';
import StringUtils from '../../src/utils/StringUtils';

const KernelVersionPage = ({ version, tip }) => {
  const tipStr = tip ? `${StringUtils.toUpperFirst(tip)}/` : '';
  const pageTitle = `Get Kernel ${tipStr}${version}`;
  const contentTitle = `${tipStr}${version} Mainline Build`;

  return (
    <MainLayout pageTitle={pageTitle} contentTitle={contentTitle}>
      <KernelVersion version={version} tip={tip} />
    </MainLayout>
  );
};

KernelVersionPage.getInitialProps = (context) => {
  const {
    query: { version, tip },
  } = context;

  return { version, tip };
};

KernelVersionPage.defaultProps = {
  tip: null,
};

KernelVersionPage.propTypes = {
  version: PropTypes.string.isRequired,
  tip: PropTypes.string,
};

export default KernelVersionPage;
