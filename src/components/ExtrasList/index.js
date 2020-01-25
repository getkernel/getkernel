/**
 * ExtrasList component.
 */
import React, { useCallback, useContext, useEffect, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
          <Box key={tag} className={classes.tagContents}>
            <Typography variant="button">{tag}</Typography>
            <Grid container spacing={3}>
              {items
                .map((item) => ExtraIndexObject.parse(item).toVersion())
                .map((version, index) => (
                  <KernelListItem
                    key={version.key}
                    version={version}
                    index={index}
                    bookmarkable={false}
                    animate
                  />
                ))}
            </Grid>
          </Box>
        ))}
      </PageContent>
    </div>
  );
};

export default memo(ExtrasList);
