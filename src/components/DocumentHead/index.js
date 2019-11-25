/**
 * DocumentHead component.
 */
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import appConfig from '../../app.config';

const DocumentHead = ({ pageTitle }) => {
  const staticText = `${appConfig.slogan} | ${appConfig.name}`;
  const title = pageTitle ? `${pageTitle} | ${staticText}` : staticText;

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

DocumentHead.propTypes = {
  pageTitle: PropTypes.string,
};

export default DocumentHead;
