/**
 * LatestReleases component.
 */
import React, { useCallback, useContext, useMemo, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import KernelListItem from '../KernelListItem';
import { KernelsContext } from '../../contexts';
import KernelOrgRelease from '../../models/KernelOrgRelease';
import ServerIndexObject from '../../models/ServerIndexObject';
import Compare from '../../utils/Compare';
import styles from './styles';

const useStyles = makeStyles(styles);

const LatestReleases = () => {
  const classes = useStyles();

  const {
    index: { items },
    kernelorg: { latestStable, releases },
  } = useContext(KernelsContext);

  const compareVersions = useCallback((release) => ({ versionName }) =>
    versionName ===
    KernelOrgRelease.from(release)
      .toVersion()
      .toString(),
  );

  const contents = useMemo(() => {
    return releases
      ? releases
          .filter((release) => release.moniker !== 'linux-next')
          .filter((release) => items.some(compareVersions(release)))
          .map((release) => {
            const item = items.find(compareVersions(release));
            const itemVersion = ServerIndexObject.parse(item).toVersion();
            if (release.moniker === 'longterm') {
              itemVersion.lts = true;
            }
            if (latestStable.version === itemVersion.toString(false)) {
              // TODO: Refactor
              itemVersion.latest = true;
            }
            return itemVersion;
          })
          .sort(Compare.version('desc'))
      : [];
  }, [items, releases, latestStable]);

  return (
    <div className={classes.root}>
      <PageContent>
        <Grid container spacing={3}>
          {contents.map((version, index) => (
            <KernelListItem
              key={version.toString()}
              version={version}
              index={index}
              animate
            />
          ))}
        </Grid>
      </PageContent>
    </div>
  );
};

export default memo(LatestReleases);
