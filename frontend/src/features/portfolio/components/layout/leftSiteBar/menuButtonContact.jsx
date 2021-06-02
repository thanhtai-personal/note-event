import React, { useReducer } from 'react'
import MenuButton from './commons/menuButton'
import menuButtonsContactData from './data/menuButtonsContact'
import leftMenuContactReducer from './../../../reducers/leftMenuContact.reducer'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles(theme => {
  return {
    menuButtonsContact: {
      padding: 0,
      paddingBottom: '20px',
      display: 'block'
    }
  }
})

const MenuButtonsContact = (props) => {
  const classes = useStyle()
  //eslint-disable-next-line
  const [{ menuItems }, setMenuButton] = useReducer(leftMenuContactReducer, { menuItems: menuButtonsContactData })

  return (
    <div className={classes.menuButtonsContact}>
      {menuItems.map((menuButton, index) => (
        <MenuButton {...menuButton} key={`${menuButton?.key}-${index}`} value={menuButton?.key}/>
      ))}
    </div>
  )
}

export default MenuButtonsContact