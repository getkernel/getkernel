/**
 * MainLayout component.
 */
import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Router from 'next/router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import LightThemeIcon from '@material-ui/icons/Brightness7';
import DarkThemeIcon from '@material-ui/icons/Brightness4';
import InitApp from '../../components/InitApp';
import DocumentHead from '../../components/DocumentHead';
import AlertDialog from '../../components/AlertDialog';
import GlobalSnackbar from '../../components/GlobalSnackbar';
import WebViewerDialog from '../../components/WebViewerDialog';
import Logo from './Logo';
import MainMenu from './MainMenu';
import SearchField from './SearchField';
import {
  GlobalContext,
  KernelsContext,
  KernelsProvider,
  GlobalDispatchContext,
  withProvider,
} from '../../contexts';
import { toggleDrawer, toggleTheme } from '../../actions';
import styles from './styles';

const useStyles = makeStyles(styles);

const MainLayout = ({ children, pageTitle, contentTitle, showShadow }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { drawerOpen, theme: themePref, bookmarks } = useContext(GlobalContext);
  const {
    index: { entries },
  } = useContext(KernelsContext);
  const dispatch = useContext(GlobalDispatchContext);

  const ThemeIcon = themePref === 'dark' ? DarkThemeIcon : LightThemeIcon;
  const ChevronIcon =
    theme.direction === 'ltr' ? ChevronLeftIcon : ChevronRightIcon;

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleToggleDrawer = () => {
    dispatch(toggleDrawer());
  };

  return (
    <Fragment>
      <DocumentHead pageTitle={pageTitle} />
      <InitApp />
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
          elevation={showShadow ? 1 : 0}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleToggleDrawer}
              edge="start"
              className={clsx(classes.menuButton, drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              {contentTitle}
            </Typography>
            <SearchField entries={entries} />
            <Tooltip
              title="Toggle light/dark theme"
              aria-label="Toggle light/dark theme"
            >
              <IconButton
                color="inherit"
                aria-label="toggle theme"
                onClick={handleToggleTheme}
                edge="start"
                className={classes.button}
              >
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleToggleDrawer}>
              <ChevronIcon />
            </IconButton>
          </div>
          <div onClick={() => Router.push('/')} role="none">
            <Logo />
          </div>
          <Divider />
          <MainMenu
            bookmarks={bookmarks}
            themeIcon={ThemeIcon}
            handleToggleTheme={handleToggleTheme}
          />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
      <AlertDialog />
      <GlobalSnackbar />
      <WebViewerDialog />
    </Fragment>
  );
};

MainLayout.defaultProps = {
  pageTitle: '',
  contentTitle: 'Available Kernels',
  showShadow: true,
};

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
  pageTitle: PropTypes.string,
  contentTitle: PropTypes.string,
  showShadow: PropTypes.bool,
};

export default withProvider(KernelsProvider)(MainLayout);
