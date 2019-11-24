/**
 * KernelListItem component.
 */
import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Version from '../../models/Version';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelListItem = ({ version_name, version_slug, last_modified }) => {
  const classes = useStyles();

  const version = new Version(version_slug);

  const dateFriendly = moment(last_modified).format('L');
  const timeFriendly = moment(last_modified).format('LT');

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
                    {version.isRC() && (
                      <Chip
                        size="small"
                        label={version.rc.toUpperCase()}
                        className={classes.rcChip}
                        title="Release Candidate"
                      />
                    )}
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
      </Card>
    </Grid>
  );
};

export default KernelListItem;
