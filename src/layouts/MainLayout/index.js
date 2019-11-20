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
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import BugReportIcon from '@material-ui/icons/BugReport';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import LightThemeIcon from '@material-ui/icons/Brightness7';
import DarkThemeIcon from '@material-ui/icons/Brightness4';
import DocumentHead from '../../components/DocumentHead';
import GlobalSnackbar from '../../components/GlobalSnackbar';
import WebViewerDialog from '../../components/WebViewerDialog';
import Logo from './components/Logo';
import { GlobalContext, GlobalDispatchContext } from '../../contexts';
import { toggleDrawer, toggleTheme } from '../../actions';
import styles from './styles';

const useStyles = makeStyles(styles);

const MainLayout = ({ children, pageTitle, contentTitle, showShadow }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { drawerOpen, theme: themePref } = useContext(GlobalContext);
  const dispatch = useContext(GlobalDispatchContext);

  const menuItems = [
    [
      {
        text: 'Home',
        icon: <HomeIcon />,
        handler: () => Router.push('/'),
      },
      {
        text: 'Bookmarks',
        icon: <BookmarksIcon />,
        handler: () => {},
      },
    ],
    [
      {
        text: 'Toggle Theme',
        icon: themePref === 'dark' ? <DarkThemeIcon /> : <LightThemeIcon />,
        handler: () => dispatch(toggleTheme()),
      },
    ],
    [
      {
        text: 'Report a Problem',
        icon: <BugReportIcon />,
        handler: () => {},
      },
      {
        text: 'About',
        icon: <InfoIcon />,
        handler: () => {},
      },
    ],
  ];

  return (
    <Fragment>
      <DocumentHead pageTitle={pageTitle} />
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
              onClick={() => dispatch(toggleDrawer())}
              edge="start"
              className={clsx(classes.menuButton, drawerOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              {contentTitle}
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <Tooltip
              title="Toggle light/dark theme"
              aria-label="Toggle light/dark theme"
            >
              <IconButton
                color="inherit"
                aria-label="toggle theme"
                onClick={() => dispatch(toggleTheme())}
                edge="start"
                className={classes.button}
              >
                {themePref === 'dark' ? <DarkThemeIcon /> : <LightThemeIcon />}
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
            <IconButton onClick={() => dispatch(toggleDrawer())}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <div onClick={() => Router.push('/')}>
            <Logo />
          </div>
          <Divider />
          {menuItems.map((menuSet, index) => (
            <Fragment key={`menuset-${index}`}>
              <List>
                {menuSet.map(({ text, icon, handler }) => (
                  <ListItem button key={text} onClick={handler}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Fragment>
          ))}
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
      <GlobalSnackbar />
      <WebViewerDialog />
    </Fragment>
  );
};

MainLayout.defaultProps = {
  contentTitle: 'Available Kernels',
  showShadow: true,
};

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
  pageTitle: PropTypes.string,
  contentTitle: PropTypes.string,
  showShadow: PropTypes.bool,
};

export default MainLayout;
