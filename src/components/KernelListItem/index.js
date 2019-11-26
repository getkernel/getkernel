/**
 * KernelListItem component.
 * Rendered by KernelList.
 */
import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import BookmarkToggle from '../BookmarkToggle';
import Version from '../../models/Version';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelListItem = ({ version_name, version_slug, last_modified }) => {
  const classes = useStyles();

  const version = new Version(version_slug);

  const dateFriendly = moment(last_modified).format('L');
  const timeFriendly = moment(last_modified).format('LT');

  const chips = useMemo(() => {
    const array = [];
    if (version.distro) {
      array.push({
        label: version.distro.toUpperCase(),
        title: version.distro,
      });
    }
    if (version.isCKT()) {
      array.push({
        label: version.ckt.toUpperCase(),
        title: version.ckt,
      });
    }
    if (version.isRC()) {
      array.push({
        label: version.rc.toUpperCase(),
        title: 'Release Candidate',
        color: 'secondary',
      });
    }
    return array;
  }, [version]);

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
                <img
                  src="/images/deb.svg"
                  title={version_name}
                  alt="deb package"
                />
              </div>
            </div>
          </CardActionArea>
        </Link>
        <CardActions disableSpacing className={classes.actions}>
          <BookmarkToggle version={version} />
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
  version_name: PropTypes.string.isRequired,
  version_slug: PropTypes.string.isRequired,
  last_modified: PropTypes.string.isRequired,
};

export default memo(KernelListItem);
