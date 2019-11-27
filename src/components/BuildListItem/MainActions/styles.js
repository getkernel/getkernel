/**
 * MainActions component styles.
 */
export default (theme) => ({
  buttons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonsRight: {
    '& button': {
      marginLeft: theme.spacing(1),
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
});
