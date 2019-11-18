export default (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
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

    default:
      return state;
  }
};
