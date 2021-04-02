import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LeftSideBar from 'root/templates/sideBar/temp1'
import AppBar from 'root/templates/navBar/temp1'
import Table from 'root/templates/tables/temp1'
import TableGrid from 'root/templates/tables/temp2'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  section: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen}/>
      <LeftSideBar open={open} handleDrawerClose={handleDrawerClose}/>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <div className={classes.section}>
          <Table />
        </div>
        <div className={classes.section}>
          <TableGrid />
        </div>
      </main>
    </div>
  );
}
