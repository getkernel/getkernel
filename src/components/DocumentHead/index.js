/**
 * DocumentHead component.
 */
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const DocumentHead = ({ pageTitle }) => {
  return (
    <Head>
      <title>{pageTitle && `${pageTitle} | `} GetKernel.sh</title>
    </Head>
  );
};

DocumentHead.propTypes = {
  pageTitle: PropTypes.string,
};

export default DocumentHead;
