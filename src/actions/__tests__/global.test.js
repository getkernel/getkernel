import {
  toggleDrawer,
  toggleTheme,
  addBookmark,
  removeBookmark,
  clearBookmarks,
  addDoNotAskItem,
  removeDoNotAskItem,
  showAlert,
  closeAlert,
  showSnackbar,
  closeSnackbar,
  showWebViewer,
  closeWebViewer,
} from '../global';

describe('actions/global', () => {
  test('should generate toggle drawer action object', () => {
    const action = toggleDrawer();
    expect(action).toEqual({
      type: 'TOGGLE_DRAWER',
    });
  });

  test('should generate toggle theme action object', () => {
    const action = toggleTheme();
    expect(action).toEqual({
      type: 'TOGGLE_THEME',
    });
  });

  test('should generate show alert action object', () => {
    const alert = {
      id: 'new-alert',
      title: 'Test',
      text: 'Show alert',
      successCallback: null,
      dismissCallback: null,
    };
    const action = showAlert(alert.id, alert.title, alert.text, null, null);
    expect(action).toEqual({
      type: 'SHOW_ALERT',
      alert: {
        open: true,
        ...alert,
      },
    });
  });

  test('should generate close alert action object', () => {
    const action = closeAlert();
    expect(action).toEqual({
      type: 'CLOSE_ALERT',
    });
  });

  test('should generate show snackbar action object', () => {
    const text = 'Succss!';
    const action = showSnackbar(text);
    expect(action).toEqual({
      type: 'SHOW_SNACKBAR',
      snackbar: {
        open: true,
        text,
      },
    });
  });

  test('should generate close snackbar action object', () => {
    const action = closeSnackbar();
    expect(action).toEqual({
      type: 'CLOSE_SNACKBAR',
    });
  });

  test('should generate show web viewer action object', () => {
    const url = 'https://google.com';
    const title = 'Google';
    const action = showWebViewer(url, title);
    expect(action).toEqual({
      type: 'SHOW_WEB_VIEWER',
      webViewer: {
        open: true,
        url,
        title,
      },
    });
  });

  test('should generate close web viewer action object', () => {
    const action = closeWebViewer();
    expect(action).toEqual({
      type: 'CLOSE_WEB_VIEWER',
    });
  });

  test('should generate add bookmark action object', () => {
    const bookmark = 'v5.3.12';
    const action = addBookmark(bookmark);
    expect(action).toEqual({
      type: 'ADD_BOOKMARK',
      bookmark,
    });
  });

  test('should generate remove bookmark action object', () => {
    const bookmark = 'v5.3.12';
    const action = removeBookmark(bookmark);
    expect(action).toEqual({
      type: 'REMOVE_BOOKMARK',
      bookmark,
    });
  });

  test('should generate clear bookmarks action object', () => {
    const action = clearBookmarks();
    expect(action).toEqual({
      type: 'CLEAR_BOOKMARKS',
    });
  });

  test('should generate add do not ask item action object', () => {
    const id = 'test-id';
    const action = addDoNotAskItem(id);
    expect(action).toEqual({
      type: 'ADD_DO_NOT_ASK_ITEM',
      id,
    });
  });

  test('should generate remove do not ask item action object', () => {
    const id = 'test-id';
    const action = removeDoNotAskItem(id);
    expect(action).toEqual({
      type: 'REMOVE_DO_NOT_ASK_ITEM',
      id,
    });
  });
});
