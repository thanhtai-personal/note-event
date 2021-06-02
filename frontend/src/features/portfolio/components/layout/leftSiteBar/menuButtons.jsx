import React, { useReducer, useCallback } from 'react'
import { connect } from 'react-redux'
import MenuButton from './commons/menuButton'
import menuButtonsData from './data/menuButtons'
import leftMenuReducer from './../../../reducers/leftMenu.reducer'
import { UPDATE_ACTIVE_LEFT_MENU } from './../../../actions/types'
import { makeStyles } from '@material-ui/core'
import { globalSetActiveMenu } from './../../../actions' 
import { singleSoundKeys } from 'root/commonComponents/soundFactory/smallSounds/singleSound/singleSounds' 

const useStyle = makeStyles(theme => {
  return {
    menuButtons: {
      display: 'block',
      textAlign: 'center'
    }
  }
})

const MenuButtons = (props) => {
  const classes = useStyle()
  const { globalSetActiveMenu } = props
  const [{ menuItems }, setMenuButton] = useReducer(leftMenuReducer, { menuItems: menuButtonsData })
  const setActiveMenu = useCallback((e, data) => {
    window.triggerSingleSoundsByKey
      && typeof window.triggerSingleSoundsByKey === 'function'
      && window.triggerSingleSoundsByKey(singleSoundKeys.zapsplat, window.singleSoundsList)
    globalSetActiveMenu(data.value)
    setMenuButton({ type: UPDATE_ACTIVE_LEFT_MENU, payload: data.value })
  }, [setMenuButton, globalSetActiveMenu])

  return (
    <nav className={classes.menuButtons}>
      {menuItems.map((menuButton, index) => (
        <MenuButton {...menuButton} key={`${menuButton?.key}-${index}`} onClick={setActiveMenu} value={menuButton?.key}/>
      ))}
    </nav>
  )
}

const mapState = (state) => ({
})

const mapDispatch = {
  globalSetActiveMenu
}

export default connect(mapState, mapDispatch)(MenuButtons)