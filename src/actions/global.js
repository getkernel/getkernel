/**
 * Action generators for global reducer.
 */

/**
 * toggleDrawer action generator.
 */
export const toggleDrawer = () => ({
  type: 'TOGGLE_DRAWER',
});

/**
 * toggleTheme action generator.
 */
export const toggleTheme = () => ({
  type: 'TOGGLE_THEME',
});

/**
 * showWebViewer action generator.
 * @param {String} url URL to load
 * @param {String} title Title for the content
 */
export const showWebViewer = (url, title) => ({
  type: 'SHOW_WEB_VIEWER',
  webViewer: {
    open: true,
    url,
    title,
  },
});

/**
 * closeWebViewer action generator.
 */
export const closeWebViewer = () => ({
  type: 'CLOSE_WEB_VIEWER',
});

/**
 * showSnackbar action generator.
 * @param {String} text Snackbar message
 */
export const showSnackbar = (text) => ({
  type: 'SHOW_SNACKBAR',
  snackbar: {
    open: true,
    text,
  },
});

/**
 * closeSnackbar action generator.
 */
export const closeSnackbar = () => ({
  type: 'CLOSE_SNACKBAR',
});

/**
 * showAlert action generator.
 * @param {String} id Alert Id
 * @param {String} title Alert title
 * @param {String} text Alert text
 * @param {Function} successCallback Function to call when alert is accepted
 * @param {Function} dismissCallback Function to call when alert is dismissed
 */
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

/**
 * closeAlert action generator.
 */
export const closeAlert = () => ({
  type: 'CLOSE_ALERT',
});

/**
 * addDoNotAskItem action generator.
 * @param {String} id Dialog Id to be added
 */
export const addDoNotAskItem = (id) => ({
  type: 'ADD_DO_NOT_ASK_ITEM',
  id,
});

/**
 * removeDoNotAskItem action generator.
 * @param {String} id Dialog Id to be removed
 */
export const removeDoNotAskItem = (id) => ({
  type: 'REMOVE_DO_NOT_ASK_ITEM',
  id,
});
