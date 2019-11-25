/**
 * Bookmarks component styles.
 */
import { fade } from '@material-ui/core/styles';

export default (theme) => ({
  root: {
    flexGrow: 1,
  },
  linkArea: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: fade(theme.palette.text.primary, 0.05),
    borderRadius: theme.spacing(0.75),
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
    '& > *': {
      color: theme.palette.text.secondary,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
  },
});
