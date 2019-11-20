export const toggleDrawer = () => ({
  type: 'TOGGLE_DRAWER',
});

export const toggleTheme = () => ({
  type: 'TOGGLE_THEME',
});

export const showWebViewer = ({ url, title }) => ({
  type: 'SHOW_WEB_VIEWER',
  webViewer: {
    open: true,
    url,
    title,
  },
});

export const closeWebViewer = () => ({
  type: 'CLOSE_WEB_VIEWER',
});

export const showSnackbar = (text) => ({
  type: 'SHOW_SNACKBAR',
  snackbar: {
    open: true,
    text,
  },
});

export const closeSnackbar = () => ({
  type: 'CLOSE_SNACKBAR',
});
