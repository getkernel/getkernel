/**
 * PlatformListItem styles.
 */
import { green, red } from '@material-ui/core/colors';

export default (theme) => ({
  success: {
    backgroundColor: green[400],
  },
  fail: {
    backgroundColor: red[400],
  },
  icon: {
    marginRight: theme.spacing(1),
  },
});
