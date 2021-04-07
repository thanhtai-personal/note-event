import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LeftSideBar from 'root/templates/sideBar/temp1'
import AppBar from 'root/templates/navBar/temp1'
import Table from 'root/templates/tables/temp1'
import TableGrid from 'root/templates/tables/temp2'
import { searchUser } from './../actions'
import utils from 'root/utils';
import { DASH_BOARD_REDUCER } from 'root/actions/types';
import { People as PeopleIcon } from '@material-ui/icons'

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

const userColumns = [
  { field: 'googleId', headerName: 'G-ID', width: 70 },
  { field: 'username', headerName: 'User name', width: 130 },
  { field: 'createdAt', headerName: 'Created At', width: 130 },
  { field: 'updatedAt', headerName: 'Updated At', width: 130 },
];

const AdminBoard = (props) => {
  const { searchUser = () => {}, users = [] } = props
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen])

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [setOpen])

  useEffect(() => {
    searchUser()
  }, [searchUser])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen}/>
      <LeftSideBar open={open} handleDrawerClose={handleDrawerClose}
        primaryMenu={[
          { text: 'Inbox', icon: <PeopleIcon />, key: 'inbox' },
        ]}
        secondMenu={[]}
      />
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <div className={classes.section}>
          <Table tableData={users} tableConfig={{ cols: userColumns }} />
        </div>
        <div className={classes.section}>
          <TableGrid />
        </div>
      </main>
    </div>
  );
}

const mapState = (state) => ({
  users: utils.get(state, `${DASH_BOARD_REDUCER}.users`)
})

const mapProps = {
  searchUser
}

export default connect(mapState, mapProps)(AdminBoard)
