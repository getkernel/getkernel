/**
 * Bookmarks component.
 */
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GlobalContext, GlobalDispatchContext } from '../../contexts';
import { showSnackbar } from '../../actions';
import PageContent from '../PageContent';
import BookmarksList from '../BookmarksList';
import BookmarkUtils from '../../utils/BookmarkUtils';
import styles from './styles';
import appConfig from '../../app.config';

const useStyles = makeStyles(styles);

const Bookmarks = () => {
  const classes = useStyles();
  const router = useRouter();

  const { bookmarks } = useContext(GlobalContext);
  const globalDispatch = useContext(GlobalDispatchContext);

  const [encoded, setEncoded] = useState('');

  useEffect(() => {
    if (!bookmarks.length) {
      router.push('/');
    }
    const newEncoded = BookmarkUtils.encode(bookmarks);
    setEncoded(newEncoded);
  }, [bookmarks]);

  const handleCopyLink = () => {
    globalDispatch(showSnackbar('Link copied to clipboard!'));
  };

  const link = `${
    process.browser ? window.location.origin : appConfig.baseUrl
  }/b/${encoded}`;

  return (
    <div className={classes.root}>
      <PageContent>
        <Paper className={classes.paper}>
          <Typography variant="body2">
            This application is not using any form of persistent data storage
            whatsoever. This means if you'd like to keep your selections around,
            you can do so by literally bookmarking the link below.
          </Typography>
          <div className={classes.linkArea}>
            <Link href="/b/[encoded]" as={`/b/${encoded}`}>
              <a>{link}</a>
            </Link>
            <Tooltip
              title="Copy link to clipboard"
              aria-label="Copy link to clipboard"
            >
              <CopyToClipboard text={link} onCopy={handleCopyLink}>
                <IconButton>
                  <LinkIcon />
                </IconButton>
              </CopyToClipboard>
            </Tooltip>
          </div>
        </Paper>
        <BookmarksList bookmarks={bookmarks} />
      </PageContent>
    </div>
  );
};

export default Bookmarks;
