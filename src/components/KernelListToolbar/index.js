/**
 * KernelListToolbar component.
 */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';
import { FiltersContext } from '../../contexts';
import { releaseTypes, sortByOptions, orderOptions } from './options';
import { useFilterNavigate } from '../../hooks';
import StringUtils from '../../utils/StringUtils';
import styles from './styles';

const useStyles = makeStyles(styles);

const KernelListToolbar = () => {
  const classes = useStyles();

  const {
    selectedVersions,
    selectedDistros,
    releaseType,
    sortBy,
    order,
    navigate,
    isFiltersSet,
    clearFilters,
  } = useFilterNavigate();

  const { availableVersions, availableDistros } = useContext(FiltersContext);

  /**
   * Generic change handler.
   * @param {('versions'|'distros'|'releaseType'|'sortBy'|'order')} key Param key
   * @param {Array|String} value Param value
   */
  const handleChange = (key, value) => {
    navigate(null, {
      key,
      value,
    });
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const disableVersionFilter = selectedDistros.length > 0;

  const mainFilters = [
    {
      id: 'version-select',
      label: 'Version',
      value: [null, ...selectedVersions],
      disabled: disableVersionFilter,
      onChange: (e) => {
        handleChange('versions', [...e.target.value].slice(1));
      },
      options: availableVersions.map(({ major, count, minors }) => [
        <ListSubheader>{`v${major} (${count} items)`}</ListSubheader>,
        minors.map((minor) => (
          <MenuItem key={`${major}-${minor}`} value={minor}>
            <Checkbox checked={selectedVersions.indexOf(minor) > -1} />
            <ListItemText primary={minor} />
          </MenuItem>
        )),
      ]),
    },
    {
      id: 'flavor-select',
      label: 'Flavor',
      value: [null, ...selectedDistros],
      disabled: false,
      onChange: (e) => {
        handleChange('distros', [...e.target.value].slice(1));
      },
      options: availableDistros.map(({ distro, count, minors }) => [
        <ListSubheader>{`${StringUtils.toUpperFirst(
          distro,
        )} (${count} items)`}</ListSubheader>,
        minors.map((minor) => {
          const filterToken = `${distro}@${minor}`;
          return (
            <MenuItem key={filterToken} value={filterToken}>
              <Checkbox checked={selectedDistros.indexOf(filterToken) > -1} />
              <ListItemText primary={minor} />
            </MenuItem>
          );
        }),
      ]),
    },
  ];

  const secondaryFilters = [
    {
      id: 'release-type',
      label: 'Release type',
      value: releaseType,
      onChange: (e) => handleChange('releaseType', e.target.value),
      source: releaseTypes,
    },
    {
      id: 'sort-by',
      label: 'Sort by',
      value: sortBy,
      onChange: (e) => handleChange('sortBy', e.target.value),
      source: sortByOptions,
    },
    {
      id: 'order',
      label: 'Order',
      value: order,
      onChange: (e) => handleChange('order', e.target.value),
      source: orderOptions,
    },
  ];

  return (
    <Fade in timeout={500}>
      <AppBar position="sticky" color="default">
        <Toolbar className={classes.toolbar}>
          <FormGroup row>
            {/* Main filters */}
            {mainFilters.map((filterItem) => {
              const {
                id,
                label,
                value,
                disabled,
                onChange,
                options,
              } = filterItem;

              return (
                <FormControl
                  key={`main-filter-${id}`}
                  className={classes.formControl}
                  disabled={disabled}
                >
                  <InputLabel id={`${id}-label`}>{label}</InputLabel>
                  <Select
                    labelId={`${id}-label`}
                    id={id}
                    multiple
                    value={value}
                    onChange={onChange}
                    input={<Input />}
                    renderValue={(selected) => {
                      const [, ...rest] = selected;
                      if (rest.length === 0) {
                        return <span>All</span>;
                      }
                      return rest.join(', ');
                    }}
                  >
                    <MenuItem value="" disabled>
                      All
                    </MenuItem>
                    {options}
                  </Select>
                </FormControl>
              );
            })}

            {/* Secondary filters */}
            {secondaryFilters.map((filterItem) => {
              const { id, label, value, onChange, source } = filterItem;

              return (
                <FormControl
                  key={`secondary-filter-${id}`}
                  className={classes.formControl}
                >
                  <InputLabel id={`${id}-label`}>{label}</InputLabel>
                  <Select
                    labelId={`${id}-label`}
                    id={`${id}-select`}
                    value={value}
                    onChange={onChange}
                  >
                    {source.map(({ value: val, text }) => (
                      <MenuItem value={val} key={`${id}-${val}`}>
                        {text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            })}
          </FormGroup>
          <Box>
            {isFiltersSet() && (
              <Tooltip title="Clear filters">
                <IconButton onClick={handleClearFilters}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Fade>
  );
};

KernelListToolbar.propTypes = {};

export default KernelListToolbar;
