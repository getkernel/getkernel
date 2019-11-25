/**
 * KernelListItem component.
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CheckIcon from '@material-ui/icons/Check';
import Version from '../../models/Version';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelListItem = ({
  version_name,
  version_slug,
  last_modified,
  bookmarks,
  handleAddBookmark,
  handleRemoveBookmark,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const version = new Version(version_slug);

  const dateFriendly = moment(last_modified).format('L');
  const timeFriendly = moment(last_modified).format('LT');
  const isBookmarked =
    bookmarks && bookmarks.some((b) => b === version.toString());
  // Disable on saved bookmarks page.
  const disableBookmark = router.pathname === '/b/[encoded]';

  const handleBookmarkClick = () => {
    const versionStr = version.toString();
    if (isBookmarked) {
      handleRemoveBookmark(versionStr);
    } else {
      handleAddBookmark(versionStr);
    }
  };

  const chips = [];
  version.distro &&
    chips.push({
      label: version.distro.toUpperCase(),
      title: version.distro,
    });
  version.isCKT() &&
    chips.push({
      label: version.ckt.toUpperCase(),
      title: version.ckt,
    });
  version.isRC() &&
    chips.push({
      label: version.rc.toUpperCase(),
      title: 'Release Candidate',
      color: 'secondary',
    });

  return (
    <Grid item xs={6} md={4} lg={3} xl={2}>
      <Card>
        <Link href="/kernel/[version]" as={`/kernel/${version_slug}`}>
          <CardActionArea title={version_name}>
            <div className={classes.card}>
              <div className={classes.details}>
                <CardContent className={classes.topArea}>
                  <Typography className={classes.versionName} variant="h5">
                    <span>{version.toFriendlyString(false)}</span>
                  </Typography>
                </CardContent>
                <div className={classes.bottomArea}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    title="Last modified"
                  >
                    <span>{dateFriendly}</span>
                    <span>{timeFriendly}</span>
                  </Typography>
                </div>
              </div>

              <div className={classes.cover}>
                <img src="/images/deb.svg" title={version_name} />
              </div>
            </div>
          </CardActionArea>
        </Link>
        <CardActions disableSpacing className={classes.actions}>
          <Tooltip
            title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
            aria-label="toggle bookmark"
            disableFocusListener={disableBookmark}
            disableHoverListener={disableBookmark}
            disableTouchListener={disableBookmark}
          >
            <span>
              <IconButton
                size="small"
                onClick={handleBookmarkClick}
                aria-label="toggle bookmark"
                disabled={disableBookmark}
              >
                {disableBookmark ? (
                  <CheckIcon />
                ) : isBookmarked ? (
                  <BookmarkIcon />
                ) : (
                  <BookmarkBorderIcon />
                )}
              </IconButton>
            </span>
          </Tooltip>
          <div>
            {chips &&
              chips.map(({ label, title, color }) => (
                <Chip
                  key={`chip-${label}`}
                  size="small"
                  color={color || 'default'}
                  label={label}
                  className={classes.chip}
                  title={title}
                />
              ))}
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
};

KernelListItem.propTypes = {
  bookmarks: PropTypes.array,
};

export default memo(KernelListItem);
