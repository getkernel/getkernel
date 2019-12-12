/**
 * ExtrasList component.
 */
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  memo,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import KernelListItem from '../KernelListItem';
import {
  KernelsContext,
  KernelsDispatchContext,
  GlobalDispatchContext,
} from '../../contexts';
import ExtraIndexObject from '../../models/ExtraIndexObject';
import { getExtras } from '../../api';
import { hydrateExtrasData, setIsLoading } from '../../actions';
import styles from './styles';

const useStyles = makeStyles(styles);

const ExtrasList = () => {
  const classes = useStyles();

  const { extras } = useContext(KernelsContext);
  const globalDispatch = useContext(GlobalDispatchContext);
  const kernelsDispatch = useContext(KernelsDispatchContext);

  const getInitialData = useCallback(async () => {
    const { success, data } = await getExtras();

    if (success) {
      kernelsDispatch(hydrateExtrasData(data));
      globalDispatch(setIsLoading(false));
    }
  });

  useEffect(() => {
    if (!extras.length) {
      getInitialData();
      globalDispatch(setIsLoading(true));
    }
  }, [extras.length]);

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
