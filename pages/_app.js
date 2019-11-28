import React from 'react';
import App from 'next/app';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { GlobalProvider, GlobalContext, withProvider } from '../src/contexts';
import theme from '../src/theme';

class MyApp extends App {
  // eslint-disable-next-line react/static-property-placement
  static contextType = GlobalContext;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    const { theme: themePref } = this.context;

    // Create a theme instance.
    const muiTheme = createMuiTheme({
      palette: {
        ...theme.palette,
        [themePref && 'type']: themePref,
      },
    });

    return (
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default withProvider(GlobalProvider)(MyApp);
