/**
 * Action generators for global reducer.
 */

/**
 * Generates an action object -> Toggles drawer.
 */
export const toggleDrawer = () => ({
  type: 'TOGGLE_DRAWER',
});

/**
 * Generates an action object -> Toggles UI theme.
 */
export const toggleTheme = () => ({
  type: 'TOGGLE_THEME',
});

/**
 * Generates an action object -> Sets bool state.
 * @param {String} field Field name
 * @param {Boolean} value Value to set
 */
export const setBoolState = (field, value) => ({
  type: 'SET_BOOL_STATE',
  field,
  value,
});

/**
 * Generates an action object -> Sets isLoading state.
 * @param {Boolean} isLoading Is loading or not
 */
export const setIsLoading = (isLoading) => ({
  type: 'SET_IS_LOADING',
  isLoading,
});

/**
 * Generates an action object -> Adds kernel to bookmarks.
 * @param {String} bookmark Kernel version
 */
export const addBookmark = (bookmark) => ({
  type: 'ADD_BOOKMARK',
  bookmark,
});

/**
 * Generates an action object -> Removes kernel from bookmarks.
 * @param {String} bookmark Kernel version
 */
export const removeBookmark = (bookmark) => ({
  type: 'REMOVE_BOOKMARK',
  bookmark,
});

/**
 * Generates an action object -> Clears bookmarks.
 */
export const clearBookmarks = () => ({
  type: 'CLEAR_BOOKMARKS',
});

/**
 * * Generates an action object -> Displays a web viewer dialog.
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
 * Generates an action object -> Closes web viewer dialog.
 */
export const closeWebViewer = () => ({
  type: 'CLOSE_WEB_VIEWER',
});

/**
 * * Generates an action object -> Displays a snackbar.
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
 * * Generates an action object -> Closes snackbar.
 */
export const closeSnackbar = () => ({
  type: 'CLOSE_SNACKBAR',
});

/**
 * * Generates an action object -> Shows an alert dialog.
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
  dismissCallback = null,
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
 * * Generates an action object -> Closes alert dialog.
 */
export const closeAlert = () => ({
  type: 'CLOSE_ALERT',
});

/**
 * Generates an action object -> Adds an item to the do not ask again list.
 * @param {String} id Dialog Id to be added
 */
export const addDoNotAskItem = (id) => ({
  type: 'ADD_DO_NOT_ASK_ITEM',
  id,
});

/**
 * Generates an action object -> Removes an item from the do not ask again list.
 * @param {String} id Dialog Id to be removed
 */
export const removeDoNotAskItem = (id) => ({
  type: 'REMOVE_DO_NOT_ASK_ITEM',
  id,
});
