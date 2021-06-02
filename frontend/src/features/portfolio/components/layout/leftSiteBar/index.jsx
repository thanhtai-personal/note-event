import React from 'react'
import logoWhite from 'root/assert/images/logo_white512.png'
import MenuButtons from './menuButtons'
import MenuButtonsContact from './menuButtonContact'
import { Drawer , makeStyles
} from '@material-ui/core'
import Color from 'root/utils/color'
import CssVariable from 'root/utils/cssVariable'


const useStyle = makeStyles(theme => {
  return {
    leftSideBar: {
      backgroundColor: Color.black2,
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'fixed',
      margin: 0,
      padding: 0
    },
    drawerPaper: {
      backgroundColor: Color.black2,
      width: CssVariable.leftBarWidth,
      overflow: 'hidden',
      justifyContent: 'space-between'
    },
    logo: {
      width: CssVariable.leftBarWidth,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      color: Color.white,
      backgroundColor: Color.black,
      display: 'block'
    },
    dividerColor: {
      color: Color.white,
      backgroundColor: Color.white,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1)
    }
  }
})
const LeftSideBar = (props) => {
  const classes = useStyle()
  return (
    <div id='nav_bar' className={classes.leftSideBar}>
      <Drawer
        variant='persistent'
        anchor='left'
        open={true}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
          hideBackdrop: true
        }
      }>
        <a className='logo' rel='index' href='/'>
        <img src={logoWhite} className={classes.logo} alt='T' />
        </a>
        <MenuButtons />
        <MenuButtonsContact />
      </Drawer>
    </div>
  )
}

export default LeftSideBar