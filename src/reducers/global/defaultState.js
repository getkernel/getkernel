/**
 * Global default state.
 */
export default {
  isLoading: true,
  drawerOpen: true,
  bookmarks: [],
  webViewer: {
    open: false,
    url: '',
    title: '',
  },
  snackbar: {
    open: false,
    text: '',
  },
  alert: {
    open: false,
    id: '',
    title: '',
    text: '',
    successCallback: null,
    dismissCallback: null,
  },
  doNotAskList: [],
  theme: 'dark',
};
