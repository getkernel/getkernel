/**
 * ExtrasList styles.
 */
export default (theme) => ({
  root: {
    flexGrow: 1,
  },
  tagContents: {
    marginBottom: theme.spacing(5),
    '& > span': {
      display: 'inline-block',
      marginBottom: theme.spacing(1),
    },
  },
});
