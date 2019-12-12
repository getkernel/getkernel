/**
 * ExtrasList component.
 */
import React, { Fragment, useContext, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import KernelListItem from '../KernelListItem';
import { KernelsContext } from '../../contexts';
import ExtraIndexObject from '../../models/ExtraIndexObject';
import styles from './styles';

const useStyles = makeStyles(styles);

const ExtrasList = () => {
  const classes = useStyles();

  const { extras } = useContext(KernelsContext);

  return (
    <div className={classes.root}>
      <PageContent>
        {extras.map(({ tag, items }) => (
          <Fragment key={tag}>
            <h1>{tag}</h1>
            <Grid container spacing={3}>
              {items
                .map((item) => ExtraIndexObject.parse(item).toVersion())
                .map((version, index) => (
                  <KernelListItem
                    key={version.key}
                    version={version}
                    index={index}
                    animate
                  />
                ))}
            </Grid>
          </Fragment>
        ))}
      </PageContent>
    </div>
  );
};

export default memo(ExtrasList);
