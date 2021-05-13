import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LeftSideBar from 'root/templates/sideBar/temp1'
import AppBar from 'root/templates/navBar/temp1'
import Table from 'root/templates/tables/temp1'
import { searchUser, searchRole, editUser, deleteUser, editRole, deleteRole } from './../actions'
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
  { field: 'googleId', headerName: 'G-ID', isEditable: false },
  { field: 'username', headerName: 'User name', isEditable: false},
  { field: 'createdAt', headerName: 'Created At', isEditable: false },
  { field: 'role', headerName: 'Role', isEditable: true },
  { field: 'updatedAt', headerName: 'Updated At', isEditable: false },
];

const roleColumns = [
  { field: 'name', headerName: 'Role', isEditable: true },
];

const text = {
  users: 'Users',
  roles: 'Roles'
}

const AdminBoard = (props) => {
  const { searchUser = () => { }, users = [], roles = [], searchRole = () => { }
    , editUser, deleteUser, editRole, deleteRole
  } = props
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [listUsers, setListUsers] = React.useState(users);
  const [listRoles, setListRoles] = React.useState(roles);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen])

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [setOpen])

  const handleEditRole = useCallback(() => {
    editRole()
  }, [editRole])

  const handleEditUser = useCallback(() => {
    editUser()
  }, [editUser])

  const handleDeleteRole = useCallback(() => {
    deleteRole()
  }, [deleteRole])

  const handleDeleteUser = useCallback((user) => {
    deleteUser(user.id)
  }, [deleteUser])

  useEffect(() => {
    searchUser()
    searchRole()
  }, [searchUser, searchRole])

  useEffect(() => {
    const usersToList = (users || []).map((u) => {
      const createdAt = new Date(u.createdAt)
      const updatedAt = new Date(u.updatedAt)
      return {
        ...u,
        role: ((roles || []).find((r) => r.id === u.roleId) || {}).name,
        createdAt: `${createdAt.toLocaleString()}`,
        updatedAt: `${updatedAt.toLocaleString()}`
      }
    })
    setListUsers(usersToList)
    setListRoles(roles)
  }, [users, roles])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <LeftSideBar open={open} handleDrawerClose={handleDrawerClose}
        primaryMenu={[
          { text: 'Inbox', icon: <PeopleIcon />, key: 'inbox' },
        ]}
        secondMenu={[]}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.section}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Table text={{ title: text.users }} tableData={listUsers}
                tableConfig={{ cols: userColumns, editMode: true  }}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            </Grid>
            <Grid item xs={3}>
              <Table text={{ title: text.roles }} tableData={listRoles}
                tableConfig={{ cols: roleColumns, editMode: true }}
                onEdit={handleEditRole}
                onDelete={handleDeleteRole}    
              />
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  );
}

const mapState = (state) => ({
  users: utils.get(state, `${DASH_BOARD_REDUCER}.users`),
  roles: utils.get(state, `${DASH_BOARD_REDUCER}.roles`)
})

const mapProps = {
  searchUser,
  searchRole,
  editUser,
  deleteUser,
  editRole,
  deleteRole
}

export default connect(mapState, mapProps)(AdminBoard)
