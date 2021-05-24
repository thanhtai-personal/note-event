import React, { useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Typography } from '@material-ui/core';
const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default function LeftSideBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { handleDrawerClose, open, text={
      adminBoard: 'ADMIN BOARD',
    },
    primaryMenu = [
      { text: 'Inbox', icon: <InboxIcon />, key: 'inbox' },
      { text: 'Starred', icon: <InboxIcon />, key: 'Starred' },
      { text: 'Send email', icon: <InboxIcon />, key: 'Send_email' },
      { text: 'Drafts', icon: <InboxIcon />, key: 'Drafts' }
    ],
    secondMenu = [
      { text: 'Inbox', icon: <InboxIcon />, key: 'inbox' },
      { text: 'Starred', icon: <InboxIcon />, key: 'Starred' },
      { text: 'Send email', icon: <InboxIcon />, key: 'Send_email' },
      { text: 'Drafts', icon: <InboxIcon />, key: 'Drafts' }
    ],
    onClickItem,
  } = props

  const renderMenuItem = useCallback((item, index) => {

    const handleClickItem = () => {
      onClickItem && typeof onClickItem === 'function' && onClickItem(item)
    }

    return (
      <ListItem button key={`${item.key}-${index}`} onClick={handleClickItem}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    )
  }, [onClickItem])

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <Typography align={'center'}>{text.adminBoard}</Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {primaryMenu.map((item, index) => renderMenuItem(item, index))}
      </List>
      <Divider />
      <List>
        {secondMenu.map((item, index) => renderMenuItem(item, index))}
      </List>
    </Drawer>
  );
}
