/**
 * KernelVersion styles.
 */
export default (theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  platformChips: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
    [theme.breakpoints.down('sm')]: {
      '& > a': {
        display: 'none',
      },
    },
  },
  linkActive: {
    '& > div > *': {
      color: theme.palette.secondary.main,
    },
  },
});
