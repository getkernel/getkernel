/**
 * Logo styles.
 */
export const values = {
  dim1: {
    width: 500,
    height: 400,
  },
  dim2: {
    width: 250,
    height: 250,
  },
  translate: {
    x: -20,
    y: -45,
  },
  scale: '1.25',
};

export default (theme) => ({
  '@keyframes rotation': {
    from: {
      transform: `translate(${values.translate.x}px, ${values.translate.y}px) scale(${values.scale}) rotate(0deg)`,
    },
    to: {
      transform: `translate(${values.translate.x}px, ${values.translate.y}px) scale(1.35) rotate(5deg)`,
    },
  },
  root: {
    width: '100%',
    height: 'auto',
    cursor: 'pointer',
    userSelect: 'none',
    background: 'black',
  },
  backgroundPrimary: {
    fill: theme.palette.background.paper,
  },
  shapePrimary: {
    animation: '$rotation 300ms 2 alternate ease-in-out',
    fill: theme.palette.background.paper,
    transformOrigin: `${values.dim1.width / 2}px ${values.dim1.height / 2}px`,
  },
  frameSecondary: {
    fill: theme.palette.primary.main,
  },
  svgFrameSecondary: {
    fill: '#303841',
  },
  headerTextSecondary: {
    fill: theme.palette.text.secondary,
    transition: theme.transitions.create('fill', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '&:hover': {
      fill: theme.palette.text.primary,
    },
  },
  captionTextSecondary: {
    fill: theme.palette.text.secondary,
  },
});
