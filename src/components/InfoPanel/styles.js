/**
 * InfoPanel component styles.
 */
export default (theme) => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  titleArea: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    '& > *': {
      marginRight: theme.spacing(1),
    },
    '& > svg': {
      color: theme.palette.secondary.main,
    },
  },
  contentArea: {
    marginTop: theme.spacing(2),
  },
});
