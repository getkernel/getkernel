/**
 * Logo component.
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles, { values } from './styles';

const useStyles = makeStyles(styles);

const Logo = () => {
  const classes = useStyles();

  return (
    <svg
      className={classes.root}
      viewBox={`0 0 ${values.dim1.width} ${values.dim1.height}`}
      version="1.1"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect
          className={classes.backgroundPrimary}
          x="0"
          y="0"
          width={values.dim1.width}
          height={values.dim1.height}
        ></rect>
        <rect
          className={classes.frameSecondary}
          x="130"
          y="25"
          width={values.dim2.width}
          height={values.dim2.height}
          display="none"
        ></rect>
        <svg
          width={values.dim2.width}
          height={values.dim2.height}
          viewBox={`0 0 ${values.dim2.width} ${values.dim2.height}`}
          version="1.1"
          className={classes.svgFrameSecondary}
          x="130"
          y="25"
        >
          <g strokeWidth="1" fill="none" fillRule="evenodd">
            <polygon
              className={classes.frameSecondary}
              transform={`scale(${values.scale})`}
              points="87 0 162 43.75 162 131.25 87 175 12 131.25 12 43.75"
            ></polygon>
          </g>
        </svg>
        <path
          className={classes.shapePrimary}
          transform={`translate(${values.translate.x}, ${values.translate.y}) scale(${values.scale})`}
          d="M178.443 329.438l134.543 -247.05l0.575 -1.056l-2.086 -1.164l-0.574 1.056l-134.544 247.05l-0.575 1.056l2.086 1.164l0.575 -1.056zm71.439 0l134.543 -247.05l0.575 -1.056l-2.085 -1.164l-0.575 1.056l-134.544 247.05l-0.575 1.056l2.086 1.164l0.575 -1.056zm-115.46 32.473l130.971 -279.59l0.51 -1.088l-2.151 -1.033l-0.51 1.089l-130.972 279.59l-0.51 1.088l2.151 1.033l0.51 -1.089zm192.725 -30.21l-209.554 -255.486l-0.76 -0.927l-1.833 1.54l0.76 0.927l209.555 255.487l0.76 0.927l1.833 -1.54l-0.76 -0.927zm42.926 -36.07l-200.03 -291.641l-0.679 -0.99l-1.956 1.374l0.68 0.99l200.029 291.641l0.679 0.99l1.956 -1.374l-0.68 -0.99z"
        ></path>
        <g transform="translate(35, 280)">
          <rect x="0" y="0" width="420" height="60"></rect>
          <text
            className={classes.headerTextSecondary}
            fontFamily="Squada One"
            fontSize="54"
            fontWeight="300"
            letterSpacing="-1"
            data-text-alignment="C"
            fontStyle="normal"
          >
            <tspan x="85" y="35">
              getkernel.sh
            </tspan>
          </text>
        </g>
        <g transform="translate(40, 364)">
          <rect x="0" y="0" width="420" height="40"></rect>
          <text
            className={classes.captionTextSecondary}
            opacity=".8"
            fontFamily="Teko"
            fontSize="35"
            fontWeight="500"
            line-spacing="35"
            letterSpacing="2.1"
            data-text-alignment="C"
            fontStyle="normal"
          >
            <tspan x="210" y="194"></tspan>
          </text>
        </g>
      </g>
    </svg>
  );
};

export default Logo;
