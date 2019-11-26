import React from 'react';

/**
 * withProvider HOC.
 */
export default (Provider) => (Component) => (props) => (
  <Provider>
    <Component {...props} />
  </Provider>
);
