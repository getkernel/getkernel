/**
 * Global reducer.
 */
import defaultState from './defaultState';

export { defaultState };

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
        webViewer: defaultState.webViewer,
      };

    case 'SHOW_SNACKBAR':
      return {
        ...state,
        snackbar: action.snackbar,
      };

    case 'CLOSE_SNACKBAR':
      return {
        ...state,
        snackbar: defaultState.snackbar,
      };

    case 'SHOW_ALERT':
      return {
        ...state,
        alert: action.alert,
      };

    case 'CLOSE_ALERT':
      return {
        ...state,
        alert: defaultState.alert,
      };

    case 'ADD_DO_NOT_ASK_ITEM':
      return {
        ...state,
        doNotAskList: [...state.doNotAskList, action.id],
      };

    case 'REMOVE_DO_NOT_ASK_ITEM':
      return {
        ...state,
        doNotAskList: state.doNotAskList.filter((id) => id !== action.id),
      };

    default:
      return state;
  }
};
