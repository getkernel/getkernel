export default (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };

    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark',
      };

    case 'SHOW_WEB_VIEWER':
      return {
        ...state,
        webViewer: action.webViewer,
      };

    case 'CLOSE_WEB_VIEWER':
      return {
        ...state,
        webViewer: {
          open: false,
          url: '',
          title: '',
        },
      };

    case 'SHOW_SNACKBAR':
      return {
        ...state,
        snackbar: action.snackbar,
      };

    case 'CLOSE_SNACKBAR':
      return {
        ...state,
        snackbar: {
          open: false,
          text: '',
        },
      };

    default:
      return state;
  }
};
