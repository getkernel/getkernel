/**
 * KernelList component.
 */
import React, { useContext, useEffect, useMemo, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageContent from '../PageContent';
import KernelListToolbar from '../KernelListToolbar';
import KernelListItem from '../KernelListItem';
import { KernelsContext } from '../../contexts';
import {
  versionsFilter,
  distrosFilter,
  releaseTypeFilter,
} from '../../selectors';
import { useFilterNavigate } from '../../hooks';
import ServerIndexObject from '../../models/ServerIndexObject';
import Pagination from '../Pagination';
import Compare from '../../utils/Compare';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelList = () => {
  const classes = useStyles();

  const {
    currentPage,
    selectedVersions,
    selectedDistros,
    releaseType,
    sortBy,
    order,
    navigate,
  } = useFilterNavigate();

  const {
    index: { items },
  } = useContext(KernelsContext);

  const filteredVersions = useMemo(() => {
    const filtered = items
      .map((entry) => ServerIndexObject.parse(entry).toVersion())
      .filter(releaseTypeFilter(releaseType));

    // Apply sorting options.
    if (sortBy === 'version') {
      filtered.sort(Compare.version(order));
    }
    if (sortBy === 'date') {
      filtered.sort((a, b) =>
        Compare.date(order)(a.lastModified, b.lastModified),
      );
    }

    // Apply filters.
    if (selectedDistros.length) {
      return filtered.filter(distrosFilter(selectedDistros));
    }
    if (selectedVersions.length) {
      return filtered.filter(versionsFilter(selectedVersions));
    }

    return filtered;
  }, [items, selectedVersions, selectedDistros, releaseType]);

  const itemsPerPage = 36;
  const totalPages = Math.ceil(filteredVersions.length / itemsPerPage);

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
      <KernelListToolbar />
      <PageContent>
        <Grid container spacing={3}>
          {pageContents.map((version, index) => (
            <KernelListItem
              key={version.key}
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
