/**
 * Bookmarks component.
 */
import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import KernelListItem from '../KernelListItem';
import {
  GlobalContext,
  GlobalDispatchContext,
  KernelsContext,
} from '../../contexts';
import styles from './styles';
import BookmarkUtils from '../../utils/BookmarkUtils';

const useStyles = makeStyles(styles);

const Bookmarks = () => {
  const classes = useStyles();

  const { bookmarks } = useContext(GlobalContext);
  const {
    index: { entries },
  } = useContext(KernelsContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  const encoded = BookmarkUtils.encode(bookmarks);

  const bookmarkedEntries = entries.filter(({ version_slug }) =>
    bookmarks.includes(version_slug)
  );

  return (
    <div className={classes.root}>
      <PageContent>
        <p>
          <code>https://getkernel.sh/b/{encoded}</code>
        </p>
        <Grid container spacing={3}>
          {bookmarkedEntries.map((entry) => (
            <KernelListItem key={entry.version_slug} {...entry} />
          ))}
        </Grid>
      </PageContent>
    </div>
  );
};

export default Bookmarks;
