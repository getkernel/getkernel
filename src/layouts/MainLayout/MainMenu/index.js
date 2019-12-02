/**
 * MainMenu component.
 */
import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeedSharp';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import BugReportIcon from '@material-ui/icons/BugReport';
import InfoIcon from '@material-ui/icons/Info';
import styles from './styles';

const useStyles = makeStyles(styles);

const MainMenu = ({ bookmarks, themeIcon, handleToggleTheme }) => {
  const classes = useStyles();

  const menuItems = [
    [
      {
        text: 'Home',
        icon: HomeIcon,
        handler: () => Router.push('/'),
      },
      {
        text: 'All Kernels',
        icon: DynamicFeedIcon,
        handler: () => Router.push('/kernels'),
      },
      {
        text: 'Bookmarks',
        icon: BookmarksIcon,
        chip: bookmarks.length || null,
        handler: () => {
          if (bookmarks.length) {
            Router.push('/bookmarks');
          }
        },
      },
    ],
    [
      {
        text: 'Toggle Theme',
        icon: themeIcon,
        handler: () => handleToggleTheme(),
      },
    ],
    [
      {
        text: 'Report a Problem',
        icon: BugReportIcon,
        handler: () => {},
      },
      {
        text: 'About',
        icon: InfoIcon,
        handler: () => {},
      },
    ],
  ];

  return menuItems.map((menuSet, index) => (
    // eslint-disable-next-line
    <Fragment key={`menuset-${index}`}>
      <List>
        {menuSet.map(({ text, icon: Icon, handler, chip }) => (
          <ListItem button key={text} onClick={handler}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemText }}>
              <span>{text}</span>
              {chip && (
                <span>
                  <Chip size="small" label={chip} clickable />
                </span>
              )}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Fragment>
  ));
};

MainMenu.propTypes = {
  bookmarks: PropTypes.array,
  themeIcon: PropTypes.object.isRequired,
  handleToggleTheme: PropTypes.func.isRequired,
};

export default memo(MainMenu);
