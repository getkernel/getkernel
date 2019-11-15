import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

const DocumentHead = ({ pageTitle }) => {
  return (
    <Head>
      <title>{pageTitle && `${pageTitle} | `} GetKernel.sh</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
  );
};

DocumentHead.propTypes = {
  pageTitle: PropTypes.string,
};

export default DocumentHead;
