/**
 * KernelList component.
 */
import React, { useContext, useEffect, useMemo, memo } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import KernelListToolbar from '../KernelListToolbar';
import KernelListItem from '../KernelListItem';
import { KernelsContext, FiltersContext } from '../../contexts';
import {
  versionsFilter,
  distrosFilter,
  releaseTypeFilter,
} from '../../selectors';
import ServerIndexObject from '../../models/ServerIndexObject';
import styles from './styles';
import Pagination from '../Pagination';

const useStyles = makeStyles(styles);

const KernelList = () => {
  const classes = useStyles();

  const router = useRouter();
  const {
    query: { p },
  } = router;

  const {
    index: { items },
  } = useContext(KernelsContext);
  const { selectedVersions, selectedDistros, releaseType } = useContext(
    FiltersContext,
  );

  const filteredVersions = useMemo(() => {
    const [, ...distrosRest] = selectedDistros;
    const [, ...versionsRest] = selectedVersions;

    const filtered = items
      .map((entry) => ServerIndexObject.parse(entry).toVersion())
      .filter(releaseTypeFilter(releaseType));

    if (distrosRest.length) {
      return filtered.filter(distrosFilter(distrosRest));
    }
    if (versionsRest.length) {
      return filtered.filter(versionsFilter(versionsRest));
    }
    return filtered;
  }, [items, selectedVersions, selectedDistros, releaseType]);

  const currentPage = p ? Number(p) : 1;
  const itemsPerPage = 36;
  const totalPages = Math.ceil(filteredVersions.length / itemsPerPage);

  const goToPage = (page) => {
    router.push(`/kernels?p=${page}`);
  };

  const pageContents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredVersions.slice(start, end);
  }, [filteredVersions, currentPage]);

  useEffect(() => {
    if ((currentPage - 1) * itemsPerPage > filteredVersions.length) {
      goToPage(1);
    }
  }, [filteredVersions.length, currentPage, itemsPerPage]);

  return (
    <div className={classes.root}>
      <KernelListToolbar />
      <PageContent>
        <Grid container spacing={3}>
          {pageContents.map((version, index) => (
            <KernelListItem
              key={version.toString()}
              version={version}
              index={index}
              animate
            />
          ))}
        </Grid>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </PageContent>
    </div>
  );
};

export default memo(KernelList);
