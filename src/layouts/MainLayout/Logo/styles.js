/**
 * Logo styles.
 */
export const values = {
  dim1: {
    width: 500,
    height: 250,
  },
  dim2: {
    width: 250,
    height: 250,
  },
  translate: {
    x: -15,
    y: -100,
  },
  scale: '1.25',
};

export default (theme) => ({
  '@keyframes rotation': {
    from: {
      transform: `translate(${values.translate.x}px, ${values.translate.y}px) scale(${values.scale})`,
    },
    to: {
      transform: `translate(${values.translate.x}px, ${values.translate.y}px) scale(1.35)`,
    },
  },
  root: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
  },
  svgRoot: {
    width: '100%',
    height: 'auto',
  },
  shapePrimary: {
    // animation: '$rotation 300ms 2 alternate ease-in-out',
    fill: theme.palette.background.paper,
    transformOrigin: 'center',
  },
  frameSecondary: {
    fill: theme.palette.primary.main,
  },
  headerText: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Squada One',
    fontSize: '1.75rem',
    fontWeight: '300',
    letterSpacing: '-1',
    paddingBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&:hover': {
      color: theme.palette.text.primary,
    },
  },
});
