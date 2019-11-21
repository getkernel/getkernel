/**
 * WebViewerDialog styles.
 */
export default (theme) => ({
  titleRoot: {
    borderBottom: '1px dashed gray',
  },
  dialogRoot: {
    overflow: 'hidden',
    padding: 0,
    backgroundColor: '#eee',
    borderBottom: '1px dashed gray',
  },
  contentRoot: {
    padding: theme.spacing(0, 3),
    backgroundColor: 'gray',
  },
  iframe: {
    border: 'none',
    width: '100%',
    height: '70vh',
  },
});
