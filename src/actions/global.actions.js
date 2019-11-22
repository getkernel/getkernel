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

export const showAlert = (
  id,
  title,
  text,
  successCallback = null,
  dismissCallback = null
) => ({
  type: 'SHOW_ALERT',
  alert: {
    open: true,
    id,
    title,
    text,
    successCallback,
    dismissCallback,
  },
});

export const closeAlert = () => ({
  type: 'CLOSE_ALERT',
});

export const addDoNotAskItem = (id) => ({
  type: 'ADD_DO_NOT_ASK_ITEM',
  id,
});

export const removeDoNotAskItem = (id) => ({
  type: 'REMOVE_DO_NOT_ASK_ITEM',
  id,
});
