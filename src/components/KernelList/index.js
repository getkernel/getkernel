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
    query: { p, v, d },
  } = router;

  const currentPage = p ? Number(p) : 1;
  const selectedVersions = v ? [null, ...v.split(',')] : [null];
  const selectedDistros = d ? [null, ...d.split(',')] : [null];

  const {
    index: { items },
  } = useContext(KernelsContext);
  const { releaseType } = useContext(FiltersContext);

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

  const itemsPerPage = 36;
  const totalPages = Math.ceil(filteredVersions.length / itemsPerPage);

  const navigate = (page = null, versions = null, distros = null) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (page) {
      if (searchParams.has('p')) searchParams.set('p', page);
      else searchParams.append('p', page);
    }

    if (versions) {
      const versionsStr = versions.join(',');
      if (searchParams.has('v')) searchParams.set('v', versionsStr);
      else searchParams.append('v', versionsStr);
    }

    if (distros) {
      const distrosStr = distros.join(',');
      if (searchParams.has('d')) searchParams.set('d', distrosStr);
      else searchParams.append('d', distrosStr);
    }

    searchParams.sort();

    // Remove unused params.
    const entries = searchParams.entries();
    let current = entries.next();
    while (!current.done) {
      const [key, value] = current.value;
      if (!value) searchParams.delete(key);
      current = entries.next();
    }

    router.push(`/kernels?${searchParams.toString()}`);
  };

  const pageContents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredVersions.slice(start, end);
  }, [filteredVersions, currentPage]);

  useEffect(() => {
    if ((currentPage - 1) * itemsPerPage > filteredVersions.length) {
      navigate(1);
    }
  }, [filteredVersions.length, currentPage, itemsPerPage]);

  return (
    <div className={classes.root}>
      <KernelListToolbar
        selectedVersions={selectedVersions}
        selectedDistros={selectedDistros}
        navigate={navigate}
      />
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
          navigate={navigate}
        />
      </PageContent>
    </div>
  );
};

export default memo(KernelList);
