/**
 * KernelListItem style.
 */
export default (theme) => ({
  card: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 200,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  versionName: {
    display: 'flex',
    alignItems: 'center',
    '& span': {
      '&::first-letter': {
        fontSize: '150%',
        fontWeight: 300,
      },
    },
  },
  rcChip: {
    marginLeft: theme.spacing(1),
  },
  cover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: 120,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '& img': {
      width: '100%',
      height: 'auto',
    },
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
});
