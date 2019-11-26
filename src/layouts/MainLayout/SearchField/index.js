/**
 * SearchField component.
 */
import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import ListboxComponent from './ListboxComponent';
import Compare from '../../../utils/Compare';
import styles from './styles';

const useStyles = makeStyles(styles);

const SearchField = ({ entries }) => {
  const classes = useStyles();

  const options = useMemo(
    () =>
      entries
        .map(({ version_slug }) => version_slug)
        .sort(Compare.string('desc')),
    [entries],
  );

  const handleOnChange = (event, value) => {
    Router.push('/kernel/[version]', `/kernel/${value}`);
  };

  return (
    <Box className={classes.search}>
      <Box className={classes.searchIcon}>
        <SearchIcon />
      </Box>
      <Autocomplete
        autoComplete
        autoHighlight
        id="search-input"
        style={{ width: '100%' }}
        disableClearable
        disableListWrap
        ListboxComponent={ListboxComponent}
        options={options}
        onChange={handleOnChange}
        classes={{
          inputRoot: classes.inputRoot,
          input: classes.inputInput,
          listbox: classes.listbox,
        }}
        renderOption={(option) => (
          <Box component="span" className={classes.option}>
            <Typography variant="body1">{option}</Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search…"
            fullWidth
            classes={{}}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              'aria-label': 'search',
            }}
          />
        )}
      />
    </Box>
  );
};

SearchField.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default memo(SearchField);
