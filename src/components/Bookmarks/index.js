/**
 * Bookmarks component.
 */
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { GlobalContext } from '../../contexts';
import PageContent from '../PageContent';
import BookmarksList from '../BookmarksList';
import BookmarkUtils from '../../utils/BookmarkUtils';
import styles from './styles';

const useStyles = makeStyles(styles);

const Bookmarks = () => {
  const classes = useStyles();

  const { bookmarks } = useContext(GlobalContext);

  const [encoded, setEncoded] = useState('');

  useEffect(() => {
    const newEncoded = BookmarkUtils.encode(bookmarks);
    setEncoded(newEncoded);
  }, [bookmarks]);

  return (
    <div className={classes.root}>
      <PageContent>
        <p>
          <Link href="/b/[encoded]" as={`/b/${encoded}`}>
            <a>https://getkernel.sh/b/{encoded}</a>
          </Link>
        </p>
        <BookmarksList bookmarks={bookmarks} />
      </PageContent>
    </div>
  );
};

export default Bookmarks;
