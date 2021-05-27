import React, { useCallback } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

const MenuItem = (props) => {
  const { activeMenu, menuKey, setActiveMenu, iconComponent, menuText } = props

  const handleActiveMenu = useCallback(() => {
    setActiveMenu && typeof setActiveMenu === 'function' && setActiveMenu(menuKey)
  }, [setActiveMenu, menuKey])

  return (<ListItem button selected={activeMenu === menuKey} onClick={handleActiveMenu}>
  <ListItemIcon>
    {iconComponent}
  </ListItemIcon>
  <ListItemText primary={menuText} />
</ListItem>)
}

const MenuItemsComponents = (props) => (props.items.map((item, index) => (<MenuItem {...item} key={`${item.menuKey}-${index}`} {...props} />)))

export const MainListItems = (props) => {
  return (<MenuItemsComponents { ...props }
    items={[
      {
        menuKey: 'dashboard',
        menuText: 'Dashboard',
        iconComponent: <DashboardIcon />
      }, {
        menuKey: 'novals',
        menuText: 'Novals',
        iconComponent: <MenuBookIcon />
      }, {
        menuKey: 'orders',
        menuText: 'Orders',
        iconComponent: <ShoppingCartIcon />
      }, {
        menuKey: 'customers',
        menuText: 'Customers',
        iconComponent: <PeopleIcon />
      }, {
        menuKey: 'reports',
        menuText: 'Reports',
        iconComponent: <BarChartIcon />
      }, {
        menuKey: 'integrations',
        menuText: 'Integrations',
        iconComponent: <LayersIcon />
      }
    ]}
  />)
}

export const SecondaryListItems = (props) => {
  return (
    <div>
      <ListSubheader inset>Saved reports</ListSubheader>
      <MenuItemsComponents { ...props }
        items={[
          {
            menuKey: 'currentMpnth',
            menuText: 'Current month',
            iconComponent: <AssignmentIcon />
          }, {
            menuKey: 'lastQuarter',
            menuText: 'Last quarter',
            iconComponent: <AssignmentIcon />
          }, {
            menuKey: 'yearEndSale',
            menuText: 'Year-end sale',
            iconComponent: <AssignmentIcon />
          }
        ]}
      />
    </div>
  )
};