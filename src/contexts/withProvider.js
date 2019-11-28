import React from 'react';

/**
 * Higher order component that wraps Component with Provider.
 * @param {Object} Provider Provider component
 */
const withProvider = (Provider) => (Component) => (props) => (
  <Provider>
    <Component {...props} />
  </Provider>
);

export default withProvider;
