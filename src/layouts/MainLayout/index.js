/**
 * MainLayout component.
 */
import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import LightThemeIcon from '@material-ui/icons/Brightness7';
import DarkThemeIcon from '@material-ui/icons/Brightness4';
import DocumentHead from '../../components/DocumentHead';
import GlobalSnackbar from '../../components/GlobalSnackbar';
import WebViewerDialog from '../../components/WebViewerDialog';
import { GlobalContext, GlobalDispatchContext } from '../../contexts';
import { toggleDrawer, toggleTheme } from '../../actions';
import styles from './styles';

const useStyles = makeStyles(styles);

const MainLayout = ({ children, pageTitle, contentTitle, showShadow }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { drawerOpen, theme: themePref } = useContext(GlobalContext);
  const dispatch = useContext(GlobalDispatchContext);

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
            <Typography variant="h6" className={classes.appTitle}>
              getkernel.sh
            </Typography>
            <IconButton onClick={() => dispatch(toggleDrawer())}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
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
