/**
 * KernelListToolbar component.
 */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { FiltersContext } from '../../contexts';
import {
  releaseTypes,
  sortByOptions,
} from '../../reducers/filters/defaultState';
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
    navigate,
  } = useFilterNavigate();

  const { availableVersions, availableDistros } = useContext(FiltersContext);

  const handleReleaseTypeChange = (e) => {
    navigate(null, {
      key: 'releaseType',
      value: e.target.value,
    });
  };

  const handleVersionChange = (e) => {
    navigate(null, {
      key: 'versions',
      value: [...e.target.value].slice(1),
    });
  };

  const handleDistroChange = (e) => {
    navigate(null, {
      key: 'distros',
      value: [...e.target.value].slice(1),
    });
  };

  const disableVersionFilter = selectedDistros.length > 1;

  const mainFilters = [
    {
      id: 'version-select',
      label: 'Version',
      value: selectedVersions,
      disabled: disableVersionFilter,
      onChange: handleVersionChange,
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
      value: selectedDistros,
      disabled: false,
      onChange: handleDistroChange,
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

  return (
    <Fade in timeout={500}>
      <AppBar position="sticky" color="default">
        <Toolbar>
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

            {/* Release type filter */}
            <FormControl className={classes.formControl}>
              <InputLabel id="release-type-label">Release Type</InputLabel>
              <Select
                labelId="release-type-label"
                id="release-type-select"
                value={releaseType}
                onChange={handleReleaseTypeChange}
              >
                {releaseTypes.map(({ value, text }) => (
                  <MenuItem value={value} key={`release-type-${value}`}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sort by */}
            <FormControl className={classes.formControl}>
              <InputLabel id="sort-by-label">Sort by</InputLabel>
              <Select
                labelId="sort-by-label"
                id="sort-by-select"
                value="version"
                onChange={() => {}}
              >
                {sortByOptions.map(({ value, text }) => (
                  <MenuItem value={value} key={`sort-by-${value}`}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormGroup>
        </Toolbar>
      </AppBar>
    </Fade>
  );
};

KernelListToolbar.propTypes = {};

export default KernelListToolbar;
