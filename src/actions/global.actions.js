export const toggleDrawer = () => ({
  type: 'TOGGLE_DRAWER',
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
