import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../../../src/layouts/MainLayout';
import KernelVersion from '../../../src/components/KernelVersion';
import StringUtils from '../../../src/utils/StringUtils';

const KernelVersionPage = ({ version, tag }) => {
  const tagStr = tag ? `${StringUtils.toUpperFirst(tag)}/` : '';
  const pageTitle = `Get Kernel ${tagStr}${version}`;
  const contentTitle = `${tagStr}${version} Mainline Build`;

  return (
    <MainLayout pageTitle={pageTitle} contentTitle={contentTitle}>
      <KernelVersion versionStr={version} tag={tag} />
    </MainLayout>
  );
};

KernelVersionPage.getInitialProps = (context) => {
  const {
    query: { version, tag },
  } = context;

  return { version, tag };
};

KernelVersionPage.propTypes = {
  version: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default KernelVersionPage;
